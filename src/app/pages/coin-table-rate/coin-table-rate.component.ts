import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CoinRateService } from '../../core/services/coin-rate.service';
import { CoinRate } from '../../core/models/coin-rate.model';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';

@Component({
  selector: 'app-coin-table-rate',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    InputSwitchModule,
  ],
  templateUrl: './coin-table-rate.component.html',
  styleUrl: './coin-table-rate.component.scss',
})
export class CoinTableRateComponent implements OnInit {
  constructor(private coinRateService: CoinRateService) {}
  coinsRate: CoinRate[] = [];
  rateInput: number = 0;
  isRateChecked :boolean =true
  ngOnInit(): void {
    this.coinsRate = this.coinRateService.getAll();
  }
  onfocus(e:CoinRate){
    this.rateInput = e.rate 
  }
  onRateEdit(e: CoinRate) {
    this.coinRateService.update(e.id, this.rateInput, e.israte);
  }
  onisRateEdit(e: CoinRate) {    
    this.coinRateService.update(e.id, e.rate, e.israte);
  }
}
