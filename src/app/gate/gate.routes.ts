import { RouterModule, Routes    } from '@angular/router';
import { AuthGuard               } from 'src/app/core/guards/auth.guard';
import { GateHomeComponent       } from './home/gate-home.component';

const pagesRoutes:Routes = [
    { 
        path        : 'gate',
        component   : GateHomeComponent,
        pathMatch   : 'full',
        canActivate : [AuthGuard],
        data        : {
            app: 'Gate'
        }
    }
];
export const GATE_ROUTES = RouterModule.forRoot(pagesRoutes);