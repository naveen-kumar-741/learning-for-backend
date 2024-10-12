import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MessagesService } from './messages.service';
import { Message } from './entities/message.entity';
import { CreateMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';
import { User } from '../users/entities/user.entity';
import { CurrentUser } from 'src/auth/decorators/currentuser.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetAllMessagesResponse } from './dto/message-response.output';
import { GetPaginationInput } from '../common/pagination.input';

@Resolver(() => Message)
export class MessagesResolver {
  constructor(private readonly MessagesService: MessagesService) {}

  @Mutation(() => Message, { name: 'createMessage' })
  @UseGuards(JwtAuthGuard)
  createMessage(
    @CurrentUser() user: User,
    @Args('createMessageInput') createMessageInput: CreateMessageInput,
  ) {
    return this.MessagesService.createMessage({ user, ...createMessageInput });
  }

  @Query(() => [Message], { name: 'getAllMessages' })
  getAllMessages() {
    return this.MessagesService.getAllMessages();
  }

  @Query(() => GetAllMessagesResponse, { name: 'getAllMessagesByRoomId' })
  getAllMessagesByRoomId(
    @Args('id', { type: () => String }) id,
    @Args('pagination', { type: () => GetPaginationInput }) pagination,
  ) {
    return this.MessagesService.getAllMessagesByRoomId(
      id,
      pagination?.searchParam,
      pagination?.pageNo,
      pagination?.perPage,
    );
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
