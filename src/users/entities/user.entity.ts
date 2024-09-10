import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Review } from 'src/review/entities/review.entity';
import { Subscription } from 'src/subscription/entities/subscription.entity';
import { Support } from 'src/support/entities/support.entity';
import { ViewHistory } from 'src/view-history/entities/view-history.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

// Enum para los roles de usuario
export enum Roles {
  admin = 'admin',
  user = 'user',
  superUser = 'superUser',
}

// Registro del enum en el esquema GraphQL
registerEnumType(Roles, {
  name: 'Roles', // Nombre que se utilizará en el esquema de GraphQL
  description: 'Roles de los usuarios', // Descripción opcional del enum
});

@ObjectType({ description: 'Entidad de usuario que representa la información del usuario, incluyendo sus suscripciones, historial de vistas, soportes y revisiones.' })
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID, { description: 'Identificador único del usuario' })
  id: string;

  @Column('text', { unique: true, nullable: false })
  @Field(() => String, { description: 'Correo electrónico del usuario' })
  email: string;

  @Column('text', { nullable: false })
  // @Field(() => String) // Contraseña no debe ser expuesta en GraphQL
  password: string;

  @Column('text', { nullable: false })
  @Field(() => String, { description: 'Nombre del usuario' })
  firstName: string;

  @Column('text', { nullable: false })
  @Field(() => String, { description: 'Apellido del usuario' })
  lastName: string;

  @Column('text', { array: true, default: [] })
  @Field(() => [String], { nullable: true, description: 'Imágenes del usuario' })
  userImage?: string[];

  @Field(() => [String], { nullable: true, description: 'Vistas del usuario' })
  views?: string[];

  @Column('text', { array: true, default: ['user'] })
  @Field(() => [String], { description: 'Roles asignados al usuario' })
  roles: string[];

  @Column({ type: 'boolean', default: true })
  @Field(() => Boolean, { description: 'Estado de activación del usuario' })
  isActive: boolean;

  @Field(() => Subscription, { nullable: true, description: 'Suscripción asociada al usuario' })
  @OneToOne(() => Subscription, (subscription) => subscription.user)
  subscription: Subscription;

  @Field(() => [ViewHistory], { description: 'Historial de vistas del usuario' })
  @OneToMany(() => ViewHistory, (history) => history.user)
  viewingHistory: ViewHistory[];

  @Field(() => [Number], { nullable: true, description: 'Favoritos del usuario, representados por números' })
  @Column({
    type: 'varchar',
    array: true,
    nullable: true,
  })
  favorites: number[];

  @Field(() => [Support], { description: 'Soportes asociados al usuario' })
  @OneToMany(() => Support, (support) => support.user)
  support: Support[];

  @Field(() => [Review], { description: 'Revisiones hechas por el usuario' })
  @OneToMany(() => Review, (review) => review.user)
  review: Review[];
}
