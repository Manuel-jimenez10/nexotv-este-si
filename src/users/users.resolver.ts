import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput, UpdateUserInput } from './dto/inputs';
import { PaginationArgs } from './dto/args/pagination.args';
import { ValidRolesArgs } from './dto/args/roles.args';
// import { UseGuards } from '@nestjs/common';
// import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { ValidRoles } from 'src/auth/enums/valid-roles.emun';

@Resolver(() => User)
// @UseGuards(JwtAuthGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User, { description: "createUser: Crea un nuevo usuario y devuelve el usuario creado" })
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return await this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users', description: "findAll: Devuelve todos los usuarios con paginación y filtros de roles opcionales" })
  async findAll(
    @Args('paginationArgs') paginationArgs: PaginationArgs,
    @Args('validRolesArgs') validRolesArgs: ValidRolesArgs,
    @CurrentUser([ValidRoles.admin]) user: User,
  ): Promise<User[]> {
    return await this.usersService.findAll(
      paginationArgs,
      validRolesArgs.roles,
    );
  }

  @Query(() => User, { name: 'user', description: "findOne: Encuentra un usuario por su ID" })
  async findOne(
    @Args('id', { type: () => String }) id: string,
    // @CurrentUser([ValidRoles.admin]) user: User,
  ): Promise<User> {
    return await this.usersService.findOne(id);
  }

  @Mutation(() => User, { description: "updateUser: Actualiza la información de un usuario existente" })
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    // @CurrentUser([ValidRoles.admin]) user: User,
  ): Promise<User> {
    return await this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => String, { description: "removeUser: Elimina un usuario por su ID y devuelve un mensaje de confirmación" })
  async removeUser(
    @Args('id', { type: () => String }) id: string,
    @CurrentUser([ValidRoles.admin]) user: User,
  ): Promise<string> {
    console.log(user);
    return await this.usersService.remove(id);
  }
}
