import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './Auth.service';

export const AuthGuardService: CanActivateFn = async () => {
  if (inject(AuthService).islogin) {
    return true;
  } else {
    inject(Router).navigate(['/login']);
    return false;
  }
};

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuardService implements CanActivate {

//   constructor(private Authservice:AuthService, private router:Router) { }
//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> |boolean|Observable<boolean>{

//     if (this.Authservice.user) {
//       return true
//     }else{
//       this.router.navigate(['/login'])
//       return false
//     }

//     // throw new Error('Method not implemented.');
//   }
// }
