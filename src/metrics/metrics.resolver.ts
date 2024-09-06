import { MetricsService } from './metrics.service';
import { Metrics } from './entities/metric.entity';
import { Int, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => Metrics)
export class MetricsResolver {
  constructor(private readonly metricsService: MetricsService) {}

  @Query(() => Int, { name: 'countUser' })
  countUser() {
    return this.metricsService.countUser();
  }

  @Query(() => Int, { name: 'countSubscriptions' })
  countSubscriptions() {
    return this.metricsService.countSubscriptions();
  }
}
