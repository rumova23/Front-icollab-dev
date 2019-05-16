import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { Router } from '@angular/router';
import { SecurityService } from 'src/app/core/services/security.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {



  constructor(private securityService: SecurityService,
    public router: Router) {
    
  }

  ngOnInit() {
    //this.loadAllUsers();
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
