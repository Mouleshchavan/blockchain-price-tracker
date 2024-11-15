import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Price } from './price.entity';
import { Alert } from './alert.entity';
import { SetAlertDto } from './dto/set-alert.dto';
import { SwapRateDto } from './dto/get-swap-rate.dto';
import axios from 'axios';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class PriceTrackerService {
  constructor(
    @InjectRepository(Price)
    private readonly priceRepository: Repository<Price>,
    @InjectRepository(Alert)
    private readonly alertRepository: Repository<Alert>,
  ) {}

  async fetchPrice(chain: string): Promise<number> {
    const response = await axios.get(
      `https://api.moralis.io/v2/price?chain=${chain}`,
    );
    return response.data.price;
  }

  @Cron('0 */5 * * * *') // Every 5 minutes
  async updatePrices() {
    const chains = ['ethereum', 'polygon'];
    for (const chain of chains) {
      const price = await this.fetchPrice(chain);
      const priceRecord = this.priceRepository.create({ chain, price });
      await this.priceRepository.save(priceRecord);
    }
  }

  @Cron('0 */5 * * * *') // Every 5 minutes
  async checkAlerts() {
    const prices = await this.priceRepository.find();
    const alerts = await this.alertRepository.find();

    for (const alert of alerts) {
      const latestPrice = prices.find((p) => p.chain === alert.chain)?.price;
      if (latestPrice && latestPrice >= alert.targetPrice) {
        await this.sendAlertEmail(alert.email, alert.chain, alert.targetPrice);
      }
    }
  }

  async sendAlertEmail(email: string, chain: string, price: number) {
    // Email sending logic here
    console.log(`Email sent to ${email}: ${chain} price reached $${price}`);
  }

  async getHourlyPrices() {
    const prices = await this.priceRepository.find();
    return prices;
  }

  async setAlert(setAlertDto: SetAlertDto) {
    const alert = this.alertRepository.create(setAlertDto);
    await this.alertRepository.save(alert);
    return { message: 'Alert set successfully' };
  }

  async getSwapRate(getSwapRateDto: SwapRateDto) {
    const { ethereumAmount } = getSwapRateDto;
    const ethToBtcRate = 0.03; // Mock rate
    const btcAmount = ethereumAmount * ethToBtcRate;
    const fee = ethereumAmount * 0.03; // 3% fee
    return {
      btcAmount,
      fee: {
        eth: fee,
        usd: fee * 3000, // Mock ETH to USD conversion rate
      },
    };
  }
}
