import { CreateSeedInput } from './create-seed.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType({ description: 'Input para actualizar un seed existente. Hereda los campos del input de creación y añade un campo adicional para la identificación del seed a actualizar.' })
export class UpdateSeedInput extends PartialType(CreateSeedInput) {
  @Field(() => Int, { description: 'ID único del seed que se desea actualizar.' })
  id: number;
}
