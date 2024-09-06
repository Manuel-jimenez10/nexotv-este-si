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

@ObjectType()
@Entity({ name: 'review' })
export class Review {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column('text', { nullable: true })
  review: string;

  @Field()
  @CreateDateColumn()
  date: Date;

  @ManyToOne(() => User, (user) => user.review)
  user: User;

  @ManyToOne(() => Content, (content) => content.review)
  content: Content;
}
