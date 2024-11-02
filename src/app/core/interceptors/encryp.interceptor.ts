import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { catchError, throwError } from 'rxjs';
import { EncryptDecryptService } from '../services/EncryptDecrypt.Service';

export const EncryptDecryptAuthInterceptor: HttpInterceptorFn = (request, next) => {
  const encryptDecryptService = inject(EncryptDecryptService);

  // Realiza la encriptación del cuerpo de la solicitud si es necesario
  if (env.IsEncriptedOff == true) return next(request);
  if (request.method == 'GET') return next(request);

  const encryptedRequest = encryptDecryptService.encryptUsingAES256(request.body);
  const req =  request.clone({ body: {encrypdata : encryptedRequest}  });

  // Continúa con la solicitud encriptada
  return next(req).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        // Handle HTTP errors
        if (err.status === 401) {
          // Specific handling for unauthorized errors
          // console.error('Unauthorized request:', err);
          // You might trigger a re-authentication flow or redirect the user here
        } else {
          // Handle other HTTP error codes
          // console.error('HTTP error:', err);
        }
      } else {
        // Handle non-HTTP errors
        // console.error('An error occurred:', err);
      }

      // Re-throw the error to propagate it further
      return throwError(() => err);
    })
  );
}
