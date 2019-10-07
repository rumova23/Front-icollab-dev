import { Component, OnInit, OnDestroy    } from '@angular/core';
import { ComponentFactoryResolver        } from '@angular/core';
import { ViewContainerRef, ViewChild     } from '@angular/core';
import { Observable, timer, Subscription } from 'rxjs';

import { GlobalService                   } from 'src/app/core/globals/global.service';
import { ThemeService                    } from 'src/app/core/globals/theme';
import { SecurityService                 } from 'src/app/core/services/security.service';
import { EventService                    } from 'src/app/core/services/event.service';
import { EventMessage                    } from 'src/app/core/models/EventMessage';

import { MonitoringWelcomeComponent      } from '../welcome/monitoring-welcome.component';
import { MonitoringPhase2Component       } from '../boards/phase2/monitoring-phase2.component';
import { MonitoringPhase3Component       } from '../boards/phase3/monitoring-phase3.component';

@Component({
	selector    : 'app-monitoringHome',
	templateUrl : './monitoringHome.component.html',
	styleUrls   : ['./monitoringHome.component.scss'],
	entryComponents: [
		 MonitoringWelcomeComponent
		,MonitoringPhase2Component
		,MonitoringPhase3Component
	]
})
export class MonitoringHomeComponent implements OnInit, OnDestroy {
	@ViewChild('container', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;
	private subscriptions : Subscription[]     = [];
	constructor(
		private componentFactoryResolver : ComponentFactoryResolver,
		public  globalService            : GlobalService,
		public  theme                    : ThemeService,
		private eventService             : EventService,
		private securityService          : SecurityService,
	) {
		
		try{
			this.theme.setApp("Administrative_monitoring");
		}catch(err){

		}
	}

	ngOnInit() {
		this.subscriptions.push(this.eventService.onChangePage.subscribe({
			next: (event: EventMessage) => {
				let option = 0;
				let data = {};    
				switch (event.data.label) {
					case 'Inicio':
					  option = 101;
					  data = event;
					  break;
					case 'Fase 2':
					  option = 2;
					  break;
					case 'Fase 3':
					  option = 3;
					  break;
					case 'Fase 2 Mockup':
					  option = 4;
					  break;
					case 'Mm Market':
						option = 5;
						break;
					default:
					  option = 101;
					  data = event;
				  }
				  //console.log(event);
				  //console.log(option);
			
				  //this.eventService.sendMainMonitoring(new EventMessage(option, data));

				  this.clickMenu(new EventMessage(option, data));
			}
		}));
	}
	
	private clickMenu(event: EventMessage): void {
		this.viewContainerRef.clear();
		switch (event.id) {
			case 2:
				this.viewContainerRef.createComponent(
				this.componentFactoryResolver.resolveComponentFactory(MonitoringPhase2Component)
				).changeDetectorRef.detectChanges();
			break;
			case 3:
				this.viewContainerRef.createComponent(
					this.componentFactoryResolver.resolveComponentFactory(MonitoringPhase3Component)
					).changeDetectorRef.detectChanges();
					break;
			/*
			case 4:
				this.viewContainerRef.createComponent(
				this.componentFactoryResolver.resolveComponentFactory(MonitoringPhase2MockupComponent)
				).changeDetectorRef.detectChanges();
			break;
			case 5:
				this.viewContainerRef.createComponent(
				this.componentFactoryResolver.resolveComponentFactory(MonitoringMmMarketComponent)
				).changeDetectorRef.detectChanges();
			break;
			case 100:
				this.viewContainerRef.createComponent(
					this.componentFactoryResolver.resolveComponentFactory(ChangePasswordComponent)
				).changeDetectorRef.detectChanges();
			break;
			//*/
			case 101:
				this.viewContainerRef.createComponent(
					this.componentFactoryResolver.resolveComponentFactory(MonitoringWelcomeComponent)
				).changeDetectorRef.detectChanges();
			break;
		}
	}
	ngAfterViewInit() {
		//const factory = this.componentFactoryResolver.resolveComponentFactory(MonitoringPhase2Component);
		//const factory = this.componentFactoryResolver.resolveComponentFactory(MonitoringPhase3Component);
		const factory = this.componentFactoryResolver.resolveComponentFactory(MonitoringWelcomeComponent);
		this.viewContainerRef.createComponent(factory);
	}
	ngOnDestroy(){

  	}

}
