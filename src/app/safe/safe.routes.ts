import { RouterModule, Routes    } from '@angular/router';
import { AuthGuard               } from 'src/app/core/guards/auth.guard';
import { SafeHomeComponent } from './home/safeHome.component';

const pagesRoutes:Routes = [
    { 
        path        : 'safe',
        component   : SafeHomeComponent,
        pathMatch   : 'full',
        canActivate : [AuthGuard],
        data        : {
            app: 'Safe'
        }
    }
];
export const SAFE_ROUTES = RouterModule.forRoot(pagesRoutes);