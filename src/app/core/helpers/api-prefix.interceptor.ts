import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpHeaders,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { SecurityService } from '../services/security.service';
import { Router } from '@angular/router';
import { EventService } from '../services/event.service';
import { EventMessage } from '../models/EventMessage';
import { EventBlocked } from '../models/EventBlocked';

@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {

    constructor(
        private securityService: SecurityService,
        private router: Router,
        public eventService: EventService
    ) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.eventService.sendApp(new EventMessage(1, new EventBlocked(1, '')));

        const user = this.securityService.getCurrentUser();

        if (user) {
            request = request.clone({
                setHeaders: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${user.token}`
                    //Authorization: currentUser.token
                }
            });
        }

        return next.handle(request).pipe(
            catchError((error: any) => {
                if (error instanceof HttpErrorResponse) {
                    if (error.status === 401) {
                        this.router.navigateByUrl('/login')
                    }
                    return throwError(error);
                }
            }),
            finalize(() => {
                this.eventService.sendApp(new EventMessage(1, new EventBlocked(2, null)));
            })
        );
    }
}
