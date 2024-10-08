import { Global, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './users.repository';
import { CognitoModule } from 'src/cognito/cognito.module';
import { CognitoService } from 'src/cognito/cognito.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User]), CognitoModule],
  providers: [UsersResolver, UsersService, UserRepository, CognitoService],
  exports: [UsersService, UsersResolver],
})
export class UsersModule {}
