import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { Subscription } from './entities/subscription.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionResolver } from './subscription.resolver';
import { User } from 'src/users/entities/user.entity';

@Module({
  providers: [SubscriptionResolver, SubscriptionService],
  imports: [TypeOrmModule.forFeature([Subscription, User])],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}
