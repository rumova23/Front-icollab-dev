import { Component         } from '@angular/core';
import { GlobalService     } from 'src/app/core/globals/global.service';
import { SecurityService   } from 'src/app/core/services/security.service';

@Component({
  selector    : 'app-shared-sidebar',
  templateUrl : './shared-sidebar.component.html'
})
export class SharedSidebarComponent{

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
