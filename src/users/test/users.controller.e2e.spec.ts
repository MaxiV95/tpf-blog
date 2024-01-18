import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { User } from '../user.schema';
import { UserCreateDto } from '../user.dto';

describe('UsersController (E2E)', () => {
  let app: INestApplication;
  let userModel: Model<User>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    userModel = app.get<Model<User>>(getModelToken(User.name));
    await app.init();
  });

  beforeEach(async () => {
    await userModel.deleteMany({});
  });

  it('/users (POST) - Create a new user', async () => {
    const userCreateDto: UserCreateDto = {
      email: 'test@example.com',
      password: 'password123',
      nickName: 'testUser',
      img: 'avatar.jpg',
      admin: true,
    };
    const response = await request(app.getHttpServer())
      .post('/users')
      .send(userCreateDto)
      .expect(201);
    expect(response.body).toHaveProperty('id');
    expect(typeof response.body.id).toBe('string');
    expect(response.body).toEqual(
      expect.objectContaining({
        email: 'test@example.com',
        nickName: 'testUser',
        img: 'avatar.jpg',
        admin: false,
      }),
    );

    //-------------
    const userFromDB = await userModel.findOne({ email: 'test@example.com' });

    expect(userFromDB).toBeDefined();
    expect(userFromDB.email).toBe('test@example.com');
    //-------------

    const response2 = await request(app.getHttpServer())
      .post('/users')
      .send(userCreateDto)
      .expect(409);
    expect(response2.body).toHaveProperty(
      'message',
      'E11000 duplicate key error collection: blogTest.users index: email_1 dup key: { email: "test@example.com" }',
    );
    expect(response2.body).toHaveProperty('name', 'MongoServerError');
  });

  afterAll(async () => {
    await userModel.deleteMany({});
    await app.close();
  });
});
