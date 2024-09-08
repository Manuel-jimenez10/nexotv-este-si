import { Module } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { MetricsResolver } from './metrics.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Metrics } from './entities/metric.entity';
import { User } from '../users/entities/user.entity';
import { Subscription } from 'src/subscription/entities/subscription.entity';

@Module({
  providers: [MetricsResolver, MetricsService],
  imports: [TypeOrmModule.forFeature([Metrics, User, Subscription])],
})
export class MetricsModule {}
