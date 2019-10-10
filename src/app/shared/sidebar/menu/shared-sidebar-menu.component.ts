import { Component           } from '@angular/core';
import { Input, ViewChildren } from '@angular/core';
import { ViewChild           } from '@angular/core';

import { GlobalService       } from 'src/app/core/globals/global.service';
import { SecurityService     } from 'src/app/core/services/security.service';
import { CollapseComponent   } from 'angular-bootstrap-md';

import { menuItem            } from 'src/app/common/sidebar/items/menuItem';
import { MatSidenav          } from '@angular/material/sidenav';

@Component({
  selector    : 'app-shared-sidebar-menu',
  templateUrl : './shared-sidebar-menu.component.html'
})
export class SharedSidebarMenuComponent{
	@Input() item             : menuItem;
	@ViewChild('left')  left  : MatSidenav;
	@ViewChild('right') right : MatSidenav;  
	@ViewChildren(CollapseComponent) collapses: CollapseComponent[];
	
	menu : menuItem[];

	constructor(
		private globalService   : GlobalService,  
		private securityService : SecurityService
	) {
		let app   = globalService.app;
		this.menu = securityService.getMenu(app.name);
		if(this.menu == undefined){
			this.hardcode(app.name);
		}
	}
	hardcode(name){
		switch (name) {
			case "Administrative_monitoring":
				this.menu = [
					{
					id: 'Dashboard',
					idFather:'',
					icon: 'business',
					label: 'Dashboard',
					children: [
						{ 
						id: 'Fase 3',
						idFather:'Dashboard',
						icon:'business',
						label:'Fase 3',
						},
					]
					},//*/
					{
					id: 'Fase 3',
					idFather:'',
					icon: 'pie_chart',
					label: 'Fase 3'
					},{
					id: 'Fase 2',
					idFather:'',
					icon: 'insert_chart',
					label: 'Fase 2'
					},{
					id: 'Mm Market',
					idFather:'',
					icon: 'insert_chart',
					label: 'Mm Market'
					}
				]; 
				break;
			default:
				break;
		}
	}

}
