import { HttpInterceptorFn } from '@angular/common/http'
import { catchError, finalize, tap, throwError } from "rxjs"

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
    const t0 = Date.now()
    return next(req).pipe( //pipe permet de concatener le tap, le catcherror, et le finalize. Et d'appliquer les traitements sur la req
        tap(() => console.log('HTTP OK:', req.method, req.url)),
        catchError(err => {
            console.error('HTTP ERR:', req.method, req.url, err.status)
            return throwError(() => err)
        }),
        finalize(() => console.log('HTTP', req.method, req.url,
            'durée=', Date.now() - t0, 'ms')
        )
    )
}