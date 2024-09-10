import {
  ObjectType,
  Field,
  ID,
  Float,
  registerEnumType,
} from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

// Enum para los tipos de suscripción
export enum Tipo {
  Annual = 'Annual',
  Monthly = 'Monthly',
  Free = 'Free',
}

// Registro del enum en el esquema GraphQL
registerEnumType(Tipo, {
  name: 'Tipo', // Nombre del enum en el esquema GraphQL
  description: 'Tipo de suscripción disponible en el sistema', // Descripción del enum
});


@ObjectType({ description: 'Representa una suscripción de usuario con detalles como tipo, precio, y la relación con el usuario' })
@Entity({ name: 'subscription' })
export class Subscription {
  @Field(() => ID, { nullable: true, description: 'Identificador único de la suscripción' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Tipo, { nullable: true, description: 'Tipo de suscripción, puede ser anual, mensual o gratuita' })
  @Column({
    type: 'enum',
    enum: Tipo,
  })
  tipo?: Tipo;

  @Field(() => Float, { description: 'Precio de la suscripción en formato decimal' })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  price: number;

  @Field(() => String, { nullable: true, description: 'ID de la suscripción en Stripe, si aplica' })
  @Column('text', { nullable: true })
  stripeId?: string;

  @Field(() => User, { nullable: true, description: 'Usuario asociado con la suscripción' })
  @OneToOne(() => User, (user) => user.subscription)
  @JoinColumn()
  user: User;
}
