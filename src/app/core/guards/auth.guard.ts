import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SecurityService } from '../services/security.service';
import { Validate } from '../helpers/util.validator.';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private securityService: SecurityService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.securityService.getCurrentUser();
        if (!Validate(currentUser)) {
            return false;
        }
        if (!Validate(route.data.app)) {
            return false;
        }
        let permit = false;
        if (route.data.app === 'Home') {
            permit = !permit;
        } else {
            permit =
            Validate(currentUser.apps.filter(app => app.name
                === route.data.app)[0]);
        }
        if (!permit) {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });

        }
        return permit;
    }
}
