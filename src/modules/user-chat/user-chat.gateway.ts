import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { UserChatService } from './user-chat.service';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { MessagesService } from '../messages/messages.service';
import { MyLogger } from 'src/logger/logger.service';
import { Message } from '../messages/entities/message.entity';
import { CreateMessageInput } from '../messages/dto/create-message.input';

interface MessageType {
  userId: string;
  roomId: string;
  message: string;
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class UserChatGateway {
  constructor(
    private readonly userChatService: UserChatService,
    private readonly userService: UsersService,
    private readonly messageService: MessagesService,
  ) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string): string {
    this.server.emit('events', data);
    return data;
  }

  @SubscribeMessage('chat')
  async handleChatEvent(
    @MessageBody()
    payload: CreateMessageInput,
  ): Promise<Message> {
    Logger.log(JSON.stringify(payload));
    this.server.to(payload.room.id).emit('chat', payload); // broadcast messages
    const message = await this.messageService.createMessage(payload);
    return message;
  }

  @SubscribeMessage('join_room')
  async handleSetClientDataEvent(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    payload: {
      userId: string;
    },
  ) {
    if (client.id && payload.userId) {
      const user = await this.userService.getUserById(payload.userId);
      if (user.rooms) {
        for (let room of user.rooms) {
          Logger.log(`${client.id} is joining ${room.id}`);
          await this.server.in(client.id).socketsJoin(room.id);
        }
      } else {
        Logger.error(`Error ----> ${'User not Found'}`);
      }
    }
  }
}
