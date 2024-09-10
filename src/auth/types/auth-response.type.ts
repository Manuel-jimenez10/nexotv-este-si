import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

@ObjectType({ description: 'Respuesta de autenticación que incluye el token y la información del usuario' })
export class AuthResponse {
  @Field(() => String, { description: 'Token de autenticación JWT para el usuario' })
  token: string;

  @Field(() => User, { description: 'Información del usuario autenticado' })
  user: User;
}
