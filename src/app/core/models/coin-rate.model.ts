import { Coin } from './coin.model';

export interface CoinRate {
  id: number;
  fromCoin: Coin | string;
  toCoin: Coin | string;
  rate: number;
  isRate: number;
}
