import { registerEnumType } from '@nestjs/graphql';

export enum UserTypesEnum {
  USER = 'User',
  SUPER_ADMIN = 'Super Admin',
  ADMIN = 'Admin',
}
registerEnumType(UserTypesEnum, {
  name: 'UserTypesEnum',
});
