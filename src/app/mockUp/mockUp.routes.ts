import { RouterModule, Routes    } from '@angular/router';
import { MockUpHomeComponent } from './home/mockUpHome.component';

const mockUpRoutes:Routes = [
    {
        path: 'Link-MockUp', component: MockUpHomeComponent, pathMatch: 'full',
        data: {
            app: 'Mock_Up'
        }
    },
];
export const MOCKUP_ROUTES = RouterModule.forRoot(mockUpRoutes);