import {
  Injectable,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';
import { MessagesRepository } from './messages.repository';

@Injectable()
export class MessagesService {
  constructor(private readonly messageRepo: MessagesRepository) {}
  async createMessage(createMessageInput: CreateMessageInput) {
    return this.messageRepo.createRecord(createMessageInput);
  }

  async getAllMessages() {
    return await this.messageRepo.findAll();
  }

  async getMessageById(id: string) {
    const messageData = await this.messageRepo.findOne({
      where: { id: id },
      relations: ['users', 'messages'],
    });
    if (!messageData) {
      Logger.error(`Message ----> ${'Message not Found'}`);
      throw new NotFoundException('Message not Found');
    }
    return messageData;
  }

  async updateMessage(id: string, updateMessageInput: UpdateMessageInput) {
    const message = await this.getMessageById(id);
    if (!message) throw new NotFoundException('Message not Found');
    try {
      await this.messageRepo.updateByObj(message, {
        ...updateMessageInput,
      });
    } catch (e) {
      throw new Error(e);
    }
    const updatedMessage = await this.getMessageById(message?.id);
    return updatedMessage;
  }

  async removeMessage(id: string) {
    const messageData = await this.messageRepo.findById(id);
    if (!messageData?.id) {
      Logger.error(`Message ----> ${'Message not Found'}`);
      throw new NotFoundException('Message not Found');
    }
    const deleteMessage = await this.messageRepo.delete(id);
    if (!deleteMessage.affected) {
      Logger.error(`Message ----> ${'UNABLE TO DELETE ROOM'}`);
      throw new UnprocessableEntityException('UNABLE TO DELETE ROOM');
    }
    return 'deleted successfully';
  }
}
