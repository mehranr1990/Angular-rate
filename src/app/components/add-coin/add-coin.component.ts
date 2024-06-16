import { Component } from '@angular/core';
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
import * as uuid from 'uuid';
import { CoinsService } from '../../core/services/coins.service';
import { ImageModule } from 'primeng/image';
import { CoinRateService } from '../../core/services/coin-rate.service';

@Component({
  selector: 'app-add-coin',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    FileUploadModule,
    ImageModule,
  ],
  templateUrl: './add-coin.component.html',
  styleUrl: './add-coin.component.scss',
})
export class AddCoinComponent {
  constructor(
    private coinsService: CoinsService,
    private coinsRateService: CoinRateService
  ) {}

  visible: boolean = false;

  addCoinFormGroup: FormGroup = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    name: new FormControl(null, [Validators.minLength(2), Validators.required]),
    image: new FormControl(null, [Validators.required]),
  });

  get imageUploaded(): boolean {
    return !!this.addCoinFormGroup.value.image;
  }

  onUpload(event: any) {
    const file = event.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.addCoinFormGroup.patchValue({
        image: reader.result?.toString(),
      });
    };
  }

  onsubmit() {
    this.addCoinFormGroup.patchValue({ id: uuid.v4() });
    if (this.addCoinFormGroup.valid) {
      this.coinsService.create(this.addCoinFormGroup.value);
      this.toggleDialog();
    } else {
      console.error('form is not valid !');
    }
  }

  toggleDialog() {
    this.addCoinFormGroup.reset();
    // this.coinsRateService.create();
    this.visible = !this.visible;
  }
}
