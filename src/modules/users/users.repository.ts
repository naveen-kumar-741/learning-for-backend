import { DataSource, EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../common/base.repository';
import { User } from './entities/user.entity';
import { GetAllUsersResponse } from './dto/user-response.output';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(
    private dataSource: DataSource,
    private entityManager: EntityManager,
  ) {
    super(User, dataSource.createEntityManager());
  }

  async getUserByCognitoUserName(cognitoUserName: string) {
    return this.createQueryBuilder('user')
      .where({ cognitoUserName })
      .leftJoinAndSelect('user.rooms', 'rooms')
      .orWhere('LOWER(user.emailId) = :emailId', { emailId: cognitoUserName })
      .getOne();
  }

  async getOneOnOneRoomsByUser(id: string) {
    return this.createQueryBuilder('user')
      .where({ id })
      .leftJoinAndSelect('user.rooms', 'rooms', 'rooms.roomName is  null')
      .leftJoinAndSelect('rooms.users', 'room_users')
      .getOne();
  }

  async getGroupsByUser(id: string) {
    return this.createQueryBuilder('user')
      .where({ id })
      .leftJoinAndSelect('user.rooms', 'rooms', 'rooms.roomName is not null')
      .leftJoinAndSelect('rooms.users', 'room_users')
      .getOne();
  }

  async getAllUsers(
    searchParam,
    pageNo,
    perPage,
  ): Promise<GetAllUsersResponse> {
    let query = await this.createQueryBuilder('user').leftJoinAndSelect(
      'user.userRoles',
      'roles',
    );
    if (searchParam) {
      query = query.where(
        'user.emailId iLike :searchInput or user.userName iLike :searchInput',
        {
          searchInput: `%${searchParam}%`,
        },
      );
    }
    const [users, totalCount] = await query
      .skip((pageNo - 1) * perPage)
      .take(perPage)
      .getManyAndCount();
    return {
      users,
      totalCount,
    };
  }
}
