import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsResolver } from './rooms.resolver';
import { RoomsRepository } from './rooms.repository';

@Module({
  providers: [RoomsResolver, RoomsService, RoomsRepository],
})
export class RoomsModule {}
