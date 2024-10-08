import * as AWS from 'aws-sdk';

import { Logger } from '@nestjs/common';
import { config } from 'src/config/config';

export class CognitoService {
  //   public static storeVal: StoreVal;

  public static cognitoIdentity = new AWS.CognitoIdentityServiceProvider({
    region: config.region,
  });

  public constructor() {
    AWS.config.update({
      region: config.region,
    });
  }

  public async adminConfirmSignUp(emailId: string) {
    const params = {
      UserPoolId: config.poolId,
      Username: emailId,
    };
    try {
      await CognitoService.cognitoIdentity.adminConfirmSignUp(params).promise();
    } catch (err) {
      Logger.error(
        `CognitoService --> adminConfirmSignUp ----- ${err.message}`,
        err,
      );
    }
  }
}
