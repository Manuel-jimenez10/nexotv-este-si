import { InputType, Int, Field } from '@nestjs/graphql';

@InputType({ description: 'Input para crear un nuevo seed. Este tipo se utiliza para proporcionar los datos necesarios para la creación de un nuevo seed.' })
export class CreateSeedInput {
  @Field(() => Int, { description: 'Campo de ejemplo (placeholder) para el seed.' })
  exampleField: number;
}
