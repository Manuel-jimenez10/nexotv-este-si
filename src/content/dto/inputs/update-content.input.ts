import { Field, PartialType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { CreateContentInput } from './create-content.input';
import { InputType } from '@nestjs/graphql';

@InputType()
export class UpdateContentInput extends PartialType(CreateContentInput) {
  @Field(() => String)
  @IsUUID()
  id: string;
}
