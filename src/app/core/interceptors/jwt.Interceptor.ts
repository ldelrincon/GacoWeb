import { inject, Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthenticationService } from '../services/seguridad/authentication.service';
import { environment } from 'src/environments/environment';

export const JwtInterceptor: HttpInterceptorFn = (request, next) => {
  const authenticationService = inject(AuthenticationService);
  const user = authenticationService.userValue;
  const isLoggedIn = user && user.jwtToken;
  //add token only origins
  const isApiUrl = request.url.startsWith(environment.apiUrlCore);
  // const isApiUrlDoc = request.url.startsWith(environment.serverUrlDocs);
  const isApiUrlCatGeograficos = request.url.startsWith(environment.apiUrlCatalogoGeograficos);
  //add references project
  request = request.clone({
    setHeaders: { IdTipoProyecto: '2' }
  });
  // only add token if is login

  if (isLoggedIn && (isApiUrl || isApiUrlCatGeograficos))  {

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${user.jwtToken}`,
      }
    });
  }

  //return next(request);
  return next(request).pipe(
    catchError((err: any) => {
      // TODO: handle error
      if (err instanceof HttpErrorResponse) {
        // Handle HTTP errors
        if ([401, 403].includes(err.status) && authenticationService.userValue) {
          // auto logout if 401 or 403 response returned from api
          authenticationService.$logout();
        }

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
  );;
}

//Att:javier valenzuela
// @Injectable()
// export class JwtInterceptor implements HttpInterceptor {
//   constructor(private authenticationService: AuthenticationService) { }

//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     // add auth header with jwt if user is logged in and request is to the api url
//     const user = this.authenticationService.userValue;
//     const isLoggedIn = user && user.jwtToken;
//     //add token only origins
//     const isApiUrl = request.url.startsWith(environment.apiUrlCore);
//     // const isApiUrlDoc = request.url.startsWith(environment.serverUrlDocs);
//     const isApiUrlCatGeograficos = request.url.startsWith(environment.apiUrlCatalogoGeograficos);
//     //add references project
//     request = request.clone({
//       setHeaders: { IdTipoProyecto: '2' }
//     });
//     // only add token if is login

//     if (isLoggedIn && (isApiUrl || isApiUrlCatGeograficos))  {

//       request = request.clone({
//         setHeaders: {
//           Authorization: `Bearer ${user.jwtToken}`,
//         }
//       });
//     }

//     return next.handle(request);

//     // return next(authReq).pipe(
//     //   catchError((err: any) => {
//     //     if (err instanceof HttpErrorResponse) {
//     //       // Handle HTTP errors
//     //       if (err.status === 401) {
//     //         // Specific handling for unauthorized errors
//     //         console.error('Unauthorized request:', err);
//     //         // You might trigger a re-authentication flow or redirect the user here
//     //       } else {
//     //         // Handle other HTTP error codes
//     //         console.error('HTTP error:', err);
//     //       }
//     //     } else {
//     //       // Handle non-HTTP errors
//     //       console.error('An error occurred:', err);
//     //     }

//     //     // Re-throw the error to propagate it further
//     //     return throwError(() => err);
//     //   })
//     // );;
//   }

// }
