import { RouterModule, Routes    } from '@angular/router';
import { MonitoringHomeComponent } from 'src/app/monitoring/home/monitoringHome.component';
import { AuthGuard               } from 'src/app/core/guards/auth.guard';

const pagesRoutes:Routes = [
    { 
        path        : 'monitoring',
        component   : MonitoringHomeComponent,
        pathMatch   : 'full',
        canActivate : [AuthGuard],
        data        : {
            app: 'Administrative_monitoring'
        }
    }
];
export const MONITORING_ROUTES = RouterModule.forRoot(pagesRoutes);