import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';
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

interface CoinRateExchange {
  Coin: CoinRate;
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
    InputNumberModule
  ],
  templateUrl: './coin-table-rate-exchange.component.html',
  styleUrl: './coin-table-rate-exchange.component.scss',
})
export class CoinTableRateExchangeComponent {
  amountInput: number = 10;
  sellInput: number = 0;
  constructor(
    private coinsService: CoinsService,
    private coinRateService: CoinRateService,
    public readonly calculator : CalculatorCoinExchangeService
  ) {}
  coins: Coin[] = [];
  coinsRate: CoinRate[] = [];
  coinsRateExchange: any[] = [];

  expandedRows = {};

  ngOnInit(): void {
    this.coins = this.coinsService.getAll();
    this.coinsRate = this.coinRateService.getAll();

    // for (let index = 0; index < this.coins.length; index++) {
    //   const rateCoin = this.coinsRate.filter(
    //     (coinRate) => coinRate.fromCoin.id == this.coins[index].id
    //   );
      
    //   this.coinsRateExchange = [...this.coinsRateExchange,{"parent":this.coins[index],"child":{rateCoin}}]
    //   }
  }
  buyInputChenge(event: any, e: Coin) {
    this.coinsService.update(e.id, event.target.value, e.sellprice);
  }
  sellInputChenge(event: any, e: Coin) {
    this.coinsService.update(e.id, e.buyprice, event.target.value);
  }
  onRowExpand(event: TableRowExpandEvent) {}

  onRowCollapse(event: TableRowCollapseEvent) {}
}
