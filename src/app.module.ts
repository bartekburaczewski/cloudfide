import { Module } from '@nestjs/common';
import { TradeModule } from './trade/trade.module';

@Module({
  imports: [TradeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
