import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateSupportInput } from './create-support.input';
import { IsString, IsOptional } from 'class-validator';

@InputType({ description: 'Input para actualizar una solicitud de soporte.' })
export class UpdateSupportInput extends PartialType(CreateSupportInput) {
  /**
   * Descripción actualizada del problema que el usuario está experimentando.
   * Este campo debe ser una cadena de texto y es opcional.
   */
  @Field(() => String, { nullable: true, description: 'Descripción actualizada del problema que el usuario está experimentando. Este campo debe ser una cadena de texto y es opcional.' })
  @IsString()
  @IsOptional()
  descripcion_problema?: string;
}
