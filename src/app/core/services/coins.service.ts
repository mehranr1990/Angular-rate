import { Injectable } from '@angular/core';
import { Coin } from '../models/coin.model';
import { CreateCoin } from '../dtos/create-coin.dto';
import { BehaviorSubject, Observable, lastValueFrom, map, tap } from 'rxjs';
import { CoinRateService } from './coin-rate.service';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root',
})
export class CoinsService {
  // private _isLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
  //   false
  // );
  private _coins: BehaviorSubject<Coin[]> = new BehaviorSubject<Coin[]>([]);

  public get coins(): Observable<Coin[]> {
    return this._coins;
  }


  private _coinsData: BehaviorSubject<{coinId: string, amount: number, exchangeStatus: number}[]> = new BehaviorSubject<{coinId: string, amount: number, exchangeStatus: number}[]>([]);

  public get coinsData(): Observable<{coinId: string, amount: number, exchangeStatus: number}[]> {
    return this._coinsData;
  }

  // public set isLogin(islogin: boolean) {
  //   this._isLogin.next(islogin);
  // }
  // public get isLogin(): Observable<boolean> {
  //   return this._isLogin;
  // }

  // set coins(coins: Coin[]){
  //   this._coins = coins;
  // }

  constructor(
    // private localStorageService: LocalstorageDBService,
    private coinRateService: CoinRateService,
    private api: ApiService
  ) {}

  public create(payload: CreateCoin) {
    const newCoin: Coin = {
      ...payload,
      buyPrice: 0,
      sellPrice: 0,
    };
    // await lastValueFrom(this.api.get(''));

    this._coins.next([...this._coins.getValue(), newCoin]);
    // this.localStorageService.addCoin(newCoin);

    // this.coinRateService
    //   .addCoinToRateList(this._coins.getValue(), newCoin)
    //   .subscribe({
    //     next: (resp) => {
    //       console.log(resp);
    //     },
    //   });

    return this.api.post('coin', newCoin).pipe(
      map((resp: any) => {
        return {
          id: resp.Id,
          name: resp.coin_Name,
          image: resp.coin_Image,
          buyPrice: resp.coin_BuyPrice,
          sellPrice: resp.coin_SellPrice,
        };
      })
      // tap({
      //   next: (resp) =>
      //     this.coinRateService
      //       .addCoinToRateList(this._coins.getValue(), resp)
      //       .subscribe({
      //         next: (resp) => {
      //           console.log(resp);
      //         },
      //       }),
      // })
    );
  }

  public getAll(): Observable<Coin[]> {
    return this.api.get('coin/find-all').pipe(
      map((resp: any) =>
        resp.map((res: any) => {
          // this._isLogin.next(true);
          return {
            id: res.Id,
            name: res.coin_Name,
            image: res.coin_Image,
            buyPrice: res.coin_BuyPrice,
            sellPrice: res.coin_SellPrice,
          };
        })
      ),
      tap((resp) => {
        this._coins.next(resp);
      })
    );

    // this._coins.next(this.localStorageService.getCoins());
  }

  public update(id: string, buyPrice: number, sellPrice: number) {
    return this.api
      .put(`coin/update/${id}`, { buyPrice: +buyPrice, sellPrice: +sellPrice })
      .pipe(
        tap({
          next: (resp) => {
            const selectedCoin: Coin | undefined = this._coins
              .getValue()
              .find((coin) => coin.id === id);
            if (selectedCoin) {
              selectedCoin.buyPrice = +buyPrice;
              selectedCoin.sellPrice = +sellPrice;
              
              this._coins.next(this._coins.getValue());
            }
          },
          error: (resp) => {},
        })
      );
    // this.localStorageService.UpdateCoin(this._coins.getValue());
  }

  deleteCoin(id:any){
return this.api.delete(`coin/${id}`)
  }
}
