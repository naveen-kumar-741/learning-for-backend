import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesResolver } from './messages.resolver';
import { MessagesRepository } from './messages.repository';

@Module({
  providers: [MessagesResolver, MessagesService, MessagesRepository],
  exports: [MessagesService, MessagesResolver],
})
export class MessagesModule {}
