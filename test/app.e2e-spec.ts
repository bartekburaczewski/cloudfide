import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import request from 'supertest';

describe('TradeController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/trades/latest (GET)', () => {
    it('', async () => {
      // arrange
      // TODO finish e2e test
      // act
      await request(app.getHttpServer()).get('trades/latest').expect(HttpStatus.OK).expect([]);

      // assert
    });
  });
});
