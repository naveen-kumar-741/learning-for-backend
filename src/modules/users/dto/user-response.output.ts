import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@ObjectType()
export class GetAllUsersResponse {
  @Field()
  totalCount: number;

  @Field(() => [User])
  users: User[];
}
