import { Routes         } from '@angular/router';
import { RouterModule   } from '@angular/router';
import { AuthGuard      } from './core/guards/auth.guard';
import { LoginComponent } from './login/login/login.component';
import { HomeComponent } from './login/home/home.component';

const routes: Routes = [
	//{ path: '', component: LoginComponent },
];

export const APP_ROUTES = RouterModule.forRoot(routes , {useHash:true });
