import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { SubscriptionModule } from 'src/subscription/subscription.module';

@Module({
  providers: [UsersResolver, UsersService],
  imports: [TypeOrmModule.forFeature([User]), SubscriptionModule],
  exports: [
    //TypeOrmModule,
    UsersService,
  ],
})
export class UsersModule {}
