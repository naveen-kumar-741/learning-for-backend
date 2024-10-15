import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RoomsService } from './rooms.service';
import { Room } from './entities/room.entity';
import { CreateRoomInput } from './dto/create-room.input';
import { UpdateRoomInput } from './dto/update-room.input';
import { CurrentUser } from 'src/auth/decorators/currentuser.decorator';
import { User } from '../users/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetPaginationInput } from '../common/pagination.input';
import { GetAllGroupsResponse } from './dto/room-response.output';

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

  @Query(() => [Room], { name: 'getAllOneOnOneRooms' })
  @UseGuards(JwtAuthGuard)
  getAllOneOnOneRooms(@CurrentUser() user: User) {
    return this.roomsService.getAllOneOnOneRooms(user);
  }

  @Query(() => GetAllGroupsResponse, { name: 'getAllGroups' })
  @UseGuards(JwtAuthGuard)
  async getAllGroups(
    @CurrentUser() user: User,
    @Args('pagination') pagination: GetPaginationInput,
  ): Promise<GetAllGroupsResponse> {
    let roomsData = await this.roomsService.getAllGroups(
      user,
      pagination?.searchParam,
      pagination?.pageNo,
      pagination?.perPage,
    );
    return roomsData;
  }

  @Query(() => [Room], {
    description: 'Check room is already exist for one on one chat',
  })
  async checkRoomAlreadyExist(
    @Args('senderId') senderId: string,
    @Args('recipientId') recipientId: string,
  ): Promise<Room[]> {
    return this.roomsService.checkRoomAlreadyExist(senderId, recipientId);
  }

  @Query(() => Room, { name: 'getRoomById' })
  @UseGuards(JwtAuthGuard)
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
