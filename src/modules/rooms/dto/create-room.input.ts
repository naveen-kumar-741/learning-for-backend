import { InputType, Int, Field } from '@nestjs/graphql';
import { UpdateUserInput } from 'src/modules/users/dto/update-user.input';

@InputType()
export class CreateRoomInput {
  @Field({
    nullable: true,
    description: 'The unique roomName for the registering user.',
  })
  roomName?: string;

  @Field(() => [UpdateUserInput])
  users: UpdateUserInput[];
}
