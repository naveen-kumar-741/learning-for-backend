import {
  Injectable,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserRepository } from './users.repository';
import { UserTypesEnum } from '../common/common.enum';
import {
  UNABLE_DELETE_USER,
  USER_NOT_EXIST,
} from 'src/utils/constants/error-constants';
import { DELETE_SUCCESS } from 'src/utils/constants/constant';
import { CognitoService } from 'src/cognito/cognito.service';
import { JwtPayload } from 'jsonwebtoken';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly cognitoService: CognitoService,
  ) {}
  async createUser(createUserInput: CreateUserInput) {
    createUserInput.userRoles = [{ userType: UserTypesEnum.USER }];
    try {
      await this.cognitoService.adminConfirmSignUp(createUserInput.emailId);
      return this.userRepo.createRecord(createUserInput);
    } catch (e) {
      throw new Error(e);
    }
  }

  async getUserByCognitoUserName(cognitoUserName: string) {
    const userData =
      await this.userRepo.getUserByCognitoUserName(cognitoUserName);
    if (!userData) {
      Logger.error(`Message ----> ${USER_NOT_EXIST}`);
      throw new NotFoundException(USER_NOT_EXIST);
    }
    return userData;
  }

  async getAllUser() {
    return await this.userRepo.findAll();
  }

  async getUserById(id: string) {
    const userData = await this.userRepo.findOne({
      where: { id: id },
    });
    if (!userData) {
      Logger.error(`Message ----> ${USER_NOT_EXIST}`);
      throw new NotFoundException(USER_NOT_EXIST);
    }
    return userData;
  }

  async updateUser(id: string, updateUserInput: UpdateUserInput) {
    const user = await this.getUserById(id);
    if (!user) throw new NotFoundException(USER_NOT_EXIST);
    try {
      await this.userRepo.updateByObj(user, {
        ...updateUserInput,
      });
    } catch (e) {
      throw new Error(e);
    }
    const updatedUser = await this.getUserById(user?.id);
    return updatedUser;
  }

  async removeUser(id: string) {
    const userData = await this.userRepo.findById(id);
    if (!userData?.id) {
      Logger.error(`Message ----> ${USER_NOT_EXIST}`);
      throw new NotFoundException(USER_NOT_EXIST);
    }
    const deleteUser = await this.userRepo.delete(id);
    if (!deleteUser.affected) {
      Logger.error(`Message ----> ${UNABLE_DELETE_USER}`);
      throw new UnprocessableEntityException(UNABLE_DELETE_USER);
    }
    return DELETE_SUCCESS;
  }

  public async validateUser(payload: any): Promise<User | undefined> {
    if (payload) {
      return this.getUserByCognitoUserName(payload?.username);
    }
  }
}
