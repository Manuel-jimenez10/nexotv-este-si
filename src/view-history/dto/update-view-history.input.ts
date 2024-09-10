import { CreateViewHistoryInput } from './create-view-history.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType({ description: 'Datos necesarios para actualizar un historial de visualización.' })
export class UpdateViewHistoryInput extends PartialType(CreateViewHistoryInput) {
  /**
   * ID único del historial de visualización a actualizar. Este campo se utiliza para identificar el historial de visualización específico que se desea actualizar.
   */
  @Field(() => Int, { description: 'ID único del historial de visualización a actualizar. Este campo se utiliza para identificar el historial de visualización específico que se desea actualizar.' })
  id: number;
}
