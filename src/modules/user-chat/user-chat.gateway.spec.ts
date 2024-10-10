import { Test, TestingModule } from '@nestjs/testing';
import { UserChatGateway } from './user-chat.gateway';
import { UserChatService } from './user-chat.service';

describe('UserChatGateway', () => {
  let gateway: UserChatGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserChatGateway, UserChatService],
    }).compile();

    gateway = module.get<UserChatGateway>(UserChatGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
