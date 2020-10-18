import { RouterModule, Routes    } from '@angular/router';
import { AuthGuard               } from 'src/app/core/guards/auth.guard';
import { LoginComponent          } from './login/login.component';
import { HomeComponent           } from './home/home.component';

const pagesRoutes:Routes = [
    { path: 'login', component: LoginComponent, pathMatch: 'full' },
    {
        path: 'home', component: HomeComponent, pathMatch: 'full',
		canActivate: [AuthGuard],
		data: {
            app: 'Home'
		}
	},
    { path: '**', component: LoginComponent},
];
export const LOGIN_ROUTES = RouterModule.forRoot(pagesRoutes);