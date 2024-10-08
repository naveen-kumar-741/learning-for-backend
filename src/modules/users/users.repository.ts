import { DataSource, EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../common/base.repository';
import { User } from './entities/user.entity';

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
      .orWhere('LOWER(user.emailId) = :emailId', { emailId: cognitoUserName })
      .getOne();
  }
}
