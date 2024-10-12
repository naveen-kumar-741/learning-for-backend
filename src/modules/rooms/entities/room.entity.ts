import { Field, ObjectType } from '@nestjs/graphql';
import { Message } from 'src/modules/messages/entities/message.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'rooms' })
@ObjectType()
export class Room extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid', { name: 'room_id' })
  id: string;

  @Field({ nullable: true })
  @Column({ nullable: true, name: 'room_name', unique: true })
  roomName: string;

  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.rooms, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'user_room_mappings',
    joinColumn: {
      name: 'room_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  users: User[];

  @Field(() => [Message], { nullable: true })
  @OneToMany(() => Message, (message) => message.room, {
    cascade: true,
    eager: true,
  })
  messages: Message[];

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
