import { MetricsService } from './metrics.service';
import { Metrics } from './entities/metric.entity';
import { Int, Query, Resolver } from '@nestjs/graphql';
import { SubscriptionCount } from './dto/countSubscription.input';

@Resolver(() => Metrics)
export class MetricsResolver {
  constructor(private readonly metricsService: MetricsService) {}

  @Query(() => Int, { name: 'countUser', description: 'countUser: Cuenta el número total de usuarios registrados' })
  countUser(): Promise<number> {
    return this.metricsService.countUser();
  }

  @Query(() => Int, { name: 'countSubscriptions', description: 'countSubscriptions: Cuenta el número total de suscripciones' })
  countSubscriptions(): Promise<number> {
    return this.metricsService.countSubscriptions();
  }

  @Query(() => SubscriptionCount, { name: 'getSubscriptionCounts', description: 'getSubscriptionCounts: Obtiene el número de suscripciones por tipo' })
  async getSubscriptionCounts(): Promise<SubscriptionCount> {
    return this.metricsService.countTypeSubscription();
  }
}
