import {
  Injectable,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateRoomInput } from './dto/create-room.input';
import { UpdateRoomInput } from './dto/update-room.input';
import { RoomsRepository } from './rooms.repository';

@Injectable()
export class RoomsService {
  constructor(private readonly roomRepo: RoomsRepository) {}
  async createRoom(createRoomInput: CreateRoomInput) {
    return this.roomRepo.createRecord(createRoomInput);
  }

  async getAllRooms() {
    return await this.roomRepo.findAll();
  }

  async getRoomById(id: string) {
    const roomData = await this.roomRepo.findOne({
      where: { id: id },
      relations: ['users', 'messages'],
    });
    if (!roomData) {
      Logger.error(`Message ----> ${'Room not Found'}`);
      throw new NotFoundException('Room not Found');
    }
    return roomData;
  }

  async updateRoom(id: string, updateRoomInput: UpdateRoomInput) {
    const room = await this.getRoomById(id);
    if (!room) throw new NotFoundException('Room not Found');
    try {
      await this.roomRepo.updateByObj(room, {
        ...updateRoomInput,
      });
    } catch (e) {
      throw new Error(e);
    }
    const updatedRoom = await this.getRoomById(room?.id);
    return updatedRoom;
  }

  async removeRoom(id: string) {
    const roomData = await this.roomRepo.findById(id);
    if (!roomData?.id) {
      Logger.error(`Message ----> ${'Room not Found'}`);
      throw new NotFoundException('Room not Found');
    }
    const deleteRoom = await this.roomRepo.delete(id);
    if (!deleteRoom.affected) {
      Logger.error(`Message ----> ${'UNABLE TO DELETE ROOM'}`);
      throw new UnprocessableEntityException('UNABLE TO DELETE ROOM');
    }
    return 'deleted successfully';
  }
}
