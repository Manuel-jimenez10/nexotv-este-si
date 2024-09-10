import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsEnum,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { Tipo } from 'src/subscription/entities/subscription.entity';
import { ArgsType, Field, Float, InputType } from '@nestjs/graphql';

@ArgsType()
@InputType({ description: 'Input para crear una sesión de pago en el sistema de suscripciones.' })
export class CreateCheckoutSessionDto {
  @Field({ description: 'El identificador del precio asociado a la sesión de pago.' })
  @IsString()
  @IsNotEmpty({ message: 'El campo priceId no puede estar vacío' })
  priceId: string;

  @Field(() => Float, { description: 'El precio de la sesión de pago, debe ser un número positivo.' })
  @IsNumber()
  @IsPositive({ message: 'El campo price debe ser un número positivo' })
  price: number;

  @Field(() => Tipo, { description: 'El tipo de suscripción asociado a la sesión de pago.' })
  @IsEnum(Tipo, { message: 'El campo tipo debe ser un valor válido de Tipo' })
  tipo: Tipo;

  @Field({ description: 'El identificador del usuario que realiza la sesión de pago, es opcional.' })
  @IsUUID()
  @IsOptional()
  userId?: string;
}
