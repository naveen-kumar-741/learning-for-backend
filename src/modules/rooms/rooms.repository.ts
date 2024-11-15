import { DataSource, EntityManager, IsNull, Not } from 'typeorm';
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
      .innerJoin('room.users', 'user1', 'user1.id = :senderId', { senderId })
      .innerJoin('room.users', 'user2', 'user2.id = :recipientId', {
        recipientId,
      })
      .where({ roomName: IsNull() })
      .leftJoinAndSelect('room.users', 'users') // Select all users in the room
      .getMany();

    return roomData;
  }
  async getOneOnOneRoomsByUser(id: string) {
    // it won't return the recipient details
    // const roomData = await this.createQueryBuilder('room')
    //   .leftJoinAndSelect('room.users', 'users')
    //   .where({ roomName: IsNull() })
    //   .andWhere('users.id = :id', { id })
    //   .getMany();

    const subQuery = this.createQueryBuilder('subRoom')
      .select('subRoom.id')
      .leftJoin('subRoom.users', 'subUser')
      .where('subUser.id = :id', { id })
      .getQuery();

    const roomData = await this.createQueryBuilder('room')
      .leftJoinAndSelect('room.users', 'users')
      .where('room.roomName IS NULL')
      .andWhere('room.id IN (' + subQuery + ')')
      .setParameter('id', id)
      .getMany();

    return roomData;
  }

  async getGroupsByUser(
    id: string,
    searchParam: string,
    pageNo: number,
    perPage: number,
  ) {
    let query = await this.createQueryBuilder('room')
      .where({ roomName: Not(IsNull()) })
      .leftJoinAndSelect('room.users', 'users', 'users.id = :id', { id });

    if (searchParam) {
      query = query.where('room.roomName iLike :searchInput', {
        searchInput: `%${searchParam}%`,
      });
    }

    const [rooms, totalCount] = await query
      .skip((pageNo - 1) * perPage)
      .take(perPage)
      .getManyAndCount();

    return {
      rooms,
      totalCount,
    };
  }
}
