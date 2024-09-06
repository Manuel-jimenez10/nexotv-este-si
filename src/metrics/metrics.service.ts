import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { Subscription } from 'src/subscription/entities/subscription.entity';

@Injectable()
export class MetricsService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(User)
    private readonly subscriptionRepository: Repository<Subscription>,
  ) {}
  async countUser(): Promise<number> {
    try {
      const allUsers = await this.usersRepository.find();
      return allUsers.length;
    } catch (error) {
      console.log(error);
      throw Error;
    }
  }

  async countSubscriptions(): Promise<number> {
    try {
      const subscriptions = await this.subscriptionRepository.find();
      return subscriptions.length;
    } catch (error) {
      console.log(error);
      throw Error;
    }
  }
}
