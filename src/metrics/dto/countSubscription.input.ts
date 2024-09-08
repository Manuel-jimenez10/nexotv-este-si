import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SubscriptionCount {
  @Field()
  free: number;

  @Field()
  monthly: number;

  @Field()
  annual: number;
}