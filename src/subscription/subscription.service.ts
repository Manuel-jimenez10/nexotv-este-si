import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription, Tipo } from './entities/subscription.entity';
import { Repository } from 'typeorm';
import { UpdateSubscriptionInput } from './dto/update-subscription.input';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  private logger = new Logger('SubscriptionServices');

  async defaultSubscription(id: string): Promise<Subscription> {
    const user = await this.findOneByUserId(id);
    if (!user) throw new NotFoundException('User not found');

    const defaultSubscription = this.subscriptionRepository.create({
      user,
      tipo: Tipo.Free,
      price: 0,
    });
    await this.subscriptionRepository.save(defaultSubscription);

    return defaultSubscription;
  }

  async findOneByUserId(id: string): Promise<User> {
    try {
      return await this.usersRepository.findOneByOrFail({ id });
    } catch (error) {
      this.handleDbErros({
        code: 'error-001',
        detail: `${id} not found`,
      });
    }
  }

  async findOneBySubscriptionId(id: string): Promise<Subscription> {
    try {
      return await this.subscriptionRepository.findOneBy({ id });
    } catch (error) {
      this.handleDbErros({
        code: 'error-001',
        detail: `${id} not found`,
      });
    }
  }

  async update(
    updateSubscriptionInput: UpdateSubscriptionInput,
  ): Promise<Subscription> {
    const { userId, ...rest } = updateSubscriptionInput;
    const user = await this.usersRepository.findOne({where: {id: userId}})
    const getSubscription = await this.subscriptionRepository.findOne({where: {user}})

    const subscription = await this.subscriptionRepository.preload({
      id: getSubscription.id,
      ...rest,
    });

    return await this.subscriptionRepository.save(subscription);
  }

  private handleDbErros(error: any): never {
    console.log(error);
    if (error.code === '23505')
      throw new BadRequestException(error.detail.replace('Key ', ''));

    if (error.code === 'error-001')
      throw new BadRequestException(error.detail.replace('Key ', ''));

    this.logger.error(error);

    throw new InternalServerErrorException('Pleace check server logs');
  }

  async getSubscription() {
     return await this.subscriptionRepository.find({relations: {user: true}});
  }

  //obtener usuarios con una suscripcion especifica
  async getUsersBySubscriptionType(tipo: Tipo): Promise<User[]> {
    const subscriptions = await this.subscriptionRepository.find({
      where: { tipo },
      relations: ['user'],
    });
    return subscriptions.map(sub => sub.user);
  }
}
