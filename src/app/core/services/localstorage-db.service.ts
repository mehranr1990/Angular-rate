import { Injectable } from '@angular/core';
import { Coin } from '../models/coin.model';
import { CoinRate } from '../models/coin-rate.model';

interface coinRateforsave {
  id: string;
  fromCoinId: string;
  toCoinId: String;
  rate: number;
  isRate: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class LocalstorageDBService {
  constructor() {}

  public addCoin(coin: Coin) {
    const coins: Coin[] = [...this.getCoins(), coin];
    localStorage.setItem('coins', JSON.stringify(coins));
  }
  public UpdateCoin(coins:Coin[]){
    localStorage.setItem('coins', JSON.stringify(coins));
  }

  public getCoins() {
    if (localStorage.getItem('coins')) {
      return JSON.parse(localStorage.getItem('coins')!);
    } else {
      localStorage.setItem('coins', JSON.stringify([]));
      return [];
    }
  }

  public setCoinrate(coinsRate: CoinRate[]) {
    const coinRateforsave: coinRateforsave[] = coinsRate.map((coinRate) => {
      return {
        id: coinRate.id,
        fromCoinId: coinRate.fromCoin.id,
        toCoinId: coinRate.toCoin.id,
        rate: coinRate.rate,
        isRate: coinRate.israte,
      };
    });
    localStorage.setItem('coins-rate', JSON.stringify(coinRateforsave));
  }

  public getCoinrate() {
    const coinRateFromLocalStorageList: coinRateforsave[] = JSON.parse(
      localStorage.getItem('coins-rate')!
    );
    const coins: Coin[] = this.getCoins();
    const coinsRateList: CoinRate[] = coinRateFromLocalStorageList.map(
      (coinRate) => {
        return {
          id: coinRate.id,
          fromCoin: coins.find((coin) => coin.id === coinRate.fromCoinId)!,
          toCoin: coins.find((coin) => coin.id === coinRate.toCoinId)!,
          rate: coinRate.rate,
          israte: coinRate.isRate,
        };
      }
    );
    return coinsRateList;
  }
}
