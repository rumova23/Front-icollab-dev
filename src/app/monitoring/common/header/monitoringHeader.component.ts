import { Component, OnInit, Output } from '@angular/core';
import { Router } from "@angular/router";
import { GlobalService } from 'src/app/core/globals/global.service';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { SecurityService } from 'src/app/core/services/security.service';
import { ThemeService } from 'src/app/core/globals/theme';

@Component({
  selector: 'app-monitoringHeader',
  templateUrl: './monitoringHeader.component.html'
})
export class MonitoringHeaderComponent implements OnInit {
  constructor(
    public globalService: GlobalService,
    public theme:ThemeService,
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
    this.eventService.sendMainMonitoring(new EventMessage(1, null))
  }

  changePassword() {
    this.eventService.sendMainMonitoring(new EventMessage(100, null))
  }
  goToHome(){
    this.eventService.sendMainMonitoring(new EventMessage(101, null))
  }
  changeModule(){
    this.router.navigate(['/home']);
  }
  logout() {
    this.securityService.logout();
  }
  changePlant(plant){
    try{
      let plants = this.securityService.loadPlants();
      for(let i = 0; i < plants.length;i++){
        if(plants[i].name == plant){
          this.globalService.plant = plants[i];
          break;
        }
      }
    }catch(err){
      switch(plant){
        case "AGUILA":
          this.globalService.plant = {id: 1, name: "AGUILA"};
        break;
        case "SOL":
          this.globalService.plant = {id: 2, name: "SOL"};
        break;
      }
    }

    this.eventService.sendMainMonitoring(new EventMessage(this.globalService.page, {}));
    //this.eventService.sendMainMonitoring(new EventMessage(101, {}));
  }

}
