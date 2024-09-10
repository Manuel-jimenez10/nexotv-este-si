import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { Subscription } from './entities/subscription.entity';
import { SubscriptionService } from './subscription.service';
import { UpdateSubscriptionInput } from './dto/update-subscription.input';

@Resolver(() => Subscription)
export class SubscriptionResolver {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Query(() => Subscription, { description: "defaultSubscription: Obtiene la suscripción predeterminada por su ID" })
  async defaultSubscription(@Args('id') id: string): Promise<Subscription> {
    return this.subscriptionService.defaultSubscription(id);
  }

  @Mutation(() => Subscription, { nullable: true, description: "updateSubscription: Actualiza una suscripción existente" })
  async updateSubscription(
    @Args('updateSubscriptionInput') updateSubscriptionInput: UpdateSubscriptionInput,
  ): Promise<Subscription> {
    return this.subscriptionService.update(updateSubscriptionInput);
  }

  @Query(() => [Subscription], { description: "getSubscription: Devuelve todas las suscripciones" })
  async getSubscription(): Promise<Subscription[]> {
    return await this.subscriptionService.getSubscription();
  }
}
