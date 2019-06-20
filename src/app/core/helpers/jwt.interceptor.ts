import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpHeaders,
} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor() {}
      intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       const user = JSON.parse(localStorage.getItem('user'));
       if (user) {
           let headers = new HttpHeaders().set('Content-Type', 'application/json');
           headers = headers.set('authorization', 'Bearer '
            + user.token + "|" + user.username);
           const cloned = request.clone({
               headers: headers
           });
           return next.handle(cloned);
       } else {
           return next.handle(request);
       }
    }
}
