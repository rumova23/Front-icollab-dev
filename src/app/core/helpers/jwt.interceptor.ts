import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SecurityService } from '../services/security.service';
const HEADERS = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept-Language': 'es-419,es;q=0.9',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*'
    })
};


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private securityService: SecurityService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const user = this.securityService.getCurrentUser();
        let headers = new HttpHeaders();
        //.set('Content-Type', 'application/json');
        headers.set('Access-Control-Allow-Origin', '*');
        if (user) {
            headers = headers.set('Authorization', 'Bearer '
                + user.token);
        }
        const cloned = request.clone({
            headers: headers
        });
        return next.handle(cloned);
    }
}
