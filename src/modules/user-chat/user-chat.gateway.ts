import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { UserChatService } from './user-chat.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class UserChatGateway {
  constructor(private readonly userChatService: UserChatService) {}
  @WebSocketServer() server: Server;
  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string): string {
    this.server.emit('events', data);
    return data;
  }
  @SubscribeMessage('createRoom')
  createRoom(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): string {
    client.join('aRoom');
    client.to('aRoom').emit('roomCreated', { room: 'aRoom' });
    return data;
  }
}
