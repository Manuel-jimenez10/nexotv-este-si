import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { Subscription } from './entities/subscription.entity';
import { SubscriptionService } from './subscription.service';
import { UpdateSubscriptionInput } from './dto/update-subscription.input';

@Resolver(() => Subscription)
export class SubscriptionResolver {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Query(() => Subscription)
  async defaultSubscription(@Args('id') id: string): Promise<Subscription> {
    return this.subscriptionService.defaultSubscription(id);
  }

  @Mutation(() => Subscription)
  async updateSubscription(
    @Args('updateSubscriptionInput')
    updateSubscriptionInput: UpdateSubscriptionInput,
  ): Promise<Subscription> {
    return this.subscriptionService.update(updateSubscriptionInput);
  }

  @Query(() => Subscription)
  async getSubscription(@Args('userId2') userId2: string) {
    return this.subscriptionService.getSubscription(userId2);
  }
}
