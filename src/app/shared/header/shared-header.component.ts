import { Component, OnInit } from '@angular/core';
import { Inject            } from '@angular/core';
import { Router            } from '@angular/router';
import { ThemeService      } from 'src/app/core/globals/theme';
import { GlobalService     } from 'src/app/core/globals/global.service';
import { SecurityService   } from 'src/app/core/services/security.service';
import { EventService      } from 'src/app/core/services/event.service';
import { EventMessage      } from 'src/app/core/models/EventMessage';
import { DOCUMENT          } from '@angular/common';
import { EventBlocked      } from 'src/app/core/models/EventBlocked';
import { Observable        } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector    : 'app-shared-header',
  templateUrl : './shared-header.component.html',
  styleUrls   : ['./shared-header.component.scss']
})
export class SharedHeaderComponent implements OnInit {
	disableChangePlant = false;
	constructor(
		@Inject(DOCUMENT) private _document,
		public globalService    : GlobalService,
		public theme            : ThemeService,
		private eventService    : EventService,
		private securityService : SecurityService,
		private router          : Router,
		public toastr: ToastrManager
	) { 
	}

	ngOnInit() {
	}
	checkdisableChangePlanta(){
		let plants = this.securityService.loadPlants();
		if(plants.length <= 1) this.disableChangePlant = true;
	}
	getNameUser() {
		let name = this.securityService.getNameUser() +" "+ this.securityService.getLastNameUser();
		return name;
	}
	toggleMenu() {
		this.globalService.aside_open = !this.globalService.aside_open ;
		let i = this.globalService.aside_open ? 1 : 2;
		this.eventService.sendChangeNavBar(new EventMessage(i, null));
	}
	
	changePassword() {
		if(this.globalService.lockHeaderAndSidebar.isLocked){
			this.toastr.errorToastr(this.globalService.lockHeaderAndSidebar.msn, 'Lo siento');
			return 0;
		}
		this.eventService.sendChangePage(new EventMessage(100, null,'shared.header.changePassword'));
	}
	goToHome(){		
		if(this.globalService.lockHeaderAndSidebar.isLocked){
			this.toastr.errorToastr(this.globalService.lockHeaderAndSidebar.msn, 'Lo siento');
			return 0;
		}
		this.eventService.sendChangeNavBar(new EventMessage(101, null));
	}
	changeModule(){		
		if(this.globalService.lockHeaderAndSidebar.isLocked){
			this.toastr.errorToastr(this.globalService.lockHeaderAndSidebar.msn, 'Lo siento');
			return 0;
		}
	  	this.router.navigate(['/home']);
	}
	logout() {		
		if(this.globalService.lockHeaderAndSidebar.isLocked){
			this.toastr.errorToastr(this.globalService.lockHeaderAndSidebar.msn, 'Lo siento');
			return 0;
		}
	  	this.securityService.logout();
	}
	changePlant(plant){		
		if(this.globalService.lockHeaderAndSidebar.isLocked){
			this.toastr.errorToastr(this.globalService.lockHeaderAndSidebar.msn, 'Lo siento');
			return 0;
		}
		let plants = this.securityService.loadPlants();
		for(let i = 0; i < plants.length;i++){
			if(plants[i].name == plant){

				this.globalService.setPlant(plants[i]);
				
				this.mytimeout().subscribe(() => {
					
				});
				break;
			}
		}
		this.eventService.sendChangePage(this.globalService.page);
	}
	mytimeout(): any {
		return new Observable(observer => {
			   setTimeout(() => {
				   observer.next();
			   }, 1300);
		});
	}
}
