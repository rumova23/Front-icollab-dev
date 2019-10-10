import { Component, Input  } from '@angular/core';
import { GlobalService     } from 'src/app/core/globals/global.service';
import { SecurityService   } from 'src/app/core/services/security.service';

@Component({
  selector    : 'app-shared-sidebar',
  templateUrl : './shared-sidebar.component.html',
  styleUrls   : ['./shared-sidebar.component.scss']
})
export class SharedSidebarComponent{
	@Input() minwidth: string = "60px";
	constructor( 
		public  globalService : GlobalService,
		private securityService: SecurityService
	) { }

	getgender(){
		let generoId = JSON.parse(localStorage.getItem('user'));
		generoId = generoId['generoId'];
		return generoId;
	}

	getNameUser() {
		let name = this.securityService.getNameUser() +" "+ this.securityService.getLastNameUser();
		return name;
	}
}
