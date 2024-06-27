import { Component, Input } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalculatorCoinExchangeService } from '../../core/services/calculator-coin-exchange.service';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-best-price-modal',
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextModule, TooltipModule],
  templateUrl: './best-price-modal.component.html',
  styleUrl: './best-price-modal.component.scss',
})
export class BestPriceModalComponent {
  constructor(private calculator: CalculatorCoinExchangeService) {}
  visible: boolean = false;
  position: string = 'center';
  name1 :string=''
  array:any[]=[]
  @Input() id: string = '';
  showDialog(position: string) {
    this.array =  this.calculator.bestprice(this.id);
    // console.log(this.array);
    this.position = position;
    this.visible = true;
  }
}
