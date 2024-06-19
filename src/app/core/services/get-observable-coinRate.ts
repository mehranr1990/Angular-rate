import { Injectable } from '@angular/core';
import { CoinsService } from './coins.service';
import { CoinRateService } from './coin-rate.service';
import { Coin } from '../models/coin.model';
import { CoinRate } from '../models/coin-rate.model';
import { switchMap, tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class getObservableCoinRate {
  constructor(
    private coinService: CoinsService,
    private coinRateService: CoinRateService
  ) {}

  public getCoinrate() {
    // let coinRateObservable: any[] = [];
    // this.coinRateService.getAll();
    // this.coinRateService.coinRateList.subscribe({
    //   next: (coinsRate) => {
    //     coinRateObservable = coinsRate;
    //   },
    // });
    // let coins: Coin[] = [];
    // this.coinRateService.getAll();
    // this.coinService.getAll();
    return this.coinService.coins.pipe(
      switchMap((resp) => {
        // console.log('coins: ', resp);
        return this.coinRateService.coinRateList.pipe(
          
          map((coinRates) =>
            coinRates.map((coinRate:any) => {
              return {
                id: coinRate.id,
                fromCoin: resp.find(
                  (coin) => coin.id === coinRate.fromCoinId
                )!,
                toCoin: resp.find((coin) => coin.id === coinRate.toCoinId)!,
                rate: coinRate.rate,
                isRate: coinRate.isRate,
              };
            })
          ),    
          
        );
      }),
      // tap((resp) => {
      //   console.log('tap:', resp);
      // })
      //   map((resp) => {
      //     console.log('map:', resp);
      //     return 'mapped';
      //   }),
      //   tap({
      //     next: (resp) => {
      //       console.log('tap 2:', resp);
      //     },
      //   })
      //   switchMap((coin) => {
      // console.log(coin);
      // return coin;
      //     if (coinRateObservable) {
      //       const coinsRateList: CoinRate[] = coinRateObservable.map(
      //         (coinRate) => {
      //           return {
      //             id: coinRate.id,
      //             fromCoin: coins.find((coin) => coin.id === coinRate.fromCoinId)!,
      //             toCoin: coins.find((coin) => coin.id === coinRate.toCoinId)!,
      //             rate: coinRate.rate,
      //             israte: coinRate.isRate,
      //           };
      //         }
      //       );
      //       return coinsRateList;
      //     } else {
      //       return [];
      //     }
      //   })
    );
    // console.log(coins);
    // console.log(coinRateObservable);
  }
}
