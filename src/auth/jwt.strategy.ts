import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from 'jsonwebtoken';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../modules/users/entities/user.entity';
import { UsersService } from 'src/modules/users/users.service';
import {
  ACCESS_TOKEN_EXPIRED,
  INVALID_TOKEN,
} from '../utils/constants/error-constants';
import { config } from 'src/config/config';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 10,
        jwksUri: `${config.authority}/.well-known/jwks.json`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      issuer: config.authority,
      algorithms: ['RS256'],
      ignoreExpiration: true,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    //payload is whatever we passed in token (roles, claims)
    //add it to context, return user object, will be set in the context
    let isExpiredToken = false;
    const seconds = 1000;
    const date = new Date();
    const time = date.getTime();
    if (payload.exp < Math.round(time / seconds)) {
      isExpiredToken = true;
    }
    if (isExpiredToken) {
      throw new UnauthorizedException(ACCESS_TOKEN_EXPIRED);
    }

    const user: User = await this.userService.validateUser(payload);
    if (!user) {
      throw new UnauthorizedException(INVALID_TOKEN);
    }
    return user; //user will be added to context. This name should be same in decorator. Can be accessed from request
  }
}
