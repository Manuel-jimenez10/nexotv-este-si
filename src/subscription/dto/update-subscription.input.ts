import { IsOptional, IsString, IsUUID } from 'class-validator';
import { CreateSubscriptionInput } from './create-subscription.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType({ description: 'Input para actualizar una suscripción existente.' })
export class UpdateSubscriptionInput extends PartialType(CreateSubscriptionInput) {
  /**
   * ID del usuario asociado con la suscripción.
   * Este campo es opcional y debe ser un UUID válido si se proporciona.
   */
  @Field(() => String, { nullable: true, description: 'ID del usuario asociado con la suscripción. Este campo es opcional y debe ser un UUID válido si se proporciona.' })
  @IsOptional()
  @IsUUID()
  userId?: string;

  /**
   * ID de Stripe asociado con la suscripción.
   * Este campo es opcional y debe ser una cadena si se proporciona.
   */
  @Field(() => String, { nullable: true, description: 'ID de Stripe asociado con la suscripción. Este campo es opcional y debe ser una cadena si se proporciona.' })
  @IsOptional()
  @IsString({ message: 'stripeId debe ser una cadena de texto' })
  stripeId?: string;
}
