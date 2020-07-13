import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';

@Component({
	selector: 'app-dashboard-general',
	templateUrl: './dashboard-general.component.html',
	styleUrls: ['./dashboard-general.component.scss']
})
export class DashboardGeneralComponent implements OnInit, OnDestroy  {
	subscriptions : Subscription[] = [];
	timeCurrent   : Date           = new Date();  // Se actualiza cada segundo subscribeEverySecond();
	tg1YtdTotal01 = 648.123;
	tg1YtdTotal02 = 648.123;
	tg1YtdTotal03 = 648.123;
	tg1YtdTotal04 = 648.123;
	tg1YtdTotal05 = 648.123;
	tg1YtdTotal06 = 648.123;
	tg1YtdTotal07 = 648.123;
	tg1YtdTotal08 = 648.123;
	tg1MtdTotal01 = 648.123;
	tg1MtdTotal02 = 648.123;
	tg1MtdTotal03 = 648.123;
	tg1MtdTotal04 = 648.123;
	tg1MtdTotal05 = 648.123;
	tg1MtdTotal06 = 648.123;
	
	tg1YtdLastI01 = 648.123;
	tg1YtdLastI02 = 648.123;
	tg1YtdLastI03 = 648.123;
	tg1YtdLastI04 = 648.123;
	tg1YtdLastI05 = 648.123;
	tg1YtdLastI06 = 648.123;
	tg1YtdLastI07 = 648.123;
	tg1YtdLastI08 = 648.123;
	tg1MtdLastI01 = 648.123;
	tg1MtdLastI02 = 648.123;
	tg1MtdLastI03 = 648.123;
	tg1MtdLastI04 = 648.123;
	tg1MtdLastI05 = 648.123;
	tg1MtdLastI06 = 648.123;


	tg2YtdTotal01 = 648.123;
	tg2YtdTotal02 = 648.123;
	tg2YtdTotal03 = 648.123;
	tg2YtdTotal04 = 648.123;
	tg2YtdTotal05 = 648.123;
	tg2YtdTotal06 = 648.123;
	tg2YtdTotal07 = 648.123;
	tg2YtdTotal08 = 648.123;
	tg2MtdTotal01 = 648.123;
	tg2MtdTotal02 = 648.123;
	tg2MtdTotal03 = 648.123;
	tg2MtdTotal04 = 648.123;
	tg2MtdTotal05 = 648.123;
	tg2MtdTotal06 = 648.123;
	
	tg2YtdLastI01 = 648.123;
	tg2YtdLastI02 = 648.123;
	tg2YtdLastI03 = 648.123;
	tg2YtdLastI04 = 648.123;
	tg2YtdLastI05 = 648.123;
	tg2YtdLastI06 = 648.123;
	tg2YtdLastI07 = 648.123;
	tg2YtdLastI08 = 648.123;
	tg2MtdLastI01 = 648.123;
	tg2MtdLastI02 = 648.123;
	tg2MtdLastI03 = 648.123;
	tg2MtdLastI04 = 648.123;
	tg2MtdLastI05 = 648.123;
	tg2MtdLastI06 = 648.123;

	constructor() { }

	ngOnInit() {
		this.subscribeEverySecond();
	}
	ngOnDestroy(){
		for (const iterator in this.subscriptions) {
			this.subscriptions[iterator].unsubscribe();
		}
	}
	subscribeEverySecond(){
		this.subscriptions['everySecond'] = timer(0,1000).subscribe(()=>{
			this.timeCurrent = new Date();
		});
	}
}
