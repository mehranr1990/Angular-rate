import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculatorCoinExchangeService {
  constructor() {}

  public calculateCoinToCoin(isRate: boolean, amount: number, rate: number) {
    if (isRate) {
      return Number((+amount + (+rate / 100) * +amount).toFixed(4)).toLocaleString('en-US')
    } else {
      if (+rate > 0) {
        return Number((+amount * +rate).toFixed(4)).toLocaleString('en-US')
      } else {
        return Number(((-1 * +amount) / +rate).toFixed(4)).toLocaleString('en-US')
      }
    }
  }
  public calculateCoinprice(isRate: boolean, buyprice: number, rate: number) {
    if (isRate) {
      return Number((+buyprice / (1 + rate / 100)).toFixed(4)).toLocaleString('en-US')
    } else {
      if (+rate > 0) {
        return Number((+buyprice / +rate).toFixed(4)).toLocaleString('en-US')
      } else {
        return Number((-1 * +buyprice * +rate).toFixed(4)).toLocaleString('en-US')
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
      return Number(((1 / (1 + rate / 100)) * amount).toFixed(4)).toLocaleString('en-US')
    } else {
      if (+rate > 0) {
        return Number(((1 / +rate) * amount).toFixed(4)).toLocaleString('en-US')
      } else {
        return Number((-1 * rate * amount).toFixed(4)).toLocaleString('en-US')
      }
    }
  }
  public calculateCoinprice2(isRate: boolean, buyprice: number, rate: number) {
    if (isRate) {
      return Number(((1 / (1 + rate / 100)) * buyprice).toFixed(4)).toLocaleString('en-US')
    } else {
      if (+rate > 0) {
        return Number(((1 / +rate) * buyprice).toFixed(4)).toLocaleString('en-US')
      } else {
        return Number((-1 * rate * buyprice).toFixed(4)).toLocaleString('en-US')
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
      return Number(((1 / (1 + rate / 100)) * amount * buyprice).toFixed(4)).toLocaleString('en-US')
    } else {
      if (+rate > 0) {
        return Number(((1 / +rate) * amount * buyprice).toFixed(4)).toLocaleString('en-US')
      } else {
        return Number((-1 * rate * amount * buyprice).toFixed(4)).toLocaleString('en-US')
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
      return Number(((amount*sellprice)-((1 / (1 + rate / 100)) * amount * buyprice)).toFixed(4)).toLocaleString('en-US')
    } else {
      if (+rate > 0) {
        return Number(((amount*sellprice)-((1 / +rate) * amount * buyprice)).toFixed(4)).toLocaleString('en-US')
      } else {
        return Number((((amount*sellprice)-(-1 * rate * amount * buyprice)).toFixed(4))).toLocaleString('en-US')
      }
    }
  }
  public multiple(price:number,amount:number){
return price*amount
  }
}
