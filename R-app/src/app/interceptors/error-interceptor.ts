import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const route = inject(Router)
  return next(req).pipe(
    catchError(err => {
            if(err == 401){
              console.log('Authentification requise')
            }
            else if(err > 499){
              console.log('Erreur Serveur')
            }
            else{
              console.error('HTTP ERR:', req.method, req.url, err.status)
              route.navigate([''])
              console.log('Renvoyer a Home')
            }
            return throwError(() => err)
    }),
  )
}
