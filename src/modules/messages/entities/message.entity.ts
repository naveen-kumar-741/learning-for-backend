import { Field, ObjectType } from '@nestjs/graphql';
import { Room } from 'src/modules/rooms/entities/room.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'messages' })
@ObjectType()
export class Message extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid', { name: 'message_id' })
  id: string;

  @Field()
  @Column({ nullable: true, name: 'message' })
  message: string;

  @Field(() => User)
  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'u_id' })
  user: User;

  @Field(() => Room)
  @ManyToOne(() => Room, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'room_id' })
  room: Room;

  @Field({ nullable: true })
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
    name: 'created_at',
  })
  createdAt: Date;
}
