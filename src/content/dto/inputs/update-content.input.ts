import { Field, Int, PartialType } from '@nestjs/graphql';
import { IsInt, IsOptional, IsUUID } from 'class-validator';
import { CreateContentInput } from './create-content.input';
import { InputType } from '@nestjs/graphql';

@InputType({ description: 'Input para actualizar el contenido existente.' })
export class UpdateContentInput extends PartialType(CreateContentInput) {
  @Field(() => String, { description: 'ID del contenido a actualizar.' })
  @IsUUID()
  id: string;

  @Field(() => Int, { nullable: true, description: 'Cantidad opcional relacionada con el contenido.' })
  @IsInt()
  @IsOptional()
  amount?: number;
}
