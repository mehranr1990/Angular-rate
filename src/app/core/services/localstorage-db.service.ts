import { Injectable } from '@angular/core';
import { Coin } from '../models/coin.model';
import { CoinRate } from '../models/coin-rate.model';
import { createRateCoin } from '../dtos/create-rateCoin.dto';

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

  public setCoinrate(coinsRate: any[]) {
    const coinRateforsave: createRateCoin[] = coinsRate.map((coinRate) => {
      return {
        id: coinRate.id,
        fromCoinId: coinRate.fromCoinId,
        toCoinId: coinRate.toCoinId,
        rate: coinRate.rate,
        isRate: coinRate.israte,
      };
    });
    localStorage.setItem('coins-rate', JSON.stringify(coinRateforsave));
  }
  public setCoinrate1(coinsRate: CoinRate[]) {
    const coinRateforsave: createRateCoin[] = coinsRate.map((coinRate) => {
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
    const coinRateFromLocalStorageList: createRateCoin[] = JSON.parse(
      localStorage.getItem('coins-rate')!
    );
    const coins: Coin[] = this.getCoins();
    if(coinRateFromLocalStorageList){
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
  }else{
    return []
  }
  }
  public getCoinrate1() {
    const coinRateFromLocalStorageList: createRateCoin[] = JSON.parse(
      localStorage.getItem('coins-rate')!
    );
    if(coinRateFromLocalStorageList){
    const coinsRateList: any[] = coinRateFromLocalStorageList.map(
      (coinRate) => {
        console.log(coinRate);
        return {
          id: coinRate.id,
          fromCoinId: coinRate.fromCoinId,
          toCoinId: coinRate.toCoinId,
          rate: coinRate.rate,
          israte: coinRate.isRate,
        };
      }
    );
    return coinsRateList;
  }else{
    return []
  }
  }
}
