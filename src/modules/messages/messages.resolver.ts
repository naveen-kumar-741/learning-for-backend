import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MessagesService } from './Messages.service';
import { Message } from './entities/Message.entity';
import { CreateMessageInput } from './dto/create-Message.input';
import { UpdateMessageInput } from './dto/update-Message.input';
import { User } from '../users/entities/user.entity';
import { CurrentUser } from 'src/auth/decorators/currentuser.decorator';

@Resolver(() => Message)
export class MessagesResolver {
  constructor(private readonly MessagesService: MessagesService) {}

  @Mutation(() => Message)
  createMessage(
    @CurrentUser() user: User,
    @Args('createMessageInput') createMessageInput: CreateMessageInput,
  ) {
    return this.MessagesService.createMessage({ ...createMessageInput, user });
  }

  @Query(() => [Message], { name: 'getAllMessages' })
  getAllMessages() {
    return this.MessagesService.getAllMessages();
  }

  @Query(() => Message, { name: 'getMessageById' })
  getMessageById(@Args('id', { type: () => String }) id: string) {
    return this.MessagesService.getMessageById(id);
  }

  @Mutation(() => Message)
  updateMessage(
    @Args('updateMessageInput') updateMessageInput: UpdateMessageInput,
  ) {
    return this.MessagesService.updateMessage(
      updateMessageInput.id,
      updateMessageInput,
    );
  }

  @Mutation(() => String)
  removeMessage(@Args('id', { type: () => String }) id: string) {
    return this.MessagesService.removeMessage(id);
  }
}
