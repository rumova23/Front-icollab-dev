import { RouterModule, Routes    } from '@angular/router';
import { AuthGuard               } from 'src/app/core/guards/auth.guard';
import { BitsHomeComponent       } from './home/bits-home.component';

const pagesRoutes:Routes = [
    { 
        path        : 'bits',
        component   : BitsHomeComponent,
        pathMatch   : 'full',
        canActivate : [AuthGuard],
        data        : {
            app: 'Bits'
        }
    }
];
export const BITS_ROUTES = RouterModule.forRoot(pagesRoutes);