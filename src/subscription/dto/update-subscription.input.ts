import { IsString, IsUUID } from 'class-validator';
import { CreateSubscriptionInput } from './create-subscription.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSubscriptionInput extends PartialType(
  CreateSubscriptionInput,
) {
  @Field(() => String)
  @IsUUID()
  id: string;

  @Field(() => String)
  @IsString()
  stripeId: string;
}
