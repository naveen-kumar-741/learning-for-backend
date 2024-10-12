import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class GetPaginationInput {
  @Field(() => Int, {
    nullable: true,
    description: 'Page number of the records',
  })
  @IsNumber()
  pageNo?: number;

  @IsNumber()
  @Field(() => Int, {
    nullable: true,
    description: 'Number of records to be fetched per page',
  })
  perPage?: number;

  @IsString()
  @Field({
    nullable: true,
    description: 'Search term incase we need to search by term',
  })
  searchParam?: string;
}
