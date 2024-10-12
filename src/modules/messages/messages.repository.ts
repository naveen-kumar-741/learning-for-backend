import { DataSource, EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/modules/common/base.repository';
import { Message } from './entities/message.entity';
import { GetAllMessagesResponse } from './dto/message-response.output';

@Injectable()
export class MessagesRepository extends BaseRepository<Message> {
  constructor(
    private dataSource: DataSource,
    private entityManager: EntityManager,
  ) {
    super(Message, dataSource.createEntityManager());
  }

  async getAllMessagesByRoomId(
    roomId: string,
    searchParam,
    pageNo,
    perPage,
  ): Promise<GetAllMessagesResponse> {
    let query = this.createQueryBuilder('message')
      .leftJoinAndSelect('message.user', 'user')
      .leftJoinAndSelect('message.room', 'room', 'room.id = :roomId', {
        roomId,
      });

    if (searchParam) {
      query = query.where(
        'user.emailId iLike :searchInput or user.userName iLike :searchInput',
        {
          searchInput: `%${searchParam}%`,
        },
      );
    }
    const [messages, totalCount] = await query
      .skip((pageNo - 1) * perPage)
      .take(perPage)
      .getManyAndCount();

    return { messages, totalCount };
  }
}
