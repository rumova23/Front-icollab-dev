import { Component, OnInit, Output } from '@angular/core';
import { Router } from "@angular/router";
import { GlobalService } from 'src/app/core/globals/global.service';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { SecurityService } from 'src/app/core/services/security.service';

@Component({
  selector: 'app-complianceHeader',
  templateUrl: './complianceHeader.component.html',
  styleUrls: ['./complianceHeader.component.scss']
})
export class ComplianceHeaderComponent implements OnInit {
  color: string = 'warn'
  constructor(private globalService: GlobalService,
    private eventService: EventService,
    private securityService: SecurityService,
    private router: Router) {
  }

  ngOnInit() {
  }
  cambioPlantaSol() {
    this.globalService.aguila = !this.globalService.aguila
    this.globalService.plantaDefaultId = "83";

    if (this.router.isActive("/config-act", true)) {
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      }
      this.router.navigated = false;
      this.router.navigate(['/config-act']);
    }
  }

  getNameUser() {
    return this.securityService.getNameUser();
  }

  toggleMenu() {
    this.eventService.sendMainCompliance(new EventMessage(1, null))
  }

  changePassword() {
    this.eventService.sendMainCompliance(new EventMessage(100, null))
  }

  logout() {
    this.securityService.logout();
  }

  cambioPlantaAguila() {

    this.globalService.aguila = !this.globalService.aguila
    this.globalService.plantaDefaultId = "82";

    if (this.router.isActive("/config-act", true)) {
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      }
      this.router.navigated = false;
      this.router.navigateByUrl('/config-act');
    }
  }
}
