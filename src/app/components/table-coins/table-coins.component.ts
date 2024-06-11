import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CoinsService } from '../../core/services/coins.service';
import { Coin } from '../../core/models/coin.model';


@Component({
  selector: 'app-table-coins',
  standalone: true,
  imports: [TableModule],
  templateUrl: './table-coins.component.html',
  styleUrl: './table-coins.component.scss'
})
export class TableCoinsComponent  {
  constructor(private coinsService: CoinsService) {}
  coins:Coin[]=[]
  
  ngOnInit(): void {
    this.coins =this.coinsService.getAll()
  }
  
  }

