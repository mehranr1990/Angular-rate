import { Injectable } from '@angular/core';
import { CoinRateService } from './coin-rate.service';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalculatorCoinExchangeService {
  private rateCoinArr:any = []
  constructor(private coinRateService: CoinRateService) {}
  
  public calculateCoinToCoin(isRate: boolean, amount: number, rate: number) {
    if (isRate) {
      return Number(
        (+amount + (+rate / 100) * +amount).toFixed(4)
      ).toLocaleString('en-US');
    } else {
      if (+rate > 0) {
        return Number((+amount * +rate).toFixed(4)).toLocaleString('en-US');
      } else {
        return Number(((-1 * +amount) / +rate).toFixed(4)).toLocaleString(
          'en-US'
        );
      }
    }
  }
  public calculateCoinprice(isRate: boolean, buyprice: number, rate: number) {
    if (isRate) {
      return Number((+buyprice / (1 + rate / 100)).toFixed(4)).toLocaleString(
        'en-US'
      );
    } else {
      if (+rate > 0) {
        return Number((+buyprice / +rate).toFixed(4)).toLocaleString('en-US');
      } else {
        return Number((-1 * +buyprice * +rate).toFixed(4)).toLocaleString(
          'en-US'
        );
      }
    }
  }
  public calculatepricedifference(
    isRate: boolean,
    buyprice: number,
    rate: number,
    sellprice: number,
    amount: number
  ) {
    if (isRate) {
      return 'حالت1';
    } else {
      if (+rate > 0) {
        return 'حالت2';
      } else {
        return 'حالت3';
      }
    }
  }
  public calculateGivetoGet(isRate: boolean, amount: number, rate: number) {
    if (isRate) {
      return Number(
        ((1 / (1 + rate / 100)) * amount).toFixed(4)
      ).toLocaleString('en-US');
    } else {
      if (+rate > 0) {
        return Number(((1 / +rate) * amount).toFixed(4)).toLocaleString(
          'en-US'
        );
      } else {
        return Number((-1 * rate * amount).toFixed(4)).toLocaleString('en-US');
      }
    }
  }
  public calculateCoinprice2(isRate: boolean, buyprice: number, rate: number) {
    if (isRate) {
      return Number(
        ((1 / (1 + rate / 100)) * buyprice).toFixed(4)
      ).toLocaleString('en-US');
    } else {
      if (+rate > 0) {
        return Number(((1 / +rate) * buyprice).toFixed(4)).toLocaleString(
          'en-US'
        );
      } else {
        return Number((-1 * rate * buyprice).toFixed(4)).toLocaleString(
          'en-US'
        );
      }
    }
  }
  public calculatesellbuyprice(
    isRate: boolean,
    amount: number,
    rate: number,
    buyprice: number
  ) {
    if (isRate) {
      return Number(
        ((1 / (1 + rate / 100)) * amount * buyprice).toFixed(4)
      ).toLocaleString('en-US');
    } else {
      if (+rate > 0) {
        return Number(
          ((1 / +rate) * amount * buyprice).toFixed(4)
        ).toLocaleString('en-US');
      } else {
        return Number(
          (-1 * rate * amount * buyprice).toFixed(4)
        ).toLocaleString('en-US');
      }
    }
  }
  public calculateprofitofselleng(
    isRate: boolean,
    amount: number,
    rate: number,
    buyprice: number,
    sellprice: number
  ) {
    if (isRate) {
      return Number(
        (
          amount * sellprice -
          (1 / (1 + rate / 100)) * amount * buyprice
        ).toFixed(4)
      ).toLocaleString('en-US');
    } else {
      if (+rate > 0) {
        return Number(
          (amount * sellprice - (1 / +rate) * amount * buyprice).toFixed(4)
        ).toLocaleString('en-US');
      } else {
        return Number(
          (amount * sellprice - -1 * rate * amount * buyprice).toFixed(4)
        ).toLocaleString('en-US');
      }
    }
  }
  public multiple(price: number, amount: number) {
    return price * amount;
  }
  public bestprice(coinId: string) {
    
    const coinRateTable = this.coinRateService.getAll();
    const coinrate = coinRateTable.filter(
      (cointable) => coinId === cointable.toCoin.id
    );
    for (let index = 0; index < coinrate.length; index++) {
      this.rateCoinArr.push({
        priceafter: Number(
          (1 / (1 + coinrate[index].rate / 100)) *
            coinrate[index].fromCoin.buyprice
        ),
        fullcoinRate: coinrate[index]
      });
    }
    this.rateCoinArr.sort((a: any, b: any) => a.priceafter - b.priceafter);

    if (+ this.rateCoinArr[0].priceafter < + this.rateCoinArr[0].fullcoinRate.toCoin.buyprice) {
      console.log('in if' +  this.rateCoinArr[0].fullcoinRate.fromCoin.name);
      console.log('قیمت تمام شده' +  this.rateCoinArr[0].priceafter);
      // console.log('بهتره از')
      // console.log(rateprice[0].fullcoinRate.toCoin.buyprice);
      // console.log(rateprice[0].fullcoinRate.toCoin.name);
      if ( this.rateCoinArr.length < 5) {
        console.log( this.rateCoinArr);

        this.bestprice( this.rateCoinArr[0].fullcoinRate.fromCoin.id);
      }else{
        this.rateCoinArr =[]
        return
      }
       this.rateCoinArr.push({
        coin:  this.rateCoinArr[0].fullcoinRate.fromCoin.name,
        endprice:  this.rateCoinArr[0].priceafter,
      });
      console.log( this.rateCoinArr);
      return;
    }
    console.log('out if' +  this.rateCoinArr[0].fullcoinRate.toCoin.name);
    console.log('تمومه');
    return;
  }
}
