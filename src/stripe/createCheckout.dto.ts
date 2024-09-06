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
@InputType()
export class CreateCheckoutSessionDto {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'El campo priceId no puede estar vacío' })
  priceId: string;

  @Field(() => Float)
  @IsNumber()
  @IsPositive({ message: 'El campo price debe ser un número positivo' })
  price: number;

  @Field(() => Tipo)
  @IsEnum(Tipo, { message: 'El campo tipo debe ser un valor válido de Tipo' })
  tipo: Tipo;

  @Field()
  @IsUUID()
  @IsOptional()
  userId?: string;
}
