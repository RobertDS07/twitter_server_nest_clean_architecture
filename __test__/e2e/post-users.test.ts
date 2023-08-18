import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';

describe('POST /users (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Should create user and return your data (201)', async () => {
    const body = {
      username: 'R',
      email: 'robert@gmail.com',
      password: '12345678',
    };

    const res = await request(app.getHttpServer()).post('/users').send(body);

    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.email).toBe(body.email);
    expect(res.body.username).toBe(body.username);
    expect(res.body.password).toBeUndefined();
  });

  it('Should return generic error when is not possible to create a user (400)', async () => {
    const body = {
      username: 'R',
      email: 'robert',
      password: '12345678',
    };

    const res = await request(app.getHttpServer()).post('/users').send(body);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Error creating a user');
  });
});
