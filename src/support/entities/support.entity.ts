import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType({ description: 'Representa una solicitud de soporte hecha por un usuario, incluyendo detalles del problema y la fecha de solicitud' })
@Entity({ name: 'support' })
export class Support {
  @Field(() => ID, { description: 'Identificador único de la solicitud de soporte' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => User, { description: 'Usuario que hizo la solicitud de soporte' })
  @ManyToOne(() => User, (user) => user.support)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Field(() => Date, { description: 'Fecha en la que se hizo la solicitud de soporte' })
  @Column({
    type: 'date',
  })
  fecha_solicitud: Date;

  @Field(() => String, { description: 'Descripción del problema reportado en la solicitud de soporte' })
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  descripcion_problema: string;
}
