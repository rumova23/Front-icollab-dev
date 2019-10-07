import { Component }  from '@angular/core';
import { OnInit }     from '@angular/core';
import { trigger }    from '@angular/animations';
import { state }      from '@angular/animations';
import { style }      from '@angular/animations';
import { transition } from '@angular/animations';
import { animate }    from '@angular/animations';
import { Input }      from '@angular/core';

import { menuItem }      from './menuItem';
import { EventService }  from 'src/app/core/services/event.service';
import { EventMessage }  from 'src/app/core/models/EventMessage';
import { GlobalService } from 'src/app/core/globals/global.service';

@Component({
  selector: 'app-shared-sidebar-items',
  templateUrl: './shared-sidebar-items.component.html',
  animations  : [
	 trigger('icon180', [
	   state('hide' ,style({ transform : 'rotate(-90deg)' }))
	  ,state('view' ,style({ transform : 'rotate(180deg)' }))
	  ,transition('view <=> hide',
		 animate('225ms cubic-bezier(0.4 ,0.0 ,0.2 ,1)')
	  )
	 ])
   ]
})
export class SharedSidebarItemsComponent {
	@Input() aside_open;
	@Input() item      : menuItem;
	@Input() deep      : number = 0;  
	viewHide           : boolean = false;
	indent             : number = 12;
	units              : string = 'px';

	constructor(
		private eventService : EventService,
		public globalService : GlobalService
	) { }

  	itemSelected(item: menuItem) {
		if (item.children && item.children.length) {
			this.viewHide = !this.viewHide;
		}
		this.eventService.sendChangeSidebarMenu({id:null,data:item});
    }
}
