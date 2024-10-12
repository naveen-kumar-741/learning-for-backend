import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesResolver } from './messages.resolver';
import { MessagesRepository } from './messages.repository';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';

@Module({
  providers: [MessagesService, MessagesResolver, MessagesRepository],
  exports: [MessagesService],
})
export class MessagesModule {}
