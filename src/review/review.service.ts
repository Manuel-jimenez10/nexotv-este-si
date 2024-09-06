import { Injectable } from '@nestjs/common';
import { CreateReviewInput } from './dto/create-review.input';
import { UpdateReviewInput } from './dto/update-review.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Content } from '../content/entities/content.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
  ) {}

  async create(createReviewInput: CreateReviewInput): Promise<Review> {
    const { userId, contentId, review } = createReviewInput;
    console.log(review);
    const user = await this.userRepository.findOneOrFail({
      where: { id: userId },
    });
    const content = await this.contentRepository.findOneOrFail({
      where: { id: contentId },
    });

    const newReview = this.reviewRepository.create({
      review,
      user,
      content,
      date: new Date(),
    });

    return this.reviewRepository.save(newReview);
  }

  async findAll() {
    return await this.reviewRepository.find();
  }

  async findOne(id: string) {
    const review = await this.reviewRepository.findOneBy({ id });
    return review;
  }

  async update(id: string, updateReviewInput: UpdateReviewInput) {
    const review = await this.reviewRepository.preload({
      id,
      ...updateReviewInput,
    });
    await this.reviewRepository.save(review);
    return review;
  }

  async remove(id: string): Promise<Review> {
    const review = await this.reviewRepository.findOne({ where: { id } });

    if (!review) {
      throw new Error('Review not found');
    }

    return await this.reviewRepository.remove(review);
  }
}
