import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CoinsService } from '../../core/services/coins.service';
import { Coin } from '../../core/models/coin.model';

@Component({
  selector: 'app-table-coins',
  standalone: true,
  imports: [TableModule,ButtonModule],
  templateUrl: './table-coins.component.html',
  styleUrl: './table-coins.component.scss',
})
export class TableCoinsComponent {
  constructor(private coinsService: CoinsService) {}
  coins: Coin[] = [];

  ngOnInit(): void {
    // this.coinsService.getAll();
    this.coinsService.coins.subscribe({
      next: (coins: Coin[]) => {
        this.coins = coins;
      },
    });
  }
  deleterow(e:any){
    this.coinsService.deleteCoin(e).subscribe({next:(resp)=>{
    }})
    
  }
}
