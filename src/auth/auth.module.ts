import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UsersModule } from 'src/modules/users/users.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  providers: [JwtStrategy, JwtAuthGuard],
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), UsersModule],
  exports: [JwtStrategy],
})
export class AuthModule {}
