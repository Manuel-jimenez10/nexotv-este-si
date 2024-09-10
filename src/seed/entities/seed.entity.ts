import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType({ description: 'Entidad utilizada para la carga inicial de datos en la base de datos' })
@Entity({ name: 'seed' }) // Decorador para definir la entidad en TypeORM
export class Seed {
  @Field(() => Int, { description: 'Campo de ejemplo para ilustrar la estructura de datos, representa un número entero' })
  @PrimaryGeneratedColumn() // Define la columna primaria de la entidad
  id: number;

  @Field(() => Int, { description: 'Campo de ejemplo, representa un número entero' })
  @Column({ type: 'int' }) // Define una columna adicional
  exampleField: number;
}
