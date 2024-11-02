import { inject } from '@angular/core';
import { Router, ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/seguridad/authentication.service';
import { SweetService } from '../services/sweet.service';

export const ForgotPasswordResolver: ResolveFn<Object> = async (route: ActivatedRouteSnapshot, _state) => {
  const authenticationService = inject(AuthenticationService);
  const sweet = inject(SweetService);
  const router = inject(Router);

  let uuid = route.params['uuid'];
  try {
    if(uuid === undefined) throw { error:'Access denied.'};
    //verificamos el uuid de registro y aprobamos el acceso
    //si el token no ha vencido y es valido
    let result: any = await authenticationService.approveChangePassword(uuid);
    if(result.changed){
      throw { error:'This token has already been used, try again.'};
    }
    return { correo : result.correo };
  } catch(err){
    //notificamos al usuario que algo salio mal
    sweet.showSwalError("Sorry!", err.error);
    router.navigate(["/login"]);
    return {};
  }
}
