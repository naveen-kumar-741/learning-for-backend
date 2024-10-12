import { Module } from '@nestjs/common';
import { UserChatService } from './user-chat.service';
import { UserChatGateway } from './user-chat.gateway';
import { UsersModule } from '../users/users.module';
import { MyLogger } from 'src/logger/logger.service';
import { MessagesModule } from '../messages/messages.module';

@Module({
  imports: [UsersModule, MessagesModule],
  providers: [UserChatGateway, UserChatService, MyLogger],
})
export class UserChatModule {}
