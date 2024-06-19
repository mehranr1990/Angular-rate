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
import { FloatLabelModule } from 'primeng/floatlabel';
import { BestPriceModalComponent } from '../../components/best-price-modal/best-price-modal.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { ChipModule } from 'primeng/chip';
import { CurrencyPipe } from '@angular/common';
import { SelectButtonModule } from 'primeng/selectbutton';
import {CoinChangeCardComponent} from '../../components/coin-change-card/coin-change-card.component'
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
    BestPriceModalComponent,
    CoinChangeCardComponent
  ],
  templateUrl: './coin-table-rate-exchange.component.html',
  styleUrl: './coin-table-rate-exchange.component.scss',
})
export class CoinTableRateExchangeComponent {
  coinsCards: any[] = [];
  coins: Coin[] = [];
  coinsRate: CoinRate[] = [];
  constructor(
    private coinsService: CoinsService,
    private coinRateService: CoinRateService,
    public readonly calculator: CalculatorCoinExchangeService
    
  ) {}

  expandedRows = {};

  ngOnInit(): void {
    this.coinsService.getAll();
    this.coinsService.coins.subscribe({
      next: (coins) => {
        this.coins = coins;
      },
    });
    this.coinsRate = this.coinRateService.getAll();
    this.coinsCards = this.coins.map((coin: Coin) => {
      return {
        ...coin,
        amount: 1,
        exchangeStatus: 0,
      };
    });
  }
}
