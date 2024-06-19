import { Injectable } from '@angular/core';
import { Coin } from '../models/coin.model';
import { LocalstorageDBService } from './localstorage-db.service';
import { CreateCoin } from '../dtos/create-coin.dto';
import { BehaviorSubject, Observable } from 'rxjs';
import * as uuid from 'uuid';
import { createRateCoin } from '../dtos/create-rateCoin.dto';

@Injectable({
  providedIn: 'root',
})
export class CoinsService {
  private _coins: BehaviorSubject<Coin[]> = new BehaviorSubject<Coin[]>([]);

  public get coins(): Observable<Coin[]> {
    return this._coins;
  }
  // set coins(coins: Coin[]){
  //   this._coins = coins;
  // }

  constructor(private localStorageService: LocalstorageDBService) {}

  public create(payload: CreateCoin) {
    const newCoin: Coin = {
      ...payload,
      buyprice: 0,
      sellprice: 0,
    };
    this._coins.next([...this._coins.getValue(), newCoin]);

    const newRates: createRateCoin[] = this.localStorageService.getCoinrate1();
    console.log(newRates);
    
    const coins: Coin[] = this.localStorageService.getCoins();
    coins
      .filter((coin) => newCoin.id !== coin.id)
      .forEach((selectedCoin) => {
        newRates.push({
          id: uuid.v4(),
          fromCoinId: newCoin.id,
          toCoinId: selectedCoin.id,
          rate: 0,
          isRate: true,
        });
        newRates.push({
          id: uuid.v4(),
          fromCoinId: selectedCoin.id,
          toCoinId: newCoin.id,
          rate: 0,
          isRate: true,
        });
      });
    this.localStorageService.addCoin(newCoin);
    this.localStorageService.setCoinrate(newRates);
  }

  public getAll() {
    this._coins.next(this.localStorageService.getCoins());
  }
  
  public update(id: string, buyprice: number, sellprice: number) {
    const selectedCoin: Coin | undefined = this._coins
      .getValue()
      .find((coin) => coin.id === id);
    if (selectedCoin) {
      selectedCoin.buyprice = buyprice;
      selectedCoin.sellprice = sellprice;
    }
    this.localStorageService.UpdateCoin(this._coins.getValue());
  }
}
