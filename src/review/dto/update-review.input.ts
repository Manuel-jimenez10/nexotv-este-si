import { IsUUID } from 'class-validator';
import { CreateReviewInput } from './create-review.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType({ description: 'Input para actualizar una reseña existente.' })
export class UpdateReviewInput extends PartialType(CreateReviewInput) {
  @Field(() => String, { description: 'ID único de la reseña que se desea actualizar.' })
  @IsUUID()
  id: string;
}
