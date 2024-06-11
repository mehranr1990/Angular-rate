import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CoinsService } from '../../core/services/coins.service';
import { Coin } from '../../core/models/coin.model';
import { CoinRateService } from '../../core/services/coin-rate.service';
import { CoinRate } from '../../core/models/coin-rate.model';

@Component({
  selector: 'app-coin-table-rate',
  standalone: true,
  imports: [TableModule,ButtonModule],
  templateUrl: './coin-table-rate.component.html',
  styleUrl: './coin-table-rate.component.scss',
})
export class CoinTableRateComponent implements OnInit {
  constructor(private coinsService: CoinsService ,private coinRateService:CoinRateService) {}
  coins: CoinRate[] = [];

  ngOnInit(): void {
    this.coins = this.coinRateService.getAll();
    console.log(this.coins);
    
  }
  toggleDialog(){
    this.coinRateService.create()
    
  }
}
