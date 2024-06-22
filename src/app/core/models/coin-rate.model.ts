import { Coin } from './coin.model';

export interface CoinRate {
  id: string;
  fromCoin: Coin | string;
  toCoin: Coin | string;
  rate: number;
  isRate: boolean;
}
