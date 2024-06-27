import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<any>(null);
  constructor(private api: ApiService) {}
  islogin = false
  login(body: { mobile: string; password: string }) {
    return this.api.post('auth/login', body).pipe(
      tap((respData: any) => {
        this.handleAuthentication(respData.mobile, respData.token);
      })
    );
  }
  private handleAuthentication(mobile: string, token: string) {
    const user = new User(mobile, token);
    this.islogin = true
    this.user.next(user);
  }
  jwtChecked(){
    if(localStorage.getItem('access_token')){
      this.islogin=true
    }
  }
}
