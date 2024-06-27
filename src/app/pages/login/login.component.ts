import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/Auth.service';
import { take } from 'rxjs';
import { CoinsService } from '../../core/services/coins.service';
import { CoinRateService } from '../../core/services/coin-rate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    CheckboxModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  valCheck: string[] = ['remember'];

  password!: string;

  constructor(
    private auth: AuthService,
    private router: Router,
    private serviceCoin: CoinsService,
    private coinRateService: CoinRateService
  ) {}
  ngOnInit() {
    this.loginForm = new FormGroup({
      mobile: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    this.auth
      .login(this.loginForm.value)
      .pipe(take(1))
      .subscribe({
        next: (resp) => {
          // this.serviceCoin.isLogin = true
          localStorage.setItem('access_token', resp.access_token);
          this.loginForm.reset();
          this.router.navigate(['/coins']);
          this.serviceCoin.getAll().subscribe({
            next: (resp) => {},
            error: (err) => {
              // this.isLogin=false
              this.router.navigate(['/login']);
            },
          });
          this.coinRateService.getAll().subscribe({
            next: (resp) => {
              
            },
            error: (err) => {
              this.router.navigate(['/login']);
            },
          });
        },
        error: (err) => {
          // console.log(err);
        },
      });
  }
}
