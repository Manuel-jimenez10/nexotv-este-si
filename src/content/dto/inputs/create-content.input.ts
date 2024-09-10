import { InputType, Field } from '@nestjs/graphql';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { Status, Type } from '../enums/content.enum';

@InputType({ description: 'Input para crear un nuevo contenido multimedia.' })
export class CreateContentInput {
  @Field(() => String, { description: 'Título del contenido.' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field(() => String, { description: 'Descripción detallada del contenido.' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @Field(() => String, { nullable: true, description: 'URL de la imagen asociada al contenido (opcional).' })
  @IsOptional()
  @IsUrl()
  @IsString()
  image?: string;

  @Field(() => String, { description: 'Duración del contenido.' })
  @IsString()
  duration: string;

  @Field(() => [String], { description: 'Categorías asociadas al contenido.' })
  @IsArray()
  @IsString({ each: true })
  category: string[];

  @Field(() => Type, { nullable: true, description: 'Tipo de contenido (opcional).' })
  @IsOptional()
  @IsEnum(Type)
  type?: Type;

  @Field(() => Status, { nullable: true, description: 'Estado del contenido (opcional).' })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @Field(() => [String], { description: 'Lista de URLs del contenido.' })
  @IsArray()
  @IsString({ each: true })
  contentUrl: string[];
}
