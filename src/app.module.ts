import { Module } from '@nestjs/common';
import { PriceTrackerController } from './price-tracker/price-tracker.controller';
import { PriceTrackerService } from './price-tracker/price-tracker.service';
import { PriceTrackerModule } from './price-tracker/price-tracker.module';

@Module({
  imports: [PriceTrackerModule],
  controllers: [PriceTrackerController],
  providers: [PriceTrackerService],
})
export class AppModule {} // Export AppModule
