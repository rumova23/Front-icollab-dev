import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComplianceHomeComponent } from './compliance/home/complianceHome.component';
import { HomeComponent }   from './common/home/home.component';
import { LoginComponent }  from './common/login/login.component';
//import { HomeComponent } from './comun/home/home.component';
//import { LoginComponent } from './comun/login/login.component';
import { SecurityHomeComponent } from './security/home/securityHome.component';
import { SafeHomeComponent } from './safe/home/safeHome.component';
import { AuthGuard } from './core/guards/auth.guard';
import { MockUpHomeComponent } from './mockUp/home/mockUpHome.component';
import { MonitoringHomeComponent } from 'src/app/monitoring/home/monitoringHome.component';

const routes: Routes = [
  // otherwise redirect to home
  
  //{ path: '', component: LoginComponent },
  //{ path: '', component: MonitoringHomeComponent },

  //{ path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  /*{
    path: 'compliance/home', component: ComplianceHomeComponent, pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      app: 'Compliance'
    }
  },//*/
  /*{
    path: 'safe/home', component: SafeHomeComponent, pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      app: 'Safe'
    }
  },//*/
  /*{
    path: 'monitoring/home', component: MonitoringHomeComponent, pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      app: 'Administrative_monitoring'
    }
  },//*/
/*
  {
    path: 'security/home', component: SecurityHomeComponent, pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      app: 'Security'
    }
  },//*/
  {
    path: 'home', component: HomeComponent, pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      app: 'Home'
    }
  },
  {
    path: 'Link-MockUp', component: MockUpHomeComponent, pathMatch: 'full',
    data: {
      app: 'Mock Up'
    }
  },
  /* MG */



  { path: '**', component: LoginComponent}
];

export const APP_ROUTES = RouterModule.forRoot(routes , {useHash:false });

/*
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class APP_ROUTES { }
//*/