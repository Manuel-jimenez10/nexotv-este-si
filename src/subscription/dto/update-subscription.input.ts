import { IsOptional, IsString, IsUUID } from 'class-validator';
import { CreateSubscriptionInput } from './create-subscription.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@InputType()
export class UpdateSubscriptionInput extends PartialType(
  CreateSubscriptionInput,
) {
  @Field(() => String, {nullable: true})
  @IsOptional()
  @IsUUID()
  userId?: string;

  @Field(() => String, {nullable: true})
  @IsString()
  @IsOptional()
  stripeId?: string;
}
