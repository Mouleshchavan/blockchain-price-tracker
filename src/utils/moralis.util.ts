import axios from 'axios';

export class MoralisUtils {
  private static baseURL = 'https://deep-index.moralis.io/api/v2'; // Moralis API Base URL
  private static apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjNjMmFhYjlhLTgxNDQtNDAwZS1hYmM0LWMxYmU0MTI5ZThlYyIsIm9yZ0lkIjoiNDE2MjA0IiwidXNlcklkIjoiNDI3Nzg4IiwidHlwZUlkIjoiYjJjYzBkNmItYzkzNC00NDFkLThmYmItODRkMzE0MmM2OTJkIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MzE2NTY2MDAsImV4cCI6NDg4NzQxNjYwMH0.SkdiiiuHXTrR79txWylLr11ondJgpYf41IcOA7JHA2E'; // Replace with your Moralis API key

  /**
   * Fetch the current price of a cryptocurrency (e.g., Ethereum, Polygon).
   * @param chain - The blockchain name (e.g., 'eth', 'polygon').
   */
  static async getCurrentPrice(chain: string): Promise<number> {
    try {
      const response = await axios.get(`${this.baseURL}/token/price`, {
        params: { chain },
        headers: {
          'X-API-Key': this.apiKey,
        },
      });
      return response.data.usdPrice; // Return the USD price from the response
    } catch (error) {
      console.error(`Failed to fetch price for ${chain}:`, error);
      throw new Error(`Error fetching price for ${chain}`);
    }
  }

  /**
   * Get swap rate (e.g., ETH to BTC).
   * @param ethAmount - Amount of ETH to swap.
   */
  static async getSwapRate(
    ethAmount: number,
  ): Promise<{ btcAmount: number; fee: { eth: number; usd: number } }> {
    try {
      const ethPrice = await this.getCurrentPrice('eth');
      const btcPrice = await this.getCurrentPrice('btc');

      const btcAmount = (ethAmount * ethPrice) / btcPrice;
      const feePercentage = 0.03; // 3% fee
      const feeEth = ethAmount * feePercentage;
      const feeUsd = feeEth * ethPrice;

      return { btcAmount, fee: { eth: feeEth, usd: feeUsd } };
    } catch (error) {
      console.error('Failed to calculate swap rate:', error);
      throw new Error('Error calculating swap rate');
    }
  }
}
