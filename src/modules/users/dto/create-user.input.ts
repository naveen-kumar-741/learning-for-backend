import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { UserTypesEnum } from 'src/modules/common/common.enum';

interface UserRole {
  userType: UserTypesEnum;
}

@InputType()
export class CreateUserInput {
  @Field({
    nullable: true,
    description: 'The unique username for the registering user.',
  })
  userName?: string;
  @Field(() => ID, {
    nullable: true,
    description:
      'We are using cognito for Authentication. Once the user is registered from the frontend application, we need to provide the cognito username to our backend API',
  })
  cognitoUserName?: string;

  @Field({ description: 'The emailId of the registering user' })
  emailId: string;

  @Field({
    nullable: true,
    description:
      "The password of the user who is trying to register. This field will be used only for the developer's user creation",
  })
  password?: string;

  @Field({ nullable: true, description: 'Give the first name of the user' })
  firstName?: string;

  @Field({ nullable: true, description: 'Give the last name of the user' })
  lastName?: string;

  @Field({
    nullable: true,
    description:
      'When the user registering, the user can upload their profile images. From the frontend we need to upload the file to S3 and give the file path as an input to this field',
  })
  profileUrl?: string;

  userRoles?: UserRole[];
}
