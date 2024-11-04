import { Module } from '@nestjs/common';
import { CognitoService } from './cognito.service';
import { MyLogger } from 'src/logger/logger.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [CognitoService, MyLogger],
  exports: [CognitoService],
})
export class CognitoModule {}
