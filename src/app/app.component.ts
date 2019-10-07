import { Component } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { EventMessage } from './core/models/EventMessage';
import { EventService } from './core/services/event.service';
import { EventBlocked } from './core/models/EventBlocked';
import { Validate } from './core/helpers/util.validator.';



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
	) {
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
