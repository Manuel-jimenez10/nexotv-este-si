import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { StripeService } from './stripe.service';
import { CreateCheckoutSessionDto } from './createCheckout.dto';

@Resolver()
export class StripeResolver {
  constructor(private readonly stripeService: StripeService) {}

  @Mutation(() => String, { name: 'createCheckoutSession', description: "createCheckoutSession: Crea una sesión de pago en Stripe y devuelve el ID de la sesión" })
  async createCheckoutSession(
    @Args('createCheckoutSessionDto')
    createCheckoutSessionDto: CreateCheckoutSessionDto,
  ): Promise<string> {
    return await this.stripeService.createCheckoutSession(
      createCheckoutSessionDto,
    ); // Retorna el ID de la sesión de Stripe
  }
}
