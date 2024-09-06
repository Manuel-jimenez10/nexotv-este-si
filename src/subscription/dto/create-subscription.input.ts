import { InputType, Field, Int } from '@nestjs/graphql';
import { IsEnum, IsNumber, IsPositive } from 'class-validator';
import { Tipo } from '../entities/subscription.entity';

@InputType()
export class CreateSubscriptionInput {
  @Field(() => Tipo)
  @IsEnum(Tipo)
  tipo: Tipo;

  @Field(() => Int)
  @IsNumber({}, { message: 'Price must be a number' })
  @IsPositive({ message: 'Price must be a positive number' })
  price: number;
}
