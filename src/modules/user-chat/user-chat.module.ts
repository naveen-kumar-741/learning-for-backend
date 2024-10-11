import { Module } from '@nestjs/common';
import { UserChatService } from './user-chat.service';
import { UserChatGateway } from './user-chat.gateway';
import { MessagesService } from '../messages/messages.service';
import { UsersService } from '../users/users.service';
import { MessagesRepository } from '../messages/messages.repository';
import { UserRepository } from '../users/users.repository';
import { CognitoService } from 'src/cognito/cognito.service';
import { UsersModule } from '../users/users.module';
import { MyLogger } from 'src/logger/logger.service';

@Module({
  imports: [UsersModule],
  providers: [
    UserChatGateway,
    UserChatService,
    MessagesService,
    MessagesRepository,
    MyLogger,
  ],
})
export class UserChatModule {}
