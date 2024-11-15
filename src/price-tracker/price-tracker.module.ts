import { Module } from '@nestjs/common';
import { PriceTrackerService } from './price-tracker.service';
import { PriceTrackerController } from './price-tracker.controller';
import { PriceRepository } from './price-repository';

@Module({
  imports: [],
  controllers: [PriceTrackerController],
  providers: [PriceTrackerService, PriceRepository], // Registering PriceRepository here
})
export class PriceTrackerModule {}
