import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class SubscriptionCount {
  @Field(() => Int)
  Free: number;

  @Field(() => Int)
  Monthly: number;

  @Field(() => Int)
  Annual: number;
}
