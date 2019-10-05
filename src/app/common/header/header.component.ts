import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ThemeService } from 'src/app/core/globals/theme';
import { SecurityService } from 'src/app/core/services/security.service';
import { GlobalService } from 'src/app/core/globals/global.service';
import { Router } from '@angular/router';
import { EventMessage } from 'src/app/core/models/EventMessage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	@Output() outputHeader = new EventEmitter<any>();

	constructor(
		public globalService    : GlobalService,
		public theme            : ThemeService,
		private securityService : SecurityService,
		private router          : Router
		) {
			let fdsafdas ;
		 }

	ngOnInit() {
		
	}

	getNameUser() {
		let name = this.securityService.getNameUser() +" "+ this.securityService.getLastNameUser();
		return name;
	}
	toggleMenu() {
		this.outputHeader.emit(new EventMessage(1, null));
	}
	
	changePassword() {		
		this.outputHeader.emit(new EventMessage(100, null));
	}
	goToHome(){
		this.outputHeader.emit(new EventMessage(101, null));
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
		this.outputHeader.emit(new EventMessage(this.globalService.page, null));
	}
	changeLangage(languge){
		this.globalService.languge = languge;
		this.outputHeader.emit(new EventMessage(this.globalService.page, null));
	}
}
