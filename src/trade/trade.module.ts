import { Module, ValidationPipe } from '@nestjs/common';
import { BinanceClient, IBinanceClient } from './clients/binance.client';
import { TradeService } from './services/trade.service';
import { TradeController } from './controllers/trade.controller';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ErrorFilters } from '../libs/errors/error.filters';

@Module({
  imports: [],
  controllers: [TradeController],
  providers: [
    TradeService,
    {
      provide: IBinanceClient,
      useClass: BinanceClient,
    },
    {
      provide: APP_FILTER,
      useClass: ErrorFilters,
    },
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          transform: true,
        }),
    },
  ],
})
export class TradeModule {}
