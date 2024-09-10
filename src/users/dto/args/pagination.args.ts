import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsOptional } from 'class-validator';

@ArgsType()
@InputType({ description: 'Argumentos para la paginación de resultados.' })
export class PaginationArgs {
  /**
   * Límite de resultados a devolver. Este campo es opcional y debe ser un número entero.
   */
  @Field(() => Int, { nullable: true, description: 'Límite de resultados a devolver. Este campo es opcional y debe ser un número entero.' })
  @IsOptional()
  @IsInt({ message: 'limit debe ser un número entero' })
  limit?: number;

  /**
   * Desplazamiento de los resultados. Este campo es opcional y debe ser un número entero.
   */
  @Field(() => Int, { nullable: true, description: 'Desplazamiento de los resultados. Este campo es opcional y debe ser un número entero.' })
  @IsOptional()
  @IsInt({ message: 'offset debe ser un número entero' })
  offset?: number;
}
