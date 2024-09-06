import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewResolver } from './review.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Content } from '../content/entities/content.entity';
import { User } from '../users/entities/user.entity';

@Module({
  providers: [ReviewResolver, ReviewService],
  imports: [TypeOrmModule.forFeature([Review, Content, User])],
  exports: [
    //TypeOrmModule,
    ReviewService,
  ],
})
export class ReviewModule {}
