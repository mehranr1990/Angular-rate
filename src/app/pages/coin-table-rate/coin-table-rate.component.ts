import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CoinRateService } from '../../core/services/coin-rate.service';
import { CoinRate } from '../../core/models/coin-rate.model';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { getObservableCoinRate } from '../../core/services/get-observable-coinRate';

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
  constructor(private coinRateService: CoinRateService, private observableCoinRate: getObservableCoinRate) {}
  coinsRate: CoinRate[] = [];
  rateInput: number = 0;
  isRateChecked :boolean =true
  ngOnInit(): void {
    this.coinsRate = []
    // this.coinRateService.getAll();
    this.observableCoinRate.getCoinrate().subscribe({
      next:(coinRate)=>{
      this.coinsRate = coinRate
    }
  })
  }
  onfocus(e:CoinRate){
    this.rateInput = e.rate 
  }
  onRateEdit(e: CoinRate) {
    console.log(this.rateInput);
    console.log(e.id);
    
    this.coinRateService.update(e.id, this.rateInput, e.isRate);
  }
  onisRateEdit(e: CoinRate) {    
    this.coinRateService.update(e.id, e.rate, e.isRate);
  }
}
