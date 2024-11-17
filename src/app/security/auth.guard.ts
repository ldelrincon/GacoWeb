import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccesoService } from '../services/acceso.service';
import { catchError, map, of } from 'rxjs';

export const AuthGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem("token") || "";
  const router = inject(Router);

  const accesoService = inject(AccesoService);

  if (token != "") {
    return accesoService.ValidarToken(token).pipe(
      map(data => {
        if (data.success) {
          return true;
        }
        else {
          router.navigate([""]);
          return false;
        }
      }),
      catchError(error => {
        router.navigate([""]);
        return of(false);
      })
    );
  }
  else {
    // router.navigateByUrl("");
    // return false;
    const url = router.createUrlTree([""]);
    return url;
  }
};
