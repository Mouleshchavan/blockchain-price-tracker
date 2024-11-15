import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SwapRateDto } from './price-tracker/dto/get-swap-rate.dto';

@Controller('api/v1')
export class SwapRateController {
  @Post('get-swap-rate')
  @ApiOperation({ summary: 'Get swap rate (ETH to BTC)' })
  @ApiResponse({
    status: 200,
    description: 'Return swap rate and fee',
    type: SwapRateDto,
  })
  async getSwapRate(@Body() body: { ethAmount: number }): Promise<any> {
    const ethAmount = body.ethAmount;

    // For demonstration purposes, assuming a fixed exchange rate for ETH to BTC.
    const btcAmount = ethAmount * 0.062;
    const fee = 0.03;
    const feeAmount = ethAmount * fee;

    return {
      data: {
        btcAmount,
        totalFee: {
          eth: feeAmount,
          usd: feeAmount * 1800, // Assuming ETH price is $1800
        },
      },
    };
  }
}
