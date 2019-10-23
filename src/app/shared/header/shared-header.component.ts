import { Component, OnInit } from '@angular/core';
import { Inject            } from '@angular/core';
import { Router            } from '@angular/router';
import { ThemeService      } from 'src/app/core/globals/theme';
import { GlobalService     } from 'src/app/core/globals/global.service';
import { SecurityService   } from 'src/app/core/services/security.service';
import { EventService      } from 'src/app/core/services/event.service';
import { EventMessage      } from 'src/app/core/models/EventMessage';
import { DOCUMENT } from '@angular/common';

@Component({
  selector    : 'app-shared-header',
  templateUrl : './shared-header.component.html',
  styleUrls   : ['./shared-header.component.scss']
})
export class SharedHeaderComponent implements OnInit {

  constructor(
	  @Inject(DOCUMENT) private _document,
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
	  	this.router.navigate(['/home']);
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
		this.eventService.sendChangePage(this.globalService.page);
		
		let url = `assets/css/theme/${plant.toLowerCase()}/default.css`;
		this._document.getElementById("plant_theme").setAttribute('href',url);
	}
	changeLangage(languge){
		this.globalService.languge = languge;
		this.eventService.sendChangePage(this.globalService.page);
	}
}
