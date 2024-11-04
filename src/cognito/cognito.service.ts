import * as AWS from 'aws-sdk';

import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CognitoService {
  private cognitoIdentity: AWS.CognitoIdentityServiceProvider;

  constructor(private configService: ConfigService) {
    const region = this.configService.get<string>('AWS_REGION');
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>(
      'AWS_SECRET_ACCESS_KEY',
    );
    const poolId = this.configService.get<string>('AWS_POOL_ID');

    AWS.config.update({
      accessKeyId,
      secretAccessKey,
      region,
    });

    this.cognitoIdentity = new AWS.CognitoIdentityServiceProvider({
      region,
    });
  }

  public async adminConfirmSignUp(emailId: string) {
    const poolId = this.configService.get<string>('AWS_POOL_ID');
    const params = {
      UserPoolId: poolId,
      Username: emailId,
    };
    try {
      await this.cognitoIdentity.adminConfirmSignUp(params).promise();
    } catch (err) {
      Logger.error(
        `CognitoService --> adminConfirmSignUp ----- ${err.message}`,
        err,
      );
    }
  }
}
