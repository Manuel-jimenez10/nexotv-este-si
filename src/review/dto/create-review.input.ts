import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';

@InputType({ description: 'Input para crear una nueva reseña.' })
export class CreateReviewInput {
  @Field(() => String, { description: 'Contenido de la reseña proporcionada por el usuario.' })
  @IsString()
  review: string;

  @Field(() => String, { description: 'ID único del usuario que realiza la reseña.' })
  @IsUUID()
  userId: string;

  @Field(() => String, { description: 'ID único del contenido al que se le está realizando la reseña.' })
  @IsUUID()
  contentId: string;
}
