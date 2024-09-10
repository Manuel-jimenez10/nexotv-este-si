import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsStrongPassword } from 'class-validator';

@InputType({ description: 'Datos necesarios para el inicio de sesión del usuario.' })
export class LoginInput {
  /**
   * Correo electrónico del usuario. Debe ser una dirección de correo electrónico válida.
   */
  @Field(() => String, { description: 'Correo electrónico del usuario. Debe ser una dirección de correo electrónico válida.' })
  @IsEmail({}, { message: 'El campo email debe ser una dirección de correo electrónico válida.' })
  email: string;

  /**
   * Contraseña del usuario. Debe cumplir con los requisitos de una contraseña fuerte.
   */
  @Field(() => String, { description: 'Contraseña del usuario. Debe cumplir con los requisitos de una contraseña fuerte.' })
  @IsStrongPassword({}, { message: 'La contraseña debe ser fuerte.' })
  password: string;
}
