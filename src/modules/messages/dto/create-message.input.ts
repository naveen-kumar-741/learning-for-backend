import { InputType, Int, Field } from '@nestjs/graphql';
import { UpdateRoomInput } from 'src/modules/rooms/dto/update-room.input';
import { UpdateUserInput } from 'src/modules/users/dto/update-user.input';

@InputType()
export class CreateMessageInput {
  @Field(() => String, { description: 'conversation text' })
  message: string;

  @Field(() => UpdateUserInput)
  user: UpdateUserInput;

  @Field(() => UpdateRoomInput)
  room: UpdateRoomInput;
}
