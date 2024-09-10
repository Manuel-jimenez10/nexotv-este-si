import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType({ description: 'Metrics: Entidad que representa las métricas relacionadas con los usuarios y suscripciones.' })
@Entity({
  name: 'metrics',
})
export class Metrics {
  @Field(() => ID, { description: 'ID: Identificador único de las métricas.' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Number, { description: 'cantidad_usuarios_registrados: Cantidad total de usuarios registrados en la plataforma.' })
  @Column({
    type: 'int',
  })
  cantidad_usuarios_registrados: number;

  @Field(() => Number, { description: 'cantidad_usuarios_premium: Cantidad total de usuarios que tienen una suscripción premium.' })
  @Column({
    type: 'int',
  })
  cantidad_usuarios_premium: number;

  @Field(() => Number, { description: 'cantidad_usuarios_free: Cantidad total de usuarios que utilizan la plataforma de manera gratuita.' })
  @Column({
    type: 'int',
  })
  cantidad_usuarios_free: number;
}
