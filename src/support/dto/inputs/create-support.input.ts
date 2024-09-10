import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType({ description: 'Input para crear una solicitud de soporte.' })
export class CreateSupportInput {
  /**
   * ID del usuario que solicita soporte.
   * Este campo debe ser un UUID válido y no puede estar vacío.
   */
  @Field(() => String, { description: 'ID del usuario que solicita soporte. Este campo debe ser un UUID válido y no puede estar vacío.' })
  @IsUUID()
  @IsNotEmpty({ message: 'userId no puede estar vacío' })
  userId: string;

  /**
   * Descripción del problema que el usuario está experimentando.
   * Este campo debe ser una cadena de texto y no puede estar vacío.
   */
  @Field(() => String, { description: 'Descripción del problema que el usuario está experimentando. Este campo debe ser una cadena de texto y no puede estar vacío.' })
  @IsString()
  @IsNotEmpty()
  descripcion_problema: string;
}
