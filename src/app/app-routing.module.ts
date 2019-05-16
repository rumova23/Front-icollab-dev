import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { ComplianceHomeComponent } from './compliance/home/complianceHome.component';
import { HomeComponent } from './comun/home/home.component';
import { LoginComponent } from './security/login/login.component';
import { SecurityHomeComponent } from './security/home/securityHome.component';
import { SafeHomeComponent } from './safe/home/safeHome.component';
import { ChangePasswordComponent } from './comun/changePassword/changePassword.component';


const routes: Routes = [
  // otherwise redirect to home
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'compliance/home', component: ComplianceHomeComponent, pathMatch: 'full' },
  { path: 'safe/home', component: SafeHomeComponent, pathMatch: 'full' },
  { path: 'security/home', component: SecurityHomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  /* MG */
  { path: '**', redirectTo: '' }
];

//export const routing = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
