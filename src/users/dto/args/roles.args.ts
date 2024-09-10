import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IsArray } from 'class-validator';
import { ValidRoles } from 'src/auth/enums/valid-roles.emun';

@ArgsType()
@InputType({ description: 'Argumentos para especificar roles válidos.' })
export class ValidRolesArgs {
  /**
   * Lista de roles válidos para los cuales se aplican las reglas. Este campo es opcional y debe ser un arreglo de roles válidos.
   */
  @Field(() => [ValidRoles], { nullable: true, description: 'Lista de roles válidos para los cuales se aplican las reglas. Este campo es opcional y debe ser un arreglo de roles válidos.' })
  @IsArray({ message: 'roles debe ser un arreglo de roles válidos' })
  roles: ValidRoles[] = [];
}
