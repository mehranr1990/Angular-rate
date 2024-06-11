import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { Coin } from '../../core/models/coin.model';
import { CoinsService } from '../../core/services/coins.service';
@Component({
  selector: 'app-coin-table-rate-exchange',
  standalone: true,
  imports: [TableModule, RatingModule, TagModule, ButtonModule],
  templateUrl: './coin-table-rate-exchange.component.html',
  styleUrl: './coin-table-rate-exchange.component.scss'
})
export class CoinTableRateExchangeComponent {
  constructor(private coinsService:CoinsService){}
  coins:Coin[]=[]
  

  expandedRows = {};

  ngOnInit(): void {
    this.coins =this.coinsService.getAll()
  }

  onRowExpand(event: TableRowExpandEvent) {}

  onRowCollapse(event: TableRowCollapseEvent) {}
}
