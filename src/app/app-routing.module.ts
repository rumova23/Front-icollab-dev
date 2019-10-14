import { Routes         } from '@angular/router';
import { RouterModule   } from '@angular/router';
import { HomeComponent  } from './common/home/home.component';
import { LoginComponent } from './common/login/login.component';
import { AuthGuard      } from './core/guards/auth.guard';

const routes: Routes = [
	//{ path: '', component: LoginComponent },
	{ path: 'login', component: LoginComponent, pathMatch: 'full' },
	{
		path: 'home', component: HomeComponent, pathMatch: 'full',
		canActivate: [AuthGuard],
		data: {
			app: 'Home'
		}
	},
	{ path: '**', component: LoginComponent}
];

export const APP_ROUTES = RouterModule.forRoot(routes , {useHash:false });
