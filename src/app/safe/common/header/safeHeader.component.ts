import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/core/globals/global.service';
import { EventService } from 'src/app/core/services/event.service';
import { Router } from '@angular/router';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { SecurityService } from 'src/app/core/services/security.service';

@Component({
  selector: 'app-safeHeader',
  templateUrl: './safeHeader.component.html',
  styleUrls: ['./safeHeader.component.css']
})
export class SafeHeaderComponent implements OnInit {
  
  srclogo="../../../assets/images/skins/shape_1.png";
  nameplanta="Aguila";
  constructor(private globalService: GlobalService,
    private eventService: EventService,
    private securityService: SecurityService,
    private router: Router) {
  }

  ngOnInit() {
  }

  getNameUser() {
    return this.securityService.getNameUser();
  }

  toggleMenu() {
    this.eventService.sendMainSafe(new EventMessage(1, null));
  }

  changePassword() {
    this.eventService.sendMainSafe(new EventMessage(100, null));
  }

  changeModule(){
    this.router.navigate(['/home']);
  }
  logout() {
    this.securityService.logout();
  }

  cambioPlantaAguila() {

    this.cambioTema();
    this.globalService.plantaDefaultId = "82";

    if (this.router.isActive("/config-act", true)) {
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      }
      this.router.navigated = false;
      this.router.navigateByUrl('/config-act');
    }
  }

  cambioPlantaSol() {
    
    this.cambioTema();
    this.globalService.plantaDefaultId = "83";
    if (this.router.isActive("/config-act", true)) {
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      }
      this.router.navigated = false;
      this.router.navigate(['/config-act']);
    }
  }
  
  cambioTema(){
    this.globalService.aguila = !this.globalService.aguila;
    this.srclogo = this.globalService.aguila ? "../../../assets/images/skins/shape_1.png":"../../../assets/images/skins/logobotonsol.png";
    this.nameplanta = this.globalService.aguila ? "Aguila":"Sol";
  }

}
