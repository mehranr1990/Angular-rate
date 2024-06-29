import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CoinsService } from '../../core/services/coins.service';
import { Coin } from '../../core/models/coin.model';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-table-coins',
  standalone: true,
  imports: [TableModule, ButtonModule, DialogModule],
  templateUrl: './table-coins.component.html',
  styleUrl: './table-coins.component.scss',
})
export class TableCoinsComponent {
  constructor(private coinsService: CoinsService) {}
  coins: Coin[] = [];
  selectedCoin:any=[]
  visible: boolean = false;
  ngOnInit(): void {
    // this.coinsService.getAll();
    this.coinsService.coins.subscribe({
      next: (coins: Coin[]) => {
        this.coins = coins;
      },
    });
  }
  deleterow() {
    this.coinsService.deleteCoin(this.selectedCoin.id).subscribe({ next: (resp) => {} });
  }
  toggleDialog(e:any) {
    this.visible = !this.visible;
    this.selectedCoin = e
  }
}
