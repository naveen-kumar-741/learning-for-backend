import { DataSource, EntityManager } from 'typeorm';
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
}
