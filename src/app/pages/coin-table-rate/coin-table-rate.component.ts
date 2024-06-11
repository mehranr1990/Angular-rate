import { Component, OnInit } from '@angular/core';

import { TableModule } from 'primeng/table';
import { CoinsService } from '../../core/services/coins.service';
import { Coin } from '../../core/models/coin.model';

@Component({
  selector: 'app-coin-table-rate',
  standalone: true,
  imports: [TableModule],
  templateUrl: './coin-table-rate.component.html',
  styleUrl: './coin-table-rate.component.scss',
})
export class CoinTableRateComponent implements OnInit {
  constructor(private coinsService: CoinsService) {}
  coins: Coin[] = [];

  ngOnInit(): void {
    this.coins = this.coinsService.get();
  }
}
