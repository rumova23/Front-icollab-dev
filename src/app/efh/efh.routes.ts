import { RouterModule, Routes    } from '@angular/router';
import { AuthGuard               } from 'src/app/core/guards/auth.guard';
import {EfhHomeComponent} from './home/efhHome.component';

const pagesRoutes: Routes = [
    {
        path        : 'efh',
        component   : EfhHomeComponent,
        pathMatch   : 'full',
        canActivate : [AuthGuard],
        data        : {
            app: 'Efh'
        }
    }
];
export const EFH_ROUTES = RouterModule.forRoot(pagesRoutes);
