import { Field, ObjectType } from '@nestjs/graphql';
import { Message } from '../entities/message.entity';

@ObjectType()
export class GetAllMessagesResponse {
  @Field()
  totalCount: number;

  @Field(() => [Message])
  messages: Message[];
}
