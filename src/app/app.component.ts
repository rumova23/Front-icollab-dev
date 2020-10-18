import { Component } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { EventMessage } from './core/models/EventMessage';
import { EventService } from './core/services/event.service';
import { EventBlocked } from './core/models/EventBlocked';
import { Validate } from './core/helpers/util.validator.';

import * as Highcharts from 'highcharts';
import HC_exporting    from 'highcharts/modules/exporting';
import HC_stock        from 'highcharts/modules/stock';
import HC_customEvents from 'highcharts-custom-events';
import HC_exportdata   from 'highcharts/modules/export-data';
import Highcharts3d    from 'highcharts/highcharts-3d';
import HC_more         from 'highcharts/highcharts-more';
import HC_gantt        from 'highcharts/modules/gantt';
import HC_extendExportXLS from 'src/app/core/highcharts/exportXLS';
//require('highcharts/highcharts-more')(Highcharts);
//require('highcharts/modules/solid-gauge')(Highcharts);
//import theme           from 'highcharts/themes/gray';
//import theme           from 'highcharts/themes/gray.src';

HC_more(Highcharts);
HC_exporting(Highcharts);
HC_stock(Highcharts);
HC_customEvents(Highcharts);
HC_exportdata(Highcharts);
Highcharts3d(Highcharts);
HC_extendExportXLS(Highcharts);
HC_gantt(Highcharts);
//theme(Highcharts);

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
