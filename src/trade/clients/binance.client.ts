import { Injectable } from '@nestjs/common';
import axios, { Axios, AxiosError } from 'axios';
import getenv from 'getenv';
import { BinanceError } from './errors/binance.error';

export type Trade = {
  id: number;
  price: string;
  qty: string;
  quoteQty: string;
  time: number;
  isBuyerMaker: boolean;
  isBestMatch: boolean;
};

export abstract class IBinanceClient {
  abstract getLatestTrades(symbol: string): Promise<Trade[]>;
}

@Injectable()
export class BinanceClient implements IBinanceClient {
  private readonly client: Axios;

  constructor() {
    this.client = axios.create({
      baseURL: getenv('BINANCE_URL'),
    });
  }
  async getLatestTrades(symbol: string): Promise<Trade[]> {
    try {
      const response = await this.client.get<Trade[]>(`/v3/trades?symbol=${symbol}`);

      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      throw new BinanceError(err.response?.data as string);
    }
  }
}
