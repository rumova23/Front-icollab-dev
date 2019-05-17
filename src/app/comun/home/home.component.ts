import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { Router } from '@angular/router';
import { SecurityService } from 'src/app/core/services/security.service';
import { App } from 'src/app/security/models/App';
import { Utils } from 'angular-bootstrap-md/lib/utils/utils.class';
import { Validate } from 'src/app/core/helpers/util.validator.';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  apps: Array<App>;

  constructor(private securityService: SecurityService,
    public router: Router) {
    
  }


  ngOnInit() {
    //this.loadAllUsers();
    this.loadApps();
  }

  loadApps() {
    this.apps = this.securityService.loadApps();
  }
  
  existApp(name: string) {
    return Validate(this.apps.filter(app => app.name === name)[0])
  }

  ngOnDestroy() {
    //this.currentUserSubscription.unsubscribe();
  }

  goCompliance() {
    this.router.navigate(['/compliance/home']);
  }

  goSafe() {
    this.router.navigate(['/safe/home']);
  }

  goSecurity() {
    this.router.navigate(['/security/home']);
  }

}
