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
  constructor(private coinService: CoinsService,private localStorageService: LocalstorageDBService) {}
  public getAll(){
    this._coinRateList = this.localStorageService.getCoinrate()
    
    return this._coinRateList

  }
  public create() {
    const coins = this.coinService.getAll();
    
    this._coinRateList = []
    for (let index = 0; index < coins.length; index++) {
      
      
      for (let index1 = 0; index1 < coins.length; index1++) {
      
        if (coins[index].id === coins[index1].id) {
        } else {  
          const newCoinsRate: CoinRate = {
            id: uuid.v4(),
            fromCoin: coins[index],
            toCoin: coins[index1],
            rate: 0,
            israte: true,
            };
          this._coinRateList = [...this.coinRateList,newCoinsRate];
        }
        
        }
      this.localStorageService.setCoinrate(this._coinRateList)
    }
  }
}
