import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { CoinsService } from '../../core/services/coins.service';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-update-price',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    FileUploadModule,
    ImageModule,
    TooltipModule
  ],
  templateUrl: './update-price.component.html',
  styleUrl: './update-price.component.scss',
})
export class UpdatePriceComponent implements OnInit {
  @Input() coin: any;

  constructor(private coinsService: CoinsService) {}
  ngOnInit(): void {
    this.addCoinFormGroup.patchValue({
      buyPrice: this.coin.buyPrice,
      sellPrice: this.coin.sellPrice,
    });
  }
  visible: boolean = false;

  addCoinFormGroup: FormGroup = new FormGroup({
    buyPrice: new FormControl(null, [
      Validators.minLength(2),
      Validators.required,
    ]),
    sellPrice: new FormControl(null, [
      Validators.minLength(2),
      Validators.required,
    ]),
  });
  onsubmit() {
    if (this.addCoinFormGroup.valid) {
      this.coinsService
        .update(
          this.coin.id,
          this.addCoinFormGroup.value.buyPrice,
          this.addCoinFormGroup.value.sellPrice
        )
        .subscribe({
          next: (resp) => {
            console.log(resp);
          },
        });
      this.toggleDialog();
    } else {
      console.error('form is not valid !');
    }
  }
  toggleDialog() {
    // this.addCoinFormGroup.reset();
    this.visible = !this.visible;
  }
}
