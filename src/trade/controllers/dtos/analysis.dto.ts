import { IsString } from 'class-validator';

export class AnalysisQueryDto {
  @IsString()
  symbol: string;
}

export class AnalysisResponseDto {
  @IsString()
  changePrice: string;

  @IsString()
  changePercentage: string;
}
