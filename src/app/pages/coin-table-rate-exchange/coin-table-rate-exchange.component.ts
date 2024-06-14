import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { Coin } from '../../core/models/coin.model';
import { CoinsService } from '../../core/services/coins.service';
import { CoinRate } from '../../core/models/coin-rate.model';
import { CoinRateService } from '../../core/services/coin-rate.service';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CalculatorCoinExchangeService } from '../../core/services/calculator-coin-exchange.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ChipModule } from 'primeng/chip';
import { CurrencyPipe } from '@angular/common';
import { SelectButtonModule } from 'primeng/selectbutton';

interface CoinRateExchange {
  coin: Coin;
  amount: number;
}
@Component({
  selector: 'app-coin-table-rate-exchange',
  standalone: true,
  imports: [
    TableModule,
    RatingModule,
    TagModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    FormsModule,
    InputNumberModule,
    FloatLabelModule,
    ChipModule,
    CurrencyPipe,
    SelectButtonModule,
  ],
  templateUrl: './coin-table-rate-exchange.component.html',
  styleUrl: './coin-table-rate-exchange.component.scss',
})
export class CoinTableRateExchangeComponent {
  sellInput: number = 0;
  coinsCards: any = [];
  constructor(
    private coinsService: CoinsService,
    private coinRateService: CoinRateService,
    public readonly calculator: CalculatorCoinExchangeService
  ) {}
  coins: Coin[] = [];
  coinsRate: CoinRate[] = [];
  stateOptions: any[] = [
    { label: 'بگیریم', value: 1 },
    { label: 'بدهیم', value: 0 },
  ];
  value: string = 'off';
  expandedRows = {};

  ngOnInit(): void {
    this.coins = this.coinsService.getAll();
    this.coinsRate = this.coinRateService.getAll();
    this.coinsCards = this.coins.map((coin: Coin) => {
      return {
        ...coin,
        amount: 1,
        exchangeStatus: 0,
      };
    });
  }
  buyInputChenge(event: any, e: Coin) {
    this.coinsService.update(e.id, event.target.value, e.sellprice);
  }
  sellInputChenge(event: any, e: Coin) {
    this.coinsService.update(e.id, e.buyprice, event.target.value);
  }
}
