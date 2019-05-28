import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SecurityService } from '../services/security.service';
import { Router } from '@angular/router';
import { Validate } from './util.validator.';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private securityService: SecurityService,
        private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    console.log('http error!');
                    this.router.navigate(['/login']);
                }
            }
            console.log(err);
            console.log(JSON.stringify(err));
            //console.log(err);
            const error = (Validate(err.error)) ? err.error.message :
             Validate(err.statusText) ? err.statusText: "Error Genérico";
            return throwError(error);
        }))
    }
}