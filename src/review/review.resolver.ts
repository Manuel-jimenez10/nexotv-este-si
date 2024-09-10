import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ReviewService } from './review.service';
import { Review } from './entities/review.entity';
import { CreateReviewInput } from './dto/create-review.input';
import { UpdateReviewInput } from './dto/update-review.input';
import { BadRequestException } from '@nestjs/common';

@Resolver(() => Review)
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) {}

  @Mutation(() => Review, { 
    name: 'createReview', 
    description: 'createReview: Crea una nueva reseña en la plataforma. Lanza una excepción si el campo de reseña es nulo.' 
  })
  async createReview(
    @Args('createReviewInput') createReviewInput: CreateReviewInput,
  ) {
    const review = await this.reviewService.create(createReviewInput);

    if (!review.review) {
      throw new BadRequestException('Review field cannot be null');
    }

    return review;
  }

  @Query(() => [Review], { 
    name: 'review', 
    description: 'findAll: Obtiene todas las reseñas disponibles en la plataforma.' 
  })
  findAll() {
    return this.reviewService.findAll();
  }

  @Query(() => Review, { 
    name: 'review', 
    description: 'findOne: Obtiene una reseña específica basada en el ID proporcionado.' 
  })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.reviewService.findOne(id);
  }

  @Mutation(() => Review, { 
    name: 'updateReview', 
    description: 'updateReview: Actualiza una reseña existente con la información proporcionada en el input de actualización.' 
  })
  updateReview(
    @Args('updateReviewInput') updateReviewInput: UpdateReviewInput,
  ) {
    return this.reviewService.update(updateReviewInput.id, updateReviewInput);
  }

  @Mutation(() => Review, { 
    name: 'removeReview', 
    description: 'removeReview: Elimina una reseña basada en el ID proporcionado.' 
  })
  removeReview(@Args('id', { type: () => String }) id: string) {
    return this.reviewService.remove(id);
  }
}
