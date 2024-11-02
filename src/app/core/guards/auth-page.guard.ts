import { inject } from '@angular/core';
import { Router, CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/seguridad/authentication.service';

//Att:luis rendon
export const AuthGuard: CanActivateFn = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
) => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);

  if (authenticationService.isLogin) {
    // logged in so return true
    return true;
  } else {
    router.navigate(["/login"]);
    return false;
  }
};
