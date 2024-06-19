import { Injectable } from '@angular/core';
import { CoinRateService } from './coin-rate.service';
import { getObservableCoinRate } from './get-observable-coinRate';

@Injectable({
  providedIn: 'root',
})
export class CalculatorCoinExchangeService {
  constructor(
    private coinRateService: CoinRateService,
    private observableCoinRate: getObservableCoinRate
  ) {}
  private besstprice: any = [];
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
    return Number((price * amount).toFixed(4)).toLocaleString('en-US');
  }

  rateCoinfinal: any;
  public bestprice(coinId: string) {
    let coinRateTable: any = [];
    const rateCoinArr: any = [];
    // this.coinRateService.getAll();
    this.observableCoinRate.getCoinrate().subscribe({
      next: (coinRate) => {
        coinRateTable = coinRate;
      },
    });
    const coinrate = coinRateTable.filter(
      (cointable: any) => coinId === cointable.toCoin.id
    );
    for (let index = 0; index < coinrate.length; index++) {
      if (coinrate[index].israte) {
        rateCoinArr.push({
          priceafter: Number(
            (1 / (1 + coinrate[index].rate / 100)) *
              coinrate[index].fromCoin.buyprice
          ),
          fullcoinRate: coinrate[index],
        });
      } else {
        if (coinrate[index].rate > 0) {
          rateCoinArr.push({
            priceafter: Number(
              (1 / +coinrate[index].rate) * coinrate[index].fromCoin.buyprice
            ),
            fullcoinRate: coinrate[index],
          });
        } else {
          rateCoinArr.push({
            priceafter: Number(
              -1 * coinrate[index].rate * coinrate[index].fromCoin.buyprice
            ),
            fullcoinRate: coinrate[index],
          });
        }
      }
    }
    rateCoinArr.sort((a: any, b: any) => a.priceafter - b.priceafter);
    if (
      rateCoinArr[0].priceafter < rateCoinArr[0].fullcoinRate.toCoin.buyprice
    ) {
      if (this.besstprice.length < rateCoinArr.length) {
        this.besstprice = [...this.besstprice, rateCoinArr[0]];
        // this.besstprice.push(rateCoinArr[0]);
        this.bestprice(rateCoinArr[0].fullcoinRate.fromCoin.id);
      }
    } else {
      this.rateCoinfinal = [];
      console.log('تو لوپه');
    }
    if (this.besstprice.length > 0) {
      this.rateCoinfinal = [...this.besstprice];
    }
    this.besstprice = [];
    return this.rateCoinfinal;
  }
}
