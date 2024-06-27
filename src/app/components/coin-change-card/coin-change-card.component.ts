import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CardModule } from 'primeng/card';
import { BestPriceModalComponent } from '../../components/best-price-modal/best-price-modal.component';
import { CoinsService } from '../../core/services/coins.service';
import { CalculatorCoinExchangeService } from '../../core/services/calculator-coin-exchange.service';
import { Coin } from '../../core/models/coin.model';
import { CoinRate } from '../../core/models/coin-rate.model';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CoinRateService } from '../../core/services/coin-rate.service';
import { UpdatePriceComponent } from '../update-price/update-price.component';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { DividerModule } from 'primeng/divider';
import { FieldsetModule } from 'primeng/fieldset';
import { CurrencyPipe } from '@angular/common';

// interface CoinRateExchange {
//   coin: Coin;
//   amount: number;
//   exchangeStatus: number;
// }
@Component({
  selector: 'app-coin-change-card',
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule,
    FloatLabelModule,
    CardModule,
    BestPriceModalComponent,
    SelectButtonModule,
    UpdatePriceComponent,
    DividerModule,
    InputGroupAddonModule,
    InputGroupModule,
    FieldsetModule,
    CurrencyPipe,
  ],
  templateUrl: './coin-change-card.component.html',
  styleUrl: './coin-change-card.component.scss',
})
export class CoinChangeCardComponent implements OnInit {
  @Input({ alias: 'coin', required: true }) coin: any;

  amount: number;
  exchangeStatus: number;

  @Output('onAmount') onAmount: EventEmitter<{}> = new EventEmitter<{}>();
  @Output('onExchangeStatus') onExchangeStatus: EventEmitter<{}> =
    new EventEmitter<{}>();

  constructor(
    private coinsService: CoinsService,
    public readonly calculator: CalculatorCoinExchangeService
  ) {}
  coinsRate: CoinRate[] = [];
  stateOptions: any[] = [
    { label: 'بگیریم', value: 1 },
    { label: 'بدهیم', value: 0 },
  ];
  value: string = 'off';
  sellInput: number = 0;
  calcutebestpriceforthiscoin(e: any) {
    this.calculator.bestprice(e);
  }
  ngOnInit() {
    console.log(this.coin);
    this.amount = this.coin.amount;
    this.exchangeStatus = this.coin.exchangeStatus;
  }

  buyInputChenge() {
    this.coinsService.update(
      this.coin.id,
      this.coin.buyPrice,
      this.coin.sellPrice
    );
    // if (this.stateOptions) {
    //   for (let index = 0; index < this.coinsRate.length; index++) {
    //     if (this.coinsRate[index].fromCoin.id === this.coin.id) {
    //       this.coinsRate[index].fromCoin.buyPrice = this.coin.buyPrice;
    //     }
    //   }
    // } else {
    //   for (let index = 0; index < this.coinsRate.length; index++) {
    //     if (this.coinsRate[index].toCoin.id === this.coin.id) {
    //       this.coinsRate[index].toCoin.buyPrice = this.coin.buyPrice;
    //     }
    //   }
    // }
  }
  sellInputChenge() {
    this.coinsService.update(
      this.coin.id,
      +this.coin.buyPrice,
      this.coin.sellPrice
    );
    // if (this.stateOptions) {
    //   for (let index = 0; index < this.coinsRate.length; index++) {
    //     if (this.coinsRate[index].fromCoin.id === e.id) {
    //       this.coinsRate[index].fromCoin.sellprice = event.target.value;
    //     }
    //   }
    // } else {
    //   for (let index = 0; index < this.coinsRate.length; index++) {
    //     if (this.coinsRate[index].toCoin.id === e.id) {
    //       this.coinsRate[index].toCoin.sellprice = event.target.value;
    //     }
    //   }
    // }
  }

  onAmountChange() {
    this.onAmount.emit({ amount: this.amount, coin: this.coin });
  }
  onExchangeStatusChange() {
    this.onExchangeStatus.emit({
      exchangeStatus: this.exchangeStatus,
      coin: this.coin,
    });
  }
}
