import { Component } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { EventMessage } from './core/models/EventMessage';
import { EventService } from './core/services/event.service';
import { EventBlocked } from './core/models/EventBlocked';
import { Validate } from './core/helpers/util.validator.';

import { GlobalService }                       from 'src/app/core/globals/global.service';
import { ThemeService }                        from 'src/app/core/globals/theme';
import { SecurityService }                     from 'src/app/core/services/security.service';


@Component({
	selector    : 'app-root',
	templateUrl : './app.component.html',
	styleUrls   : ['./app.component.scss']
})
export class AppComponent {
	@BlockUI() blockUI  : NgBlockUI;
	serviceSubscription : any;

	constructor(
		private eventService             : EventService,
		public  globalService            : GlobalService,
		public  theme                    : ThemeService,
		private securityService          : SecurityService,
	) {
		if(this.globalService.plant == undefined) this.globalService.plant = this.securityService.loadPlants()[0];// para dev ya que no entro por el home
		this.serviceSubscription = this.eventService.onChangeApp.subscribe({
			next: (event: EventMessage) => {
				switch (event.id) {
					case 1:
					this.blocked(event.data as EventBlocked);
					break;
				}
			}
		});
	}

	private blocked(event: EventBlocked): void {
		switch (event.id) {
			case 1:
				if (Validate(event.msg)) {
					this.blockUI.stop();
					this.blockUI.start(event.msg);
				} else {
					this.blockUI.stop();
					this.blockUI.start();
				}
				break;
			case 2:
				this.blockUI.stop();
				break;
		}
	}
}
