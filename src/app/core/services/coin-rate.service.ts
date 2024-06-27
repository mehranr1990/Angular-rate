import { Injectable } from '@angular/core';
import { CoinRate } from '../models/coin-rate.model';
import { LocalstorageDBService } from './localstorage-db.service';
import * as uuid from 'uuid';
import { Coin } from '../models/coin.model';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CoinRateService {
  private _coinRateList: BehaviorSubject<CoinRate[]> = new BehaviorSubject<
    CoinRate[]
  >([]);

  public get coinRateList(): Observable<CoinRate[]> {
    return this._coinRateList;
  }

  constructor(
    private localStorageService: LocalstorageDBService,
    private api: ApiService
  ) {}

  public getAll() {
    return this.api.get('coin-rate/find-all').pipe(
      map((resp: any) => {
        
        return resp.map((res: any) => {
          return {
            id: res.Id,
            fromCoin: res.coinrate_FromCoin,
            toCoin: res.coinrate_ToCoin,
            rate: res.coinrate_Rate,
            isRate: res.coinrate_IsRate,
          };
        });
      }),
      tap({
        next: (response) => {
          this._coinRateList.next(response);
        
        },
        
        
      })
    );
    // this._coinRateList.next(this.localStorageService.getCoinrate1());
  }
  // addCoinToRateList(listcoin: Coin[], newCoin: Coin) {
  //   let newRates: any = [];
  //   this.getAll().subscribe({
  //     next: (all) => {
  //       newRates = all;
  //     },
  //   });
  //   listcoin
  //     .filter((coin) => newCoin.id !== coin.id)
  //     .forEach((selectedCoin) => {
  //       const rate1 = {
  //         fromCoin: newCoin.id,
  //         toCoin: selectedCoin.id,
  //         rate: 0,
  //         isRate: 1,
  //       };
  //       console.log(rate1);

  //       this.api.post('coin-rate', rate1);
  //       newRates.push(rate1);
  //       const rate2 = {
  //         fromCoin: selectedCoin.id,
  //         toCoin: newCoin.id,
  //         rate: 0,
  //         isRate: 1,
  //       };
  //       newRates.push(rate2);
  //       this.api.post('coin-rate', rate2);
  //     });
  //   this._coinRateList.next(newRates);
  //     for (let index = 0; index < newRates.length; index++) {

  //       return this.api.post('coin-rate', newRates[index]);
  //     }
  //   return this.api.post('', newRates);
  //   // this.localStorageService.setCoinrate(newRates);
  // }
  // public create() {
  //   let coins:Coin[] = []
  //   this.coinService.getAll();
  //   this.coinService.coins.subscribe({next:(coin)=>{
  //     coins=coin
  //   }})
  //   this._coinRateList = [];
  //   for (let mainCoinIndex = 0; mainCoinIndex < coins.length; mainCoinIndex++) {
  //     for (
  //       let secondaryCoinIndex = 0;
  //       secondaryCoinIndex < coins.length;
  //       secondaryCoinIndex++
  //     ) {
  //       if (coins[mainCoinIndex].id !== coins[secondaryCoinIndex].id) {
  //         const newCoinsRate: CoinRate = {
  //           id: uuid.v4(),
  //           fromCoin: coins[mainCoinIndex],
  //           toCoin: coins[secondaryCoinIndex],
  //           rate: 0,
  //           israte: true,
  //         };
  //         this._coinRateList = [...this.coinRateList, newCoinsRate];
  //       }
  //     }
  //   }
  //   this.localStorageService.setCoinrate(this._coinRateList);
  // }

  // Observable1.pipe(switchMap((observable1Data) => {
  // return Observable2
  // })

  // public createbycoinadd(addedcoin:Coin){
  //   let coins:Coin[] = []
  //   this.coinService.getAll();
  //   this.coinService.coins.subscribe({next:(coin)=>{
  //     coins=coin
  //   }})
  //   for (let index = 0; index < coins.length; index++) {
  //     if(addedcoin.id !== coins[index].id){
  //       const newCoinsRate: CoinRate = {
  //         id: uuid.v4(),
  //         fromCoin: coins[index],
  //         toCoin: addedcoin,
  //         rate: 0,
  //         israte: true,
  //       };
  //       this._coinRateList.next([...this._coinRateList.getValue(), newCoinsRate])
  //       const newCoinsRate1: CoinRate = {
  //         id: uuid.v4(),
  //         fromCoin: addedcoin,
  //         toCoin: coins[index],
  //         rate: 0,
  //         israte: true,
  //       };
  //       this._coinRateList.next([...this._coinRateList.getValue(), newCoinsRate1])
  //     }
  //   }
  //   this.localStorageService.setCoinrate1(this._coinRateList.getValue());
  // }

  public update(id: number, rate: number, isRate: number) {
    const selectedCoinRate = this._coinRateList
      .getValue()
      .find((coinrate) => +coinrate.id === id)!;
    // console.log(selectedCoinRate);
    selectedCoinRate.rate = rate;
    selectedCoinRate.isRate = isRate;
    // this.localStorageService.setCoinrate(this._coinRateList.getValue());
    this._coinRateList.next(this._coinRateList.getValue());
    return this.api.put(`coin-rate/update/${id}`, { "rate": +rate,
      "isRate": +isRate
    });
    // return selectedCoinRate;
  }
}
