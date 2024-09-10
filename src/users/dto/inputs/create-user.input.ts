import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsStrongPassword, Length } from 'class-validator';

@InputType({ description: 'Datos necesarios para crear un nuevo usuario.' })
export class CreateUserInput {
  @Field(() => String, { description: 'Correo electrónico del usuario. Debe ser una dirección de correo electrónico válida.' })
  @IsEmail({}, { message: 'El campo email debe ser una dirección de correo electrónico válida.' })
  email: string;

  @Field(() => String, { description: 'Contraseña del usuario. Debe cumplir con los requisitos de una contraseña fuerte.' })
  @IsStrongPassword({}, { message: 'La contraseña debe ser fuerte.' })
  password: string;

  @Field(() => String, { description: 'Primer nombre del usuario. Debe tener una longitud mínima de 1 carácter y máxima de 80 caracteres.' })
  @IsNotEmpty({ message: 'El campo firstName no puede estar vacío.' })
  @Length(1, 80, { message: 'El campo firstName debe tener entre 1 y 80 caracteres.' })
  firstName: string;

  @Field(() => String, { description: 'Apellido del usuario. Debe tener una longitud mínima de 1 carácter y máxima de 40 caracteres.' })
  @IsNotEmpty({ message: 'El campo lastName no puede estar vacío.' })
  @Length(1, 40, { message: 'El campo lastName debe tener entre 1 y 40 caracteres.' })
  lastName: string;
}
