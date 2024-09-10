import { CreateMetricInput } from './create-metric.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMetricInput extends PartialType(CreateMetricInput) {
  /**
   * Identificador único de la métrica que se desea actualizar.
   */
  @Field(() => Int, { description: 'Identificador único de la métrica.' })
  id: number;
}
