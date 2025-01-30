import { ExternalServerError } from '../../../libs/errors/base.error';

export class BinanceError extends ExternalServerError {
  constructor(message: string) {
    super('Error while calling Binance API: ' + message);
  }
}
