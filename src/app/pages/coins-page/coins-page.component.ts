import { Component } from '@angular/core';
import { TableCoinsComponent } from '../../components/table-coins/table-coins.component';
import { AddCoinComponent } from '../../components/add-coin/add-coin.component';

@Component({
  selector: 'app-coins-page',
  standalone: true,
  imports: [TableCoinsComponent,AddCoinComponent],
  templateUrl: './coins-page.component.html',
  styleUrl: './coins-page.component.scss'
})
export class CoinsPageComponent {

}
