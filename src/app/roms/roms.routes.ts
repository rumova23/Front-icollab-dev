import { RouterModule, Routes    } from '@angular/router';
import { AuthGuard               } from 'src/app/core/guards/auth.guard';
import { RomsHomeComponent       } from './home/roms-home.component';

const pagesRoutes:Routes = [
    { 
        path        : 'roms',
        component   : RomsHomeComponent,
        pathMatch   : 'full',
        canActivate : [AuthGuard],
        data        : {
            app: 'Roms'
        }
    }
];
export const ROMS_ROUTES = RouterModule.forRoot(pagesRoutes);