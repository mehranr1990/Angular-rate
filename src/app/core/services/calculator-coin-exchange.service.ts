import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculatorCoinExchangeService {
  constructor() {}

  public calculateCoinToCoin(isRate: boolean, amount: number, rate: number) {
    if (isRate) { 
      return Number((amount + (+rate / 100) * amount).toFixed(4));
    } else {
      if (rate > 0) {
        return Number((amount * rate).toFixed(4));
      } else {
        return Number((-1 * amount / rate).toFixed(4));
      }
    }
  }
  public calculateCoinprice(
    isRate: boolean,
    buyprice: number,
    amount: number,
    rate: number
  ) {
    if (isRate) {
      return Number((buyprice / (amount + rate / 100)).toFixed(4));
    } else {
      if (rate > 0) {
        return Number((buyprice / rate).toFixed(4));
      } else {
        return Number((-1 * buyprice * rate).toFixed(4));
      }
    }
  }
}
