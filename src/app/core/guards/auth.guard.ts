import { Injectable                } from '@angular/core';
import { Router, CanActivate       } from '@angular/router';
import { ActivatedRouteSnapshot    } from '@angular/router';
import { RouterStateSnapshot       } from '@angular/router';
import { SecurityService           } from '../services/security.service';
import { Validate                  } from '../helpers/util.validator.';
import { GlobalService             } from 'src/app/core/globals/global.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router          : Router,
        private securityService : SecurityService,
		private globalService   : GlobalService
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
            this.globalService.setApp('Login');
        } else {
            permit =
            Validate(currentUser.apps.filter(app => app.name
                === route.data.app)[0]);
            if(permit){
                this.globalService.setApp(route.data.app);
            }
        }
        if (!permit) {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });

        }
        return permit;
    }
}
