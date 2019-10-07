import { RouterModule, Routes }    from '@angular/router';
import { MonitoringHomeComponent } from 'src/app/monitoring/home/monitoringHome.component';
import { AuthGuard } from '../core/guards/auth.guard';


const pagesRoutes:Routes = [
    { 
        path:'monitoring',
        component:MonitoringHomeComponent,
    }
];

export const MONITORING_ROUTES = RouterModule.forRoot(pagesRoutes);