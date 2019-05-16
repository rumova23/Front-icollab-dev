import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from './core/services/security.service';
import { User } from './security/models/User';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'compliace-perfil';
  currentUser: User;

  constructor(
    private router: Router,
    private securityService: SecurityService
  ) {
    this.securityService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.securityService.logout();
    this.router.navigate(['/login']);
  }

}
