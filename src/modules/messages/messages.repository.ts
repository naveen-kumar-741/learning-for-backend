import { DataSource, EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/modules/common/base.repository';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesRepository extends BaseRepository<Message> {
  constructor(
    private dataSource: DataSource,
    private entityManager: EntityManager,
  ) {
    super(Message, dataSource.createEntityManager());
  }
}
