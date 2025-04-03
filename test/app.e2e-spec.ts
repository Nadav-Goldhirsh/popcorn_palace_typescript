// test/app.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Extended Validations and Negative Cases (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        forbidUnknownValues: true,
      }),
    );

    await app.init();
  });

  let movieId: number;
  let showtimeId: number;

  describe('Movies', () => {
    it('should fail to create movie with missing fields', async () => {
      await request(app.getHttpServer()).post('/movies').send({}).expect(400);
    });

    it('should fail to create movie with negative duration', async () => {
      await request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Invalid Movie',
          genre: 'Drama',
          duration: -90,
          rating: 8.5,
          releaseYear: 2020,
        })
        .expect(400);
    });

    it('should create a valid movie for further tests', async () => {
      const response = await request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Valid Movie',
          genre: 'Action',
          duration: 120,
          rating: 7.5,
          releaseYear: 2022,
        })
        .expect(201);

      movieId = response.body.id;
    });

    it('should fail to update a non-existent movie', async () => {
      await request(app.getHttpServer())
        .patch('/movies/update/NonExistentMovie')
        .send({ genre: 'Horror' })
        .expect(404);
    });
  });

  describe('Showtimes', () => {
    it('should fail to create showtime with invalid times (end before start)', async () => {
      await request(app.getHttpServer())
        .post('/showtimes')
        .send({
          theater: 'Theater 1',
          startTime: '2025-04-02T18:00:00.000Z',
          endTime: '2025-04-02T17:00:00.000Z',
          price: 25,
          movieId,
        })
        .expect(400);
    });

    it('should fail to create showtime without theater', async () => {
      await request(app.getHttpServer())
        .post('/showtimes')
        .send({
          startTime: '2025-04-02T18:00:00.000Z',
          endTime: '2025-04-02T20:00:00.000Z',
          price: 25,
          movieId,
        })
        .expect(400);
    });

    it('should create a valid showtime', async () => {
      const response = await request(app.getHttpServer())
        .post('/showtimes')
        .send({
          theater: 'Theater 2',
          startTime: '2025-04-02T18:00:00.000Z',
          endTime: '2025-04-02T20:00:00.000Z',
          price: 30,
          movieId,
        })
        .expect(201);

      showtimeId = response.body.id;
    });
  });

  describe('Bookings', () => {
    it('should fail to create booking without seat', async () => {
      await request(app.getHttpServer())
        .post('/bookings')
        .send({
          userId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
          showtimeId,
        })
        .expect(400);
    });

    it('should fail to create booking without user ID', async () => {
      await request(app.getHttpServer())
        .post('/bookings')
        .send({
          seat: 'C3',
          showtimeId,
        })
        .expect(400);
    });

    it('should create a valid booking', async () => {
      await request(app.getHttpServer())
        .post('/bookings')
        .send({
          seat: 'C3',
          userId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
          showtimeId,
        })
        .expect(201);
    });

    it('should fail to double-book the same seat for a showtime', async () => {
      await request(app.getHttpServer())
        .post('/bookings')
        .send({
          seat: 'C3',
          userId: 'b2c3d4e5-f6a7-8901-bcde-fa1234567890',
          showtimeId,
        })
        .expect(400);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
