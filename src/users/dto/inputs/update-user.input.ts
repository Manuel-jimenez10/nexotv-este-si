import { IsArray, IsOptional, IsString } from 'class-validator';
import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType({ description: 'Datos necesarios para actualizar la información de un usuario.' })
export class UpdateUserInput extends PartialType(CreateUserInput) {
  /**
   * Identificador único del usuario. Este campo es obligatorio para actualizar la información del usuario.
   */
  @Field(() => String, { description: 'Identificador único del usuario. Este campo es obligatorio para actualizar la información del usuario.' })
  id: string;

  /**
   * Imágenes del usuario. Este campo es opcional y puede contener un array de URLs de imágenes.
   */
  @Field(() => [String], { nullable: true, description: 'Imágenes del usuario. Este campo es opcional y puede contener un array de URLs de imágenes.' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  userImage?: string[];

  /**
   * Roles del usuario. Este campo es opcional y puede contener un array de roles asignados al usuario.
   */
  @Field(() => [String], { nullable: true, description: 'Roles del usuario. Este campo es opcional y puede contener un array de roles asignados al usuario.' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  roles?: string[];
}
