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

  async countTypeSubscription(): Promise<{ free: number, monthly: number, annual: number }> {
    try {
      // Esperar la resolución de find()
      const subscriptions = await this.subscriptionRepository.find();
  
      // Contar las suscripciones por tipo
      const freeCount = subscriptions.filter(subscription => subscription.tipo === Tipo.Free).length;
      const monthlyCount = subscriptions.filter(subscription => subscription.tipo === Tipo.Monthly).length;
      const annualCount = subscriptions.filter(subscription => subscription.tipo === Tipo.Annual).length;
  
      // Retornar un objeto con las cantidades de cada tipo de suscripción
      return {
        free: freeCount,
        monthly: monthlyCount,
        annual: annualCount
      };
    } catch (error) {
      // Manejar el error adecuadamente
      console.error('Error counting subscription types:', error);
      throw new Error('Error counting subscription types');
    }
  }
  
}
