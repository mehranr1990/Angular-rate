import { Injectable } from '@angular/core';
import { Coin } from '../models/coin.model';
import { LocalstorageDBService } from './localstorage-db.service';
import { CreateCoin } from '../dtos/create-coin.dto';

@Injectable({
  providedIn: 'root',
})
export class CoinsService {
  private _coins: Coin[] = [];

  public get coins(): Coin[] {
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
    this._coins = [...this.coins, newCoin];
    this.localStorageService.addCoin(newCoin);
    return this._coins;
  }
  public getAll(){
     this._coins = this.localStorageService.getCoins()
     return this._coins
  }
  public update(id: string, buyprice: number, sellprice: number) {
    const selectedCoin: Coin | undefined = this._coins.find(
      (coin) => coin.id === id
    );
    if (selectedCoin) {
      selectedCoin.buyprice = buyprice;
      selectedCoin.sellprice = sellprice;
    }
    this.localStorageService.UpdateCoin(this._coins)
  }
}
