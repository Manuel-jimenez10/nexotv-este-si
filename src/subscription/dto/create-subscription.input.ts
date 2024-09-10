import { InputType, Field, Int } from '@nestjs/graphql';
import { IsEnum, IsNumber, IsPositive } from 'class-validator';
import { Tipo } from '../entities/subscription.entity';

@InputType({ description: 'Input para crear una nueva suscripción. Incluye los campos necesarios para definir una suscripción en el sistema.' })
export class CreateSubscriptionInput {
  /**
   * Tipo de suscripción.
   * Puede ser uno de los valores definidos en el enum `Tipo`.
   */
  @Field(() => Tipo, { nullable: true, description: 'Tipo de suscripción. Puede ser uno de los valores definidos en el enum `Tipo`.' })
  @IsEnum(Tipo, { message: 'Tipo debe ser un valor válido de Tipo' })
  tipo?: Tipo;

  /**
   * Precio de la suscripción.
   * Debe ser un número positivo.
   */
  @Field(() => Int, { description: 'Precio de la suscripción. Debe ser un número positivo.' })
  @IsNumber({}, { message: 'Price must be a number' })
  @IsPositive({ message: 'Price must be a positive number' })
  price: number;
}
