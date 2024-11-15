import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PriceTrackerService } from './price-tracker.service';
import { SetAlertDto } from './dto/set-alert.dto';
import { SwapRateDto } from './dto/get-swap-rate.dto';

@Controller('price-tracker')
export class PriceTrackerController {
  constructor(private readonly priceTrackerService: PriceTrackerService) {}

  @Get('prices/hourly')
  async getHourlyPrices() {
    return this.priceTrackerService.getHourlyPrices();
  }

  @Post('alerts')
  async setAlert(@Body() setAlertDto: SetAlertDto) {
    return this.priceTrackerService.setAlert(setAlertDto);
  }

  @Get('swap-rate')
  async getSwapRate(@Query() getSwapRateDto: SwapRateDto) {
    return this.priceTrackerService.getSwapRate(getSwapRateDto);
  }
}
