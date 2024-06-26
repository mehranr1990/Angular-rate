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

  constructor(private auth:AuthService , private router:Router, private serviceCoin:CoinsService) {}
  ngOnInit() {
    this.loginForm = new FormGroup({
      mobile: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }
  onSubmit() {
    console.log(this.loginForm.value);
    
    this.auth.login(this.loginForm.value).pipe(take(1)).subscribe({
      next: (resp) => {
        console.log(resp);
        // this.serviceCoin.isLogin = true
        localStorage.setItem('access_token',resp.access_token)
        this.loginForm.reset()
        this.router.navigate(['/coins'])
      },
      error: (err) => {
        // console.log(err);
      },
    });
  }
}
