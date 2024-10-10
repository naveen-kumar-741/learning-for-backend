import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from './user-role.entity';
import { Room } from 'src/modules/rooms/entities/room.entity';
import { Message } from 'src/modules/messages/entities/message.entity';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @Field({
    description:
      'Id of the created user object. This will be used for further API Calls',
  })
  @PrimaryGeneratedColumn('uuid', { name: 'u_id' })
  id: string;

  @Field({ nullable: true })
  @Column({ name: 'username', nullable: true, unique: true })
  userName?: string;

  @Field(() => ID, { nullable: true })
  @Column({ name: 'cognito_username', nullable: true })
  cognitoUserName?: string;

  @Field()
  @Column({ nullable: false, name: 'email_id', unique: true })
  emailId: string;

  @Field({ nullable: true })
  @Column({ name: 'first_name', nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  @Column({ name: 'last_name', nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  @Column({ name: 'mobile_number', nullable: true })
  mobileNumber?: number;

  @Field({ nullable: true })
  @Column({ nullable: true, name: 'profile_url' })
  profileUrl?: string;

  @Field(() => [UserRole], { nullable: true })
  @OneToMany(() => UserRole, (role) => role.user, {
    cascade: true,
    eager: true,
  })
  userRoles: UserRole[];

  @Field(() => [Message], { nullable: true })
  @OneToMany(() => Message, (message) => message.user, {
    cascade: true,
    eager: true,
  })
  messages: Message[];

  @Field(() => [Room], { nullable: true })
  @JoinColumn({ name: 'room_id' })
  @ManyToMany(() => Room, (room) => room.users)
  rooms: Room[];

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
    name: 'last_modified_at',
  })
  lastModifiedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
  })
  deletedAt?: Date;
}
