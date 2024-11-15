// swap-rate.dto.ts
export class SwapRateDto {
  ethereumAmount: number; // Moving ethereumAmount to the root level
  btcAmount: number;
  totalFee: {
    eth: number;
    usd: number;
  };
}
