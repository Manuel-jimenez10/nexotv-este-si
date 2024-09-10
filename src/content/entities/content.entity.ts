import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { ViewHistory } from 'src/view-history/entities/view-history.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Status, Type } from '../dto/enums/content.enum';
import { Review } from 'src/review/entities/review.entity';

@ObjectType({ description: 'Representa el contenido que puede ser visualizado, revisado y categorizado. Incluye detalles como título, descripción, imagen, duración, categoría, tipo, estado y URLs del contenido.' })
@Entity({
  name: 'content',
})
export class Content {
  @Field(() => ID, { description: 'ID: Identificador único del contenido.' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String, { description: 'title: Título del contenido.' })
  @Column({
    type: 'varchar',
    length: 100,
  })
  @IsNotEmpty()
  title: string;

  @Field(() => String, { description: 'description: Descripción detallada del contenido.' })
  @Column('text')
  description: string;

  @Field(() => String, { nullable: true, description: 'image: URL de la imagen asociada al contenido.' })
  @Column('text', { nullable: true })
  image?: string;

  @Field(() => String, { description: 'duration: Duración del contenido.' })
  @Column('text')
  duration: string;

  @Field(() => [String], { description: 'category: Categorías asociadas al contenido.' })
  @Column('varchar', { array: true, default: [] })
  category: string[];

  @Field(() => Type, { nullable: true, description: 'type: Tipo del contenido.' })
  @Column({
    type: 'enum',
    enum: Type,
    nullable: true,
  })
  type?: Type;

  @Field(() => Status, { nullable: true, description: 'status: Estado del contenido.' })
  @Column({
    type: 'enum',
    enum: Status,
    nullable: true,
  })
  status?: Status;

  @Field(() => [String], { description: 'contentUrl: URLs del contenido.' })
  @Column('varchar', { array: true, default: [] })
  contentUrl: string[];

  @Field(() => [ViewHistory], { nullable: true, description: 'viewingHistories: Historial de visualización asociado al contenido.' })
  @OneToMany(() => ViewHistory, (history) => history.contenido, {
    nullable: true,
  })
  viewingHistories?: ViewHistory[];

  @OneToMany(() => Review, (review) => review.content)
  review: Review[];

  @Field(() => Int, { nullable: true, description: 'rate: Calificación del contenido.' })
  @Column({ type: 'int', default: 0 })
  rate: number;

  @Column({ type: 'int', default: 0 })
  counterRate: number;
}
