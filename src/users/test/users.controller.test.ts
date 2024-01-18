// users.controller.test.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { User } from '../user.schema';
import userTestModel from './user.test.model';
import { UserCreateDto, UserDB } from '../user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: userTestModel,
        },
      ],
    }).compile();

    controller = moduleRef.get<UsersController>(UsersController);
    service = moduleRef.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new user', async () => {
    // Datos simulados para la creación de usuarios.
    const UserDB: UserDB= {
      id: '6570bb7db2ad523394706c12',
      email: 'test@example.com',
      nickName: 'testUser',
      img: 'avatar.jpg',
      admin: false,
    };
    const UserCreateDto: UserCreateDto = {
      email: 'test@example.com',
      password: 'password123',
      nickName: 'testUser',
      img: 'avatar.jpg',
      admin: true,
    };

    // Simule el método de servicio para devolver un resultado predefinido
    jest
      .spyOn(service, 'registerUser')
      .mockImplementation(async () => UserDB);

    // Llamar al método del controlador
    const result = await controller.register(UserCreateDto);

    // Afirmaciones
    expect(result).toEqual(UserDB);
  });
});
