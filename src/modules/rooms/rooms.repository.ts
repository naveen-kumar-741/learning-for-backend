import { DataSource, EntityManager, IsNull } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/modules/common/base.repository';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomsRepository extends BaseRepository<Room> {
  constructor(
    private dataSource: DataSource,
    private entityManager: EntityManager,
  ) {
    super(Room, dataSource.createEntityManager());
  }
  async checkRoomAlreadyExist(
    senderId: string,
    recipientId: string,
  ): Promise<Room[]> {
    const roomData = await this.createQueryBuilder('room')
      .where({ roomName: IsNull() })
      .leftJoinAndSelect(
        'room.users',
        'users',
        'users.id = :senderId or users.id = :recipientId',
        { recipientId, senderId },
      )
      .getMany();
    return roomData;
  }
}
