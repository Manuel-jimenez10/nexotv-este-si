import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { Subscription, Tipo } from 'src/subscription/entities/subscription.entity';

@Injectable()
export class MetricsService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Subscription)
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

  async countTypeSubscription(): Promise<{ Free: number, Monthly: number, Annual: number }> {
    try {
      const subscriptions = await this.subscriptionRepository.find();
      console.log('Subscriptions:', subscriptions); // Agrega esto para ver qué estás obteniendo
  
      const freeCount = subscriptions.filter(subscription => subscription.tipo === Tipo.Free).length;
      const monthlyCount = subscriptions.filter(subscription => subscription.tipo === Tipo.Monthly).length;
      const annualCount = subscriptions.filter(subscription => subscription.tipo === Tipo.Annual).length;
  
      return {
        Free: freeCount,
        Monthly: monthlyCount,
        Annual: annualCount,
      };
    } catch (error) {
      console.error('Error counting subscription types:', error);
      throw new Error('Error counting subscription types');
    }
  }  
  
}
