import { inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn } from '@angular/router';
import { AuthenticationService } from '../services';

export const AuthOTPGuard: CanActivateFn = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
) => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);

  const objLogin = authenticationService.getObjLogin()

  const cuenta = objLogin.dataCuenta != '' ? true : false;
  const pass = objLogin.dataPass != '' ? true : false;

  if (cuenta || pass) {
    // logged in so return true
    return true;
  } else {
    router.navigate(["/login"]);
    return false;
  }
};

//Att:javier valenzuela
// @Injectable({ providedIn: 'root' })
// export class AuthOTPGuard implements CanActivate {
//     constructor(
//         private router: Router,
//         private authenticationService: AuthenticationService
//     ) { }

//     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//         const objLogin = this.authenticationService.getObjLogin()

//         const cuenta = objLogin.dataCuenta != '' ? true : false;
//         const pass = objLogin.dataPass != '' ? true : false;

//         if (cuenta || pass) {
//             // logged in so return true
//             return true;
//         } else {
//             this.router.navigate(["/auth"]);
//             return false;

//         }
//     }
// }
