import { Coin } from './coin.model';

export interface CoinRate {
  id: number;
  fromCoin: Coin | string;
  toCoin: Coin | string;
  rate: number;
  isRate: number;
}
export interface CoinRateCoin{
  id: number;
  fromCoin: Coin ;
  toCoin: Coin ;
  rate: number;
  isRate: number;
}
