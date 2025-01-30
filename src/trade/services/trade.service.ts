import { Injectable } from '@nestjs/common';
import { IBinanceClient } from '../clients/binance.client';

@Injectable()
export class TradeService {
  constructor(private readonly binanceClient: IBinanceClient) {}

  public async getLatestTrades(symbol: string): Promise<TradeDetails[]> {
    return this.binanceClient.getLatestTrades(symbol);
  }

  public async analyseTrades(symbol: string): Promise<TradeAnalysis[]> {
    const trades = await this.getLatestTrades(symbol);

    if (trades.length < 2) {
      return [];
    }

    return trades
      .map((_, index) => {
        if (index < 1) {
          return undefined;
        }

        const previousTrade = trades[index - 1];
        const currentTrade = trades[index];
        const currentPrice = parseFloat(currentTrade.price);
        const previousPrice = parseFloat(previousTrade.price);

        const change = currentPrice - previousPrice;
        const changePercentage = (change / previousPrice) * 100;

        return {
          changePrice: change.toFixed(2),
          changePercentage: changePercentage.toFixed(2),
        };
      })
      .filter((x) => x) as TradeAnalysis[];
  }
}

export type TradeAnalysis = {
  changePrice: string;
  changePercentage: string;
};

export type TradeDetails = {
  id: number;
  price: string;
  qty: string;
  quoteQty: string;
  time: number;
  isBuyerMaker: boolean;
  isBestMatch: boolean;
};
