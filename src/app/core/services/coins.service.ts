import { Injectable } from '@angular/core';
import { Coin } from '../models/coin.model';
import { LocalstorageDBService } from './localstorage-db.service';
import { CreateCoin } from '../dtos/create-coin.dto';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoinsService {
  private _coins: BehaviorSubject< Coin[]> =new BehaviorSubject< Coin[]> ([]);

  public get coins(): Observable< Coin[]> {
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
    this._coins.next([...this._coins.getValue(), newCoin])
    this.localStorageService.addCoin(newCoin);
    
  }
  public getAll(){
     this._coins.next(this.localStorageService.getCoins())
  }
  public update(id: string, buyprice: number, sellprice: number) {
    const selectedCoin: Coin | undefined = this._coins.getValue().find(
      (coin) => coin.id === id
    );
    if (selectedCoin) {
      selectedCoin.buyprice = buyprice;
      selectedCoin.sellprice = sellprice;
    }
    this.localStorageService.UpdateCoin(this._coins.getValue())
  }
}
