import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Stripe from 'stripe';
import { Subscription } from 'src/subscription/entities/subscription.entity';
import { CreateCheckoutSessionDto } from './createCheckout.dto';
import { SubscriptionService } from 'src/subscription/subscription.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly subscriptionService: SubscriptionService,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20',
    });
  }
  async createCheckoutSession(
    createCheckoutSessionDto: CreateCheckoutSessionDto,
  ) {
    const { priceId, price, tipo, userId } = createCheckoutSessionDto;

    console.log(priceId, price, tipo, userId);

    // Crea una sesión de Checkout de Stripe
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTNEXO}/success`,
      cancel_url: `${process.env.FRONTNEXO}/cancel`,
    });

    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const subscription = await this.subscriptionRepository.findOne({
      where: { user },
    });

    await this.subscriptionService.update({
      id: subscription.id,
      price,
      tipo,
      stripeId: session.id,
    });

    return session.id;
  }
}
