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
import { InputSwitchModule } from 'primeng/inputswitch';
import { CoinRateService } from '../../core/services/coin-rate.service';

@Component({
  selector: 'app-update-rate',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    FileUploadModule,
    InputSwitchModule,
    ImageModule,
  ],
  templateUrl: './update-rate.component.html',
  styleUrl: './update-rate.component.scss',
})
export class UpdateRateComponent implements OnInit {
  @Input() coinRate: any;
  isChecked = 0;
  constructor(private coinsRateService: CoinRateService) {}
  ngOnInit(): void {
    let israte = false;
    if (this.coinRate.isRate === 1) {
      israte = true;
    }
    this.addCoinFormGroup.patchValue({
      rate: this.coinRate.rate,
      israte,
    });
  }
  visible: boolean = false;
  addCoinFormGroup: FormGroup = new FormGroup({
    rate: new FormControl(null, [Validators.minLength(2), Validators.required]),
    israte: new FormControl(null, [Validators.required]),
  });
  onsubmit() {
    if (this.addCoinFormGroup.valid) {
      if (this.addCoinFormGroup.value.israte) {
        this.isChecked = 1;
      } else {
        this.isChecked = 0;
      }
      this.coinsRateService
        .update(
          this.coinRate.id,
          this.addCoinFormGroup.value.rate,
          this.isChecked
        )
        .subscribe({
          next: (resp) => {},
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
