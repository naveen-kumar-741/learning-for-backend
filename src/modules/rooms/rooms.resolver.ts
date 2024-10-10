import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RoomsService } from './rooms.service';
import { Room } from './entities/room.entity';
import { CreateRoomInput } from './dto/create-room.input';
import { UpdateRoomInput } from './dto/update-room.input';

@Resolver(() => Room)
export class RoomsResolver {
  constructor(private readonly roomsService: RoomsService) {}

  @Mutation(() => Room)
  createRoom(@Args('createRoomInput') createRoomInput: CreateRoomInput) {
    return this.roomsService.createRoom(createRoomInput);
  }

  @Query(() => [Room], { name: 'getAllRooms' })
  getAllRooms() {
    return this.roomsService.getAllRooms();
  }

  @Query(() => Room, { name: 'getRoomById' })
  getRoomById(@Args('id', { type: () => String }) id: string) {
    return this.roomsService.getRoomById(id);
  }

  @Mutation(() => Room)
  updateRoom(@Args('updateRoomInput') updateRoomInput: UpdateRoomInput) {
    return this.roomsService.updateRoom(updateRoomInput.id, updateRoomInput);
  }

  @Mutation(() => String)
  removeRoom(@Args('id', { type: () => String }) id: string) {
    return this.roomsService.removeRoom(id);
  }
}
