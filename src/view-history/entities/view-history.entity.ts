import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Content } from 'src/content/entities/content.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType({ description: 'Entidad que representa el historial de vistas de contenido por parte de los usuarios.' })
@Entity({
  name: 'view-history',
})
export class ViewHistory {
  @Field(() => ID, { description: 'Identificador único del historial de vistas' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => User, { description: 'Usuario que realizó la vista del contenido' })
  @ManyToOne(() => User, (user) => user.viewingHistory)
  user: User;

  @Field(() => Content, { description: 'Contenido que fue visto por el usuario' })
  @ManyToOne(() => Content, (content) => content.viewingHistories)
  @JoinColumn({ name: 'contenido_id' })
  contenido: Content;

  @Field(() => Date, { description: 'Fecha en la que se realizó la visualización del contenido' })
  @Column({
    type: 'date',
  })
  fecha_visualizacion: Date;
}
