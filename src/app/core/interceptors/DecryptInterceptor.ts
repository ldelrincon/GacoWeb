import { inject } from '@angular/core';
import { HttpEvent, HttpResponse, HttpErrorResponse, HttpInterceptorFn,
} from '@angular/common/http';
import { catchError, map, throwError} from 'rxjs';
import { EncryptDecryptService } from '../services/EncryptDecrypt.Service';
import { environment as env } from 'src/environments/environment';

export const DecryptInterceptor: HttpInterceptorFn = (req, next) => {
  const encryptDecryptService = inject(EncryptDecryptService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.error && error.error.response) {
        const decryptedBody = encryptDecryptService.decryptMsg(error.error.response);
        const modifiedError = new HttpErrorResponse({
          error: decryptedBody,
          headers: error.headers,
          status: error.status,
          statusText: error.statusText,
          url: error.url
        });

        // Modificar la respuesta en el objeto de error
       // modifiedError.error = decryptedBody;

        // Devolver el error modificado
        return throwError(() => modifiedError);
      }

      // Si no se necesita modificar la respuesta, devolver el error original
      return throwError(() => error);
    }),
    map((event: HttpEvent<any>) => {

    if (event instanceof HttpResponse) {
      if (env.IsEncriptedOff == true) return event
      if (event.url.includes('api/auth/logout')) return event.clone({ body: "" })
      if (event.url.includes('api/auth/forgotPassword')) return event.clone({ body: "" })
      if (event.url.includes('api/auth/ChangePassword')) return event.clone({ body: "" })

      // Desencriptar el cuerpo de la respuesta aquí
      const decryptedBody = encryptDecryptService.decryptUsingAES256(event.body.response);
      return event.clone({ body: decryptedBody });
    }
    return event;
  }));
}
