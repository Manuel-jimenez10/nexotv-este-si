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

export enum Tipo {
  Annual = 'Annual',
  Monthly = 'Monthly',
  Free = 'Free',
}

registerEnumType(Tipo, {
  name: 'Tipo', // Nombre del enum en el esquema GraphQL
});

@ObjectType() // Decorador para convertir la clase en un tipo GraphQL
@Entity({
  name: 'subscription',
})
export class Subscription {
  @Field(() => ID) // Decorador para el campo ID
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String) // Decorador para campos de tipo Enum/String
  @Column({
    type: 'enum',

    enum: Tipo,
  })
  tipo: Tipo;

  @Field(() => Float) // Decorador para campos de tipo decimal
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  price: number;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  stripeId?: string;

  @Field(() => User, { nullable: true })
  @OneToOne(() => User, (user) => user.subscription)
  @JoinColumn()
  user: User;
}
