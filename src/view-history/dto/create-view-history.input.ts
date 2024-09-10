import { InputType, Int, Field } from '@nestjs/graphql';

@InputType({ description: 'Datos necesarios para crear un historial de visualización.' })
export class CreateViewHistoryInput {
  /**
   * Example field (placeholder). Este campo sirve como ejemplo y puede ser reemplazado por campos específicos necesarios para la creación del historial de visualización.
   */
  @Field(() => Int, { description: 'Este campo sirve como ejemplo y puede ser reemplazado por campos específicos necesarios para la creación del historial de visualización.' })
  exampleField: number;
}
