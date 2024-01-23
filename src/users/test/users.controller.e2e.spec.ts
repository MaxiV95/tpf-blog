import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { User } from '../user.schema';

const user1: any = {
  email: 'test1@example.com',
  password: 'password1123',
  nickName: 'testUser1',
  img: 'avatar.jpg',
  admin: true,
};
let id1: string;
let authToken1: string;

const user2: any = {
  email: 'test2@example.com',
  password: 'password2123',
  nickName: 'testUser2',
  img: 'avatar.jpg',
  admin: true,
};

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

  it('(POST) /users - Create a new user', async () => {
    const response = await request(app.getHttpServer())
      .post('/users')
      .send(user1)
      .expect(201);
    expect(response.body).toHaveProperty('id');
    expect(typeof response.body.id).toBe('string');
    id1 = response.body.id;
    expect(response.body).toEqual(
      expect.objectContaining({
        email: user1.email,
        nickName: user1.nickName,
        img: user1.img,
        admin: false,
      }),
    );
    //---------------
    expect(await userModel.findOne({ email: user1.email })).toBeDefined();
    //---------------
    const response2 = await request(app.getHttpServer())
      .post('/users')
      .send(user1)
      .expect(409);
    expect(response2.body).toHaveProperty(
      'message',
      `E11000 duplicate key error collection: blogTest.users index: email_1 dup key: { email: "${user1.email}" }`,
    );
    expect(response2.body).toHaveProperty('name', 'MongoServerError');
    //---------------
    const response3 = await request(app.getHttpServer())
      .post('/users')
      .send(user2)
      .expect(201);
    expect(response3.body).toHaveProperty('id');
    expect(typeof response3.body.id).toBe('string');
    user2.id = response3.body.id;
    expect(await userModel.findOne({ email: user2.email })).toBeDefined();
  });

  it('(POST) /users/login - Obtain JWT when logging in with correct credentials', async () => {
    // Función auxiliar para realizar solicitudes de inicio de sesión y realizar afirmaciones
    const assertLogin = async (user: object, expectedStatusCode: number) =>
      await request(app.getHttpServer())
        .post('/users/login')
        .send(user)
        .expect(expectedStatusCode);
    // Caso de prueba: password incorrecto
    const response = await assertLogin(
      { email: user1.email, password: 'incorrectPassword' },
      401,
    );
    expect(response.body).toHaveProperty(
      'message',
      'Incorrect email or password',
    );
    // Caso de prueba: Email incorrecto
    const response2 = await assertLogin(
      { email: 'incorrect@example.com', password: user1.password },
      401,
    );
    expect(response2.body).toHaveProperty(
      'message',
      'Incorrect email or password',
    );
    // Caso de prueba: Credenciales correctas
    const response3 = await assertLogin(
      { email: user1.email, password: user1.password },
      201,
    );
    expect(response3.body).toHaveProperty('access_token');
    expect(typeof response3.body.access_token).toBe('string');
    authToken1 = response3.body.access_token;
  });

  it('(GET)  /users/:id - Get user by ID', async () => {
    // Caso de prueba: sin enviar authToken
    const response = await request(app.getHttpServer())
      .get(`/users/${id1}`)
      .expect(401);
    expect(response.body).toHaveProperty('message', 'Unauthorized');
    // Caso de prueba: enviando authToken
    const response2 = await request(app.getHttpServer())
      .get(`/users/${id1}`)
      .set('Authorization', `Bearer ${authToken1}`)
      .expect(200);
    expect(response2.body).toEqual(
      expect.objectContaining({
        email: user1.email,
        nickName: user1.nickName,
        img: user1.img,
        admin: false,
      }),
    );
  });

  it('(GET)  /users - Return all users for admin', async () => {
    // Caso de prueba: sin enviar authToken
    const response = await request(app.getHttpServer())
      .get('/users')
      .expect(401);
    expect(response.body).toHaveProperty('message', 'Unauthorized');
    // Caso de prueba: enviando authToken sin ser admin
    const response2 = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${authToken1}`)
      .expect(401);
    expect(response2.body).toHaveProperty(
      'message',
      'Unauthorized admin access',
    );
    // Caso de prueba: enviando authToken siendo admin
    await userModel.updateOne({ _id: id1 }, { $set: { admin: true } });
    const response3 = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${authToken1}`)
      .expect(200);
    expect(response3.body).toBeInstanceOf(Array);
    const firstUser = response3.body[0];
    expect(firstUser).toHaveProperty('id');
    expect(firstUser).toHaveProperty('email');
    expect(firstUser).toHaveProperty('nickName');
    expect(firstUser).toHaveProperty('img');
    expect(firstUser).toHaveProperty('admin');
  });

  afterAll(async () => {
    await userModel.deleteMany({});
    await app.close();
  });
});
