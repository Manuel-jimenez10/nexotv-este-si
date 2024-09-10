import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Content } from '../../content/entities/content.entity';

@ObjectType({ description: 'Representa una reseña hecha por un usuario sobre un contenido' })
@Entity({ name: 'review' })
export class Review {
  @Field(() => ID, { description: 'Identificador único de la reseña, generado automáticamente como UUID' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String, { nullable: true, description: 'Contenido de la reseña escrita, puede ser nulo' })
  @Column('text', { nullable: true })
  review: string;

  @Field({ description: 'Fecha en la que se creó la reseña' })
  @CreateDateColumn()
  date: Date;

  @Field(() => User, { description: 'Usuario que escribió la reseña' })
  @ManyToOne(() => User, (user) => user.review)
  user: User;

  @Field(() => Content, { description: 'Contenido sobre el que se escribió la reseña' })
  @ManyToOne(() => Content, (content) => content.review)
  content: Content;
}
