import { IsBoolean, IsNumber, IsString, IsUUID } from 'class-validator';

export class TradeQueryDto {
  @IsString()
  symbol: string;
}

export class TradeResponseDto {
  @IsUUID('4')
  id: number;

  @IsString()
  price: string;

  @IsString()
  qty: string;

  @IsString()
  quoteQty: string;

  @IsNumber()
  time: number;

  @IsBoolean()
  isBuyerMaker: boolean;

  @IsBoolean()
  isBestMatch: boolean;
}
