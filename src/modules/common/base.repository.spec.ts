/* eslint-disable prettier/prettier */
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import {
  TypeOrmModule,
  getRepositoryToken,
} from '@nestjs/typeorm';
import {
  Repository,
} from 'typeorm';
import { BaseRepository } from './base.repository';
import { DatabaseModule } from '../../database/database.module';
import dbConfig from '../../database/db.config';
import { TransactionalTestContext } from 'typeorm-transactional-tests';
import { User } from '../users/entities/user.entity';
import { UserRepository } from '../users/user.repository';
import { faker } from '@faker-js/faker';
import { DELETE_SUCCESS } from '../../utils/constants/constant';
import { SignUpMethod } from './common.enum';
import { Game } from '../platform/game-admin/entities/game.entity';
import { NftCollection } from '../platform/nft-collection/entities/nft-collection.entity';
import { Nftcollectable } from '../platform/nftcollectable/entities/nftcollectable.entity';
import { NftClass } from '../platform/nft-class/entities/nft-class.entity';
import { NftClassVersion } from '../platform/nft-class/entities/nft-class-version.entity';
import { GameClassMapping } from '../platform/nft-class/entities/game-class-mapping.entity';
import { RenderImage } from '../platform/render-image/entities/render-image.entity';
import { NftCollectionModule } from '../platform/nft-collection/nft-collection.module';
import { MetaGameCollectableMapping } from '../platform/nftcollectable/entities/meta-game-collectable-mapping.entity';
import { XsollaPaymentsApi } from 'src/services/payments/xsolla-payment.service';
import { SubscriptionPlanRepository } from '../platform/subscription/subscription-plan/subscription-plan.repository';

const user = new User();
user.firstName = 'Sam';
user.lastName = 'Billings';
user.userName = faker.datatype.uuid();
user.emailId = faker.internet.email();
user.cognitoUserName = faker.datatype.uuid();
user.profileUrl = faker.internet.url();
user.handle = faker.datatype.string();
user.initialRegistration = faker.datatype.datetime();
user.twoFactorAuthEnabled = true;
user.ipAddress = faker.internet.ip();
user.createdBy = faker.datatype.string();
user.createdAt = new Date();
user.lastModifiedAt = new Date();
user.signUpSource = SignUpMethod.EMAIL;
user.termsAndConditions = faker.datatype.boolean();


const updateUser = new User();
updateUser.firstName = 'Sam';
updateUser.lastName = 'Billings';
updateUser.userName = faker.datatype.uuid();
updateUser.emailId = faker.internet.email();
updateUser.cognitoUserName = faker.datatype.uuid();
updateUser.profileUrl = faker.internet.url();
updateUser.handle = faker.datatype.string();
updateUser.initialRegistration = faker.datatype.datetime();
updateUser.twoFactorAuthEnabled = false;
updateUser.ipAddress = faker.internet.ip();
updateUser.createdBy = faker.datatype.string();
updateUser.createdAt = new Date();
updateUser.lastModifiedAt = new Date();
updateUser.signUpSource = SignUpMethod.EMAIL;
updateUser.termsAndConditions = faker.datatype.boolean();


describe('BaseRepository', () => {
  let module: TestingModule;
  let provider: BaseRepository<User>;
  let entity: Repository<User>;
  let transactionalContext: TransactionalTestContext;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [dbConfig],
        }),
        DatabaseModule,
        TypeOrmModule.forFeature([User,Game, NftCollection, Nftcollectable,NftClass,NftClassVersion,GameClassMapping,RenderImage,NftCollectionModule,MetaGameCollectableMapping]),
      ],
      providers: [UserRepository,{
        provide:XsollaPaymentsApi,
        useValue:{}
      },
      SubscriptionPlanRepository
    ],
    }).compile();

    entity = module.get(getRepositoryToken(User));
    provider = module.get<UserRepository>(UserRepository);
    transactionalContext = new TransactionalTestContext(
      entity.manager.connection,
    );
  },500000);
  beforeEach(async () => {
    await transactionalContext.start();
  });
  afterEach(async () => {
    await transactionalContext.finish();
  });
  afterAll(async () => {
    await entity.manager.connection.destroy();
  });
  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  describe('', () => {
    it('should return all the Users by condition', async () => {
      const userData = await entity.save(user);
      const result = await provider.findByCond({ id: userData.id });
      expect(result).toHaveLength(1);
    });

    it('should return all the users', async () => {
      await entity.save(user);
      const result = await provider.findAll({});
      // expect(result).toHaveLength(1);
    });

    it('should save Record', async () => {
      await entity.save(user);
      const result = await provider.saveRecord(user);
      expect(result.firstName).toEqual(user.firstName);
    });

    it('should create Record', async () => {
      const result = await provider.createRecord(user);
      expect(result.lastName).toEqual(user.lastName);
    });

    it('should update Record', async () => {
      await entity.save(user);
      const result = await provider.updateRecord(updateUser);
      expect(result.lastName).toEqual('Billings');
    });

    it('should return user by Id', async () => {
      await entity.save(user);
      const result = await provider.findById(user.id);
      expect(result.userName).toEqual(user.userName);
    });

    // it('should find a user by condition', async () => {
    //   await entity.save(user);
    //   const result = await provider.findOneByCondRel({emailId:user.emailId},[""]);
    //   expect(result.userName).toEqual(user.userName);
    // });

    // it('should find a user with relation', async () => {
    //   await entity.save(user);
    //   const result = await provider.findByIdWithRel({id:user.id},[""]);
    //   expect(result.userName).toEqual(user.userName);
    // });

    it('should delete Record', async () => {
      await entity.save(user);
      const result = await provider.deleteRec(user, user.id);
      expect(result).toEqual(DELETE_SUCCESS);
    });

    it('should update User', async () => {
      await entity.save(user);
      const result = await provider.updateByObj(user.userName, updateUser);
      expect(result.lastName).toEqual('Billings');
    });

    it('should update user by condition', async () => {
      await entity.save(user);
      const result = await provider.updateByCond(user.userName, updateUser);
    });

    it('should return users by order', async () => {
      await entity.save(user);
      const result = await provider.findByCondOrder(
        { firstName: user.firstName },
        'firstName',
        'ASC',
      );
      expect(result).toHaveLength(1);
    });

    // it('should return users with relation', async () => {
    //   await entity.save(user);
    //   const result = await provider.findByCondRel({emailId : user.emailId}, ['organization']);
    //   expect(result).toHaveLength(1);
    // });

    it('should return users by pagination', async () => {
      const users = await entity.save(user);
      const result = await provider.findByPagination({ id: user.id }, 2, 2);
      expect(result).toHaveLength(0);
    });
  });
});
