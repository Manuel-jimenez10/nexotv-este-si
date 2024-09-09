import { Field, Int, PartialType } from '@nestjs/graphql';
import { IsInt, IsOptional, IsUUID } from 'class-validator';
import { CreateContentInput } from './create-content.input';
import { InputType } from '@nestjs/graphql';

@InputType()
export class UpdateContentInput extends PartialType(CreateContentInput) {
  @Field(() => String)
  @IsUUID()
  id: string;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  amount?: number;
}
