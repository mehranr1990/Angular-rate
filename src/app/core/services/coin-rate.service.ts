import { Injectable } from '@angular/core';
import { CoinsService } from './coins.service';
import { CoinRate } from '../models/coin-rate.model';
import { LocalstorageDBService } from './localstorage-db.service';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class CoinRateService {
  private _coinRateList: CoinRate[] = [];

  public get coinRateList(): CoinRate[] {
    return this._coinRateList;
  }
  constructor(
    private coinService: CoinsService,
    private localStorageService: LocalstorageDBService
  ) {}
  public getAll() {
    this._coinRateList = this.localStorageService.getCoinrate();

    return this._coinRateList;
  }
  public create() {
    const coins = this.coinService.getAll();
    this._coinRateList = [];
    for (let mainCoinIndex = 0; mainCoinIndex < coins.length; mainCoinIndex++) {
      for (
        let secondaryCoinIndex = 0;
        secondaryCoinIndex < coins.length;
        secondaryCoinIndex++
      ) {
        if (coins[mainCoinIndex].id !== coins[secondaryCoinIndex].id) {
          const newCoinsRate: CoinRate = {
            id: uuid.v4(),
            fromCoin: coins[mainCoinIndex],
            toCoin: coins[secondaryCoinIndex],
            rate: 0,
            israte: true,
          };
          this._coinRateList = [...this.coinRateList, newCoinsRate];
        }
      }
    }
    this.localStorageService.setCoinrate(this._coinRateList);
  }
  
  public update(id: string, rate: number, israte: boolean) {
  const selectedCoinRate = this._coinRateList.find((coinrate) => coinrate.id === id)!;
  selectedCoinRate.rate = rate
  selectedCoinRate.israte = israte
  this.localStorageService.setCoinrate(this._coinRateList)
  return selectedCoinRate

  }
}
