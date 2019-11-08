import { Component, OnInit, OnDestroy    } from '@angular/core';
import { ComponentFactoryResolver        } from '@angular/core';
import { ViewContainerRef, ViewChild     } from '@angular/core';
import { Subscription                    } from 'rxjs';

import { GlobalService                   } from 'src/app/core/globals/global.service';
import { ThemeService                    } from 'src/app/core/globals/theme';
import { SecurityService                 } from 'src/app/core/services/security.service';
import { EventService                    } from 'src/app/core/services/event.service';
import { EventMessage                    } from 'src/app/core/models/EventMessage';
import { SocketService                   } from 'src/app/core/services/socket.service';
import { ConnectSocketComponent          } from 'src/app/shared/socket/connectSocket.component';
import { ChangePasswordComponent         } from 'src/app/common/changePassword/changePassword.component';

import { MonitoringWelcomeComponent      } from '../welcome/monitoring-welcome.component';
import { MonitoringPhase2Component       } from '../boards/phase2/monitoring-phase2.component';
import { MonitoringPhase3Component       } from '../boards/phase3/monitoring-phase3.component';
import { MonitoringMmMarketComponent     } from '../boards/mmMarket/monitoringMmMarket.component';


@Component({
	selector    : 'app-monitoringHome',
	templateUrl : './monitoringHome.component.html',
	styleUrls   : ['./monitoringHome.component.scss'],
	entryComponents: [
		 MonitoringWelcomeComponent
		,MonitoringPhase2Component
		,MonitoringPhase3Component
		,MonitoringMmMarketComponent
		,ChangePasswordComponent
	]
})
export class MonitoringHomeComponent extends ConnectSocketComponent implements OnInit, OnDestroy {
	@ViewChild('container', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;
	public subscriptions                 : Subscription[]     = [];

	constructor(
		public  globalService            : GlobalService,
		public  theme                    : ThemeService,
		public  eventService             : EventService,
		public  securityService          : SecurityService,
		public  socketService            : SocketService,
		private componentFactoryResolver : ComponentFactoryResolver
	) {
		super(globalService,securityService,socketService,eventService);
		this.theme.setApp("Administrative_monitoring");
	}

	ngOnInit() {
		let url = `/assets/css/theme/content/monitoring.css`;
		document.getElementById("content_theme").setAttribute('href',url);
		
		this.globalService.page  = new EventMessage(0,null,'Administrative_monitoring.Inicio');
		this.openSocket();
		this.subscribeOnChangePage();
	}
	ngAfterViewInit() {
		//const factory = this.componentFactoryResolver.resolveComponentFactory(MonitoringPhase2Component);
		const factory = this.componentFactoryResolver.resolveComponentFactory(MonitoringWelcomeComponent);
		this.viewContainerRef.createComponent(factory);
	}
	ngOnDestroy(){
		for (const iterator in this.subscriptions) {
			this.subscriptions[iterator].unsubscribe();
		}
		this.socketService.closeSocket();
  	}
	subscribeOnChangePage(){
		this.subscriptions.push(this.eventService.onChangePage.subscribe({
			next: (event: EventMessage) => {
				this.viewContainerRef.clear();
				switch (event.descriptor) {
					case 'Administrative_monitoring.Inicio':
						this.viewContainerRef.createComponent(
							this.componentFactoryResolver.resolveComponentFactory(MonitoringWelcomeComponent)
						).changeDetectorRef.detectChanges();
					  break;
					case 'Administrative_monitoring.Fase 2':
						this.viewContainerRef.createComponent(
							this.componentFactoryResolver.resolveComponentFactory(MonitoringPhase2Component)
						).changeDetectorRef.detectChanges();
					  break;
					case 'Administrative_monitoring.Fase 3':
						this.viewContainerRef.createComponent(
							this.componentFactoryResolver.resolveComponentFactory(MonitoringPhase3Component)
						).changeDetectorRef.detectChanges();
					  break;
					case 'Administrative_monitoring.Mm Market':
						this.viewContainerRef.createComponent(
							this.componentFactoryResolver.resolveComponentFactory(MonitoringMmMarketComponent)
						).changeDetectorRef.detectChanges();
						break;
					case 'shared.header.changePassword':
						this.viewContainerRef
							.createComponent(this.componentFactoryResolver.resolveComponentFactory(ChangePasswordComponent)).changeDetectorRef.detectChanges();
						break;
					default:
				}
			}
		}));
	}
}
