import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType({ description: 'Representa la cantidad de suscripciones por tipo.' })
export class SubscriptionCount {
  @Field(() => Int, { description: 'Cantidad de suscripciones de tipo Free.' })
  Free: number;

  @Field(() => Int, { description: 'Cantidad de suscripciones de tipo Monthly.' })
  Monthly: number;

  @Field(() => Int, { description: 'Cantidad de suscripciones de tipo Annual.' })
  Annual: number;
}
