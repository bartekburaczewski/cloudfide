import { Controller, Get, Query } from '@nestjs/common';
import { TradeService } from '../services/trade.service';
import { TradeQueryDto, TradeResponseDto } from './dtos/latest-trade.dto';
import { AnalysisQueryDto, AnalysisResponseDto } from './dtos/analysis.dto';

@Controller('trades')
export class TradeController {
  constructor(private readonly tradeService: TradeService) {}

  @Get('latest')
  async getLatestTrades(@Query() query: TradeQueryDto): Promise<TradeResponseDto[]> {
    return this.tradeService.getLatestTrades(query.symbol);
  }

  @Get('analyse')
  async analyseTrades(@Query() query: AnalysisQueryDto): Promise<AnalysisResponseDto[]> {
    return this.tradeService.analyseTrades(query.symbol);
  }
}
