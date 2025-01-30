import { Test, TestingModule } from '@nestjs/testing';
import { TradeService } from './trade.service';
import { createMock } from '@golevelup/ts-jest';
import { IBinanceClient } from '../clients/binance.client';
import { ExternalServerError } from '../../libs/errors/base.error';
import { tryAct } from '../../libs/testing/try-act';

describe('TradeService', () => {
  let tradeService: TradeService;
  const binanceClientMock = createMock<IBinanceClient>();

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        TradeService,
        {
          provide: IBinanceClient,
          useValue: binanceClientMock,
        },
      ],
    }).compile();

    tradeService = moduleFixture.get(TradeService);
  });

  describe('getLatestTrades', () => {
    it('should throw error if binance client returns error', async () => {
      // arrange
      binanceClientMock.getLatestTrades.mockRejectedValueOnce(
        new ExternalServerError('unexpected error'),
      );

      // act
      const { error } = await tryAct(() => tradeService.getLatestTrades('BTCUSDT'));

      // assert
      expect(error).toBeDefined();
      expect(error).toBeInstanceOf(ExternalServerError);
      expect(error?.message).toEqual('unexpected error');
    });

    it('should return empty array', async () => {
      // arrange
      binanceClientMock.getLatestTrades.mockResolvedValue([]);

      // act
      const result = await tradeService.getLatestTrades('BTCUSDT');

      // assert
      expect(result).toMatchObject([]);
    });

    it('should return some trades', async () => {
      // arrange
      const trades = [
        {
          id: 4489726538,
          price: '106184.01000000',
          qty: '0.00010000',
          quoteQty: '10.61840100',
          time: 1738248986116,
          isBuyerMaker: true,
          isBestMatch: true,
        },
        {
          id: 4489726539,
          price: '106184.01000000',
          qty: '0.00005000',
          quoteQty: '5.30920050',
          time: 1738248986116,
          isBuyerMaker: true,
          isBestMatch: true,
        },
      ];
      binanceClientMock.getLatestTrades.mockResolvedValue(trades);

      // act
      const result = await tradeService.getLatestTrades('BTCUSDT');

      // assert
      expect(result).toMatchObject(trades);
    });
  });

  describe('analyseTrades', () => {
    it('should return results of trade analysis', async () => {
      // arrange
      const trades = [
        {
          id: 4489989696,
          price: '105641.92000000',
          qty: '0.00006000',
          quoteQty: '6.33851520',
          time: 1738250929420,
          isBuyerMaker: true,
          isBestMatch: true,
        },
        {
          id: 4489989697,
          price: '103641.92000000',
          qty: '0.00006000',
          quoteQty: '6.33851520',
          time: 1738250929420,
          isBuyerMaker: true,
          isBestMatch: true,
        },
        {
          id: 4489989698,
          price: '100641.92000000',
          qty: '0.00012000',
          quoteQty: '12.67703040',
          time: 1738250929420,
          isBuyerMaker: true,
          isBestMatch: true,
        },
        {
          id: 4489989699,
          price: '104641.92000000',
          qty: '0.00011000',
          quoteQty: '11.62061120',
          time: 1738250929420,
          isBuyerMaker: true,
          isBestMatch: true,
        },
        {
          id: 4489989700,
          price: '109641.91000000',
          qty: '0.00006000',
          quoteQty: '6.33851460',
          time: 1738250929420,
          isBuyerMaker: true,
          isBestMatch: true,
        },
      ];
      binanceClientMock.getLatestTrades.mockResolvedValue(trades);

      // act
      const result = await tradeService.analyseTrades('BTCUSDT');

      // assert
      expect(result).toMatchSnapshot();
    });
  });
});
