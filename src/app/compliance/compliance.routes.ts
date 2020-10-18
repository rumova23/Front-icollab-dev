import { RouterModule, Routes    } from '@angular/router';
import { AuthGuard               } from 'src/app/core/guards/auth.guard';
import { ComplianceHomeComponent } from './home/complianceHome.component';

const pagesRoutes:Routes = [
    { 
        path        : 'compliance',
        component   : ComplianceHomeComponent,
        pathMatch   : 'full',
        canActivate : [AuthGuard],
        data        : {
            app: 'Compliance'
        }
    }
];
export const COMPLIANCE_ROUTES = RouterModule.forRoot(pagesRoutes);