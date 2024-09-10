import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput, SignupInput } from './dto/input';
import { AuthResponse } from './types/auth-response.type';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guards';
import { CurrentUser } from './decorator/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
//import { ValidRoles } from './enums/valid-roles.emun';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, { 
    name: 'signup',
    description: 'signup: Registra un nuevo usuario con la información proporcionada y devuelve un token de autenticación.' 
  })
  signup(@Args('signupInput') signupInput: SignupInput): Promise<AuthResponse> {
    return this.authService.signup(signupInput);
  }

  @Mutation(() => AuthResponse, { 
    name: 'login',
    description: 'login: Inicia sesión con las credenciales proporcionadas y devuelve un token de autenticación.' 
  })
  async login(
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<AuthResponse> {
    return await this.authService.login(loginInput);
  }

  @Query(() => AuthResponse, { 
    name: 'revalite',
    description: 'revalidateToken: Revalida el token de autenticación actual usando el token proporcionado en las cabeceras de la solicitud y devuelve un nuevo token.' 
  })
  @UseGuards(JwtAuthGuard)
  revalidateToken(
    @CurrentUser(/*[ValidRoles.admin]*/) user: User,
  ): AuthResponse {
    return this.authService.revalidateToken(user);
  }
}
