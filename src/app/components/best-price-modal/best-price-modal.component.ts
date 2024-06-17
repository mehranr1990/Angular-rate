import { Component, Input, OnInit,  } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-best-price-modal',
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextModule,],
  templateUrl: './best-price-modal.component.html',
  styleUrl: './best-price-modal.component.scss'
})
export class BestPriceModalComponent implements OnInit {
  visible: boolean = false;
  position: string = 'center';
  @Input() id :string='' 
  showDialog(position: string) {
      this.position = position; 
      this.visible = true;
  }
  ngOnInit() {
    console.log(this.id);
    
  }
}
