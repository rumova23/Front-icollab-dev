import { Component, OnInit, Output } from '@angular/core';
import { Router } from "@angular/router";
import { GlobalService } from 'src/app/core/globals/global.service';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { SecurityService } from 'src/app/core/services/security.service';

@Component({
  selector: 'app-complianceHeader',
  templateUrl: './complianceHeader.component.html'
})
export class ComplianceHeaderComponent implements OnInit {
  color: string = 'warn';
  srclogo="../../../assets/images/skins/shape_1.png";
  nameplanta="Aguila";
  constructor(public globalService: GlobalService,
    private eventService: EventService,
    private securityService: SecurityService,
    private router: Router) {
  }

  ngOnInit() {
  }

  getNameUser() {
    let name = this.securityService.getNameUser() +" "+ this.securityService.getLastNameUser();
    return name;
  }

  toggleMenu() {
    this.eventService.sendMainCompliance(new EventMessage(1, null))
  }

  changePassword() {
    this.eventService.sendMainCompliance(new EventMessage(100, null))
  }
  goToHome(){
    this.eventService.sendMainCompliance(new EventMessage(101, null))
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
    this.eventService.sendPlant(new EventMessage(100, {}));
    this.eventService.sendMainCompliance(new EventMessage(101, {}));
  }

  cambioPlantaSol() {
    this.cambioTema();
    this.globalService.plantaDefaultId = "83";
    this.eventService.sendPlant(new EventMessage(100, {}));
    this.eventService.sendMainCompliance(new EventMessage(101, {}));
  }
  cambioTema(){
    this.globalService.aguila = !this.globalService.aguila;
    this.srclogo = this.globalService.aguila ? "../../../assets/images/skins/shape_1.png":"../../../assets/images/skins/logobotonsol.png";
    this.nameplanta = this.globalService.aguila ? "Aguila":"Sol";
  }
}
