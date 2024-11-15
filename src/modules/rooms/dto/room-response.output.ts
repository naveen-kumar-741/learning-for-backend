import { Field, ObjectType } from '@nestjs/graphql';
import { Room } from '../entities/room.entity';

@ObjectType()
export class GetAllGroupsResponse {
  @Field()
  totalCount: number;

  @Field(() => [Room])
  rooms: Room[];
}
