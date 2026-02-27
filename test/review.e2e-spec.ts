import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { CreateReviewDto } from 'src/review/dto/create-review.dto';
import { ReviewDocument } from 'src/review/review.model';
import { Types } from 'mongoose';

const testDto: CreateReviewDto = {
  name: 'test name',
  title: 'test title',
  description: 'test descriptions',
  rating: 4,
  productId: new Types.ObjectId().toHexString(),
};

let createdId = '';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/ (GET) - success', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/review/create (POST) - success', async () => {
    return request(app.getHttpServer())
      .post('/review/create')
      .send(testDto)
      .expect(201)
      .then(({ body }: { body: ReviewDocument }) => {
        createdId = body._id as unknown as string;
        expect(createdId).toBeDefined();
      });
  });
  it('/review/create (POST) - failure', async () => {
    return request(app.getHttpServer())
      .post('/review/create')
      .send({ ...testDto, rating: 0 })
      .expect(400);
  });

  it('/review/byProduct (GET) - success', async () => {
    return request(app.getHttpServer())
      .get(`/review/byProduct/${testDto.productId}`)
      .send()
      .expect(200)
      .then(({ body }: { body: ReviewDocument[] }) => {
        expect(
          body.every(
            (review) =>
              (review.productId as unknown as string) === testDto.productId,
          ),
        ).toBeTruthy();
      });
  });

  it('/review/:id (DELETE) - success', async () => {
    return request(app.getHttpServer())
      .delete(`/review/${createdId}`)
      .send()
      .expect(200);
  });

  it('/review/:id (DELETE) - failure', async () => {
    return request(app.getHttpServer())
      .delete(`/review/${createdId}`)
      .send()
      .expect(404);
  });
});
