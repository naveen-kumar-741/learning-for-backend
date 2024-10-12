import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/currentuser.decorator';
import { GetAllUsersResponse } from './dto/user-response.output';
import { GetPaginationInput } from '../common/pagination.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.createUser(createUserInput);
  }

  @Query(() => User, {
    description: 'This API is used to get the details of the individual user',
  })
  @UseGuards(JwtAuthGuard)
  getCurrentUserData(@CurrentUser() user: User): User {
    return user;
  }

  @Query(() => GetAllUsersResponse, { name: 'getAllUser' })
  async getAllUsers(
    @Args('pagination') pagination: GetPaginationInput,
  ): Promise<GetAllUsersResponse> {
    return this.usersService.getAllUsers(
      pagination?.searchParam,
      pagination?.pageNo,
      pagination?.perPage,
    );
  }

  @Query(() => User, {
    description:
      'This API is used to get the details of the individual users by thir ID',
  })
  async getUserById(
    @Args('userId', { description: 'Id of the user to get the details' })
    userId: string,
  ): Promise<User> {
    return this.usersService.getUserById(userId);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.updateUser(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => String)
  removeUser(@Args('id', { type: () => String }) id: string) {
    return this.usersService.removeUser(id);
  }
}
