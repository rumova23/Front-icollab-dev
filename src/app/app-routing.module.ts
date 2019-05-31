import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComplianceHomeComponent } from './compliance/home/complianceHome.component';
import { HomeComponent } from './comun/home/home.component';
import { LoginComponent } from './comun/login/login.component';
import { SecurityHomeComponent } from './security/home/securityHome.component';
import { SafeHomeComponent } from './safe/home/safeHome.component';
import { AuthGuard } from './core/guards/auth.guard';
import { SafeLinkMockUp } from './safe/links-mock-up/safeLinkMockUp';


const routes: Routes = [
  // otherwise redirect to home
  { path: '', component: LoginComponent },
  //{ path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  {
    path: 'compliance/home', component: ComplianceHomeComponent, pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      app: 'Compliance'
    }
  },
  {
    path: 'safe/home', component: SafeHomeComponent, pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      app: 'Safe'
    }
  },

  {
    path: 'security/home', component: SecurityHomeComponent, pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      app: 'Security'
    }
  },
  {
    path: 'home', component: HomeComponent, pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      app: 'Home'
    }
  },
  {
    path: 'Link-MockUp', component: SafeLinkMockUp, pathMatch: 'full',
    data: {
      app: 'Mock Up'
    }
  },
  /* MG */



  { path: '**', redirectTo: '' }
];

//export const routing = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
