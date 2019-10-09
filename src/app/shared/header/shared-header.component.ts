import { Component, OnInit } from '@angular/core';
import { Router            } from '@angular/router';
import { ThemeService      } from 'src/app/core/globals/theme';
import { GlobalService     } from 'src/app/core/globals/global.service';
import { SecurityService   } from 'src/app/core/services/security.service';
import { EventService      } from 'src/app/core/services/event.service';
import { EventMessage      } from 'src/app/core/models/EventMessage';

@Component({
  selector    : 'app-shared-header',
  templateUrl : './shared-header.component.html',
  styleUrls   : ['./shared-header.component.scss']
})
export class SharedHeaderComponent implements OnInit {

  constructor(
      public globalService    : GlobalService,
      public theme            : ThemeService,
      private eventService    : EventService,
      private securityService : SecurityService,
      private router          : Router
  ) { 
  }

  ngOnInit() {
  }

	getNameUser() {
		let name = this.securityService.getNameUser() +" "+ this.securityService.getLastNameUser();
		return name;
	}
	toggleMenu() {
		//this.eventService.sendChangeNavBar(new EventMessage(1, null));
		this.globalService.aside_open = !this.globalService.aside_open ;
	}
	
	changePassword() {		
		this.eventService.sendChangeNavBar(new EventMessage(100, null));
	}
	goToHome(){
		this.eventService.sendChangeNavBar(new EventMessage(101, null));
	}
	changeModule(){
	  	this.router.navigate(['/']);
	}
	logout() {
	  	this.securityService.logout();
	}
	changePlant(plant){
		let plants = this.securityService.loadPlants();
		for(let i = 0; i < plants.length;i++){
			if(plants[i].name == plant){
				this.globalService.plant = plants[i];
				break;
			}
		}
		this.eventService.sendChangeNavBar(new EventMessage(this.globalService.page, null));
	}
	changeLangage(languge){
		this.globalService.languge = languge;
		this.eventService.sendChangeNavBar(new EventMessage(this.globalService.page, null));
	}
}
