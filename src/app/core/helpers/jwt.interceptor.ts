import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/Auth.service';

@Injectable({
  providedIn: 'root',
})
export class jwtInterceptor implements HttpInterceptor {
  constructor(private Authservice: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    const idToken = localStorage.getItem('access_token');
    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + idToken),
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
