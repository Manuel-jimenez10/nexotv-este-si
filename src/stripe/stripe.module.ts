import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeResolver } from './stripe.resolver';
import { Subscription } from 'src/subscription/entities/subscription.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionModule } from 'src/subscription/subscription.module';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/entities/user.entity';

@Module({
  providers: [StripeService, StripeResolver],
  imports: [
    TypeOrmModule.forFeature([Subscription, User]),
    SubscriptionModule,
    UsersModule,
  ],
  exports: [StripeService],
})
export class StripeModule {}
