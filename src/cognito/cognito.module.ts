import { Module } from '@nestjs/common';
import { CognitoService } from './cognito.service';
import { MyLogger } from 'src/logger/logger.service';

@Module({
  providers: [CognitoService, MyLogger],
  exports: [CognitoService],
})
export class CognitoModule {}
