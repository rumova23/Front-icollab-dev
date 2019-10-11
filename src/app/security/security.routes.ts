import { RouterModule, Routes    } from '@angular/router';
import { AuthGuard               } from 'src/app/core/guards/auth.guard';
import { SecurityHomeComponent   } from './home/securityHome.component';

const pagesRoutes:Routes = [
    { 
        path        : 'security',
        component   : SecurityHomeComponent,
        pathMatch   : 'full',
        canActivate : [AuthGuard],
        data        : {
            app: 'Security'
        }
    }
];
export const SECURITY_ROUTES = RouterModule.forRoot(pagesRoutes);