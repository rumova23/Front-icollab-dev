import { Component, OnInit, OnDestroy    } from '@angular/core';
import { ComponentFactoryResolver        } from '@angular/core';
import { ViewContainerRef, ViewChild     } from '@angular/core';
import { Observable, timer, Subscription } from 'rxjs';

import { GlobalService                   } from 'src/app/core/globals/global.service';
import { ThemeService                    } from 'src/app/core/globals/theme';
import { SecurityService                 } from 'src/app/core/services/security.service';
import { EventService                    } from 'src/app/core/services/event.service';
import { EventMessage                    } from 'src/app/core/models/EventMessage';
import { SocketService                   } from 'src/app/core/services/socket.service';
import { Validate                        } from 'src/app/core/helpers/util.validator.';
import { EventSocket                     } from 'src/app/core/models/EventSocket';

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
	]
})
export class MonitoringHomeComponent implements OnInit, OnDestroy {
	@ViewChild('container', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;
	private subscriptions : Subscription[]     = [];
	private everySecond   : Observable<number> = timer(0,8000);

	constructor(
		public  globalService            : GlobalService,
		public  theme                    : ThemeService,
		private componentFactoryResolver : ComponentFactoryResolver,
		private eventService             : EventService,
		private securityService          : SecurityService,
		private socketService            : SocketService
	) {
		
		this.theme.setApp("Administrative_monitoring");
		if(this.globalService.plant == undefined) this.globalService.plant = this.securityService.loadPlants()[0];// para dev ya que no entro por el home
	}

	ngOnInit() {
		let url = `/assets/css/theme/content/monitoring.css`;
		document.getElementById("content_theme").setAttribute('href',url);

		this.globalService.page  = new EventMessage(101,{id: "Fase 3", idFather: "", icon: "pie_chart", label: "Inicio"});
		this.openSocket();
		this.subscribeOnChangePage();

	}
	ngAfterViewInit() {
		//const factory = this.componentFactoryResolver.resolveComponentFactory(MonitoringPhase2Component);
		//const factory = this.componentFactoryResolver.resolveComponentFactory(MonitoringPhase3Component);
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
				switch (event.data.label) {
					case 'Inicio':
						this.viewContainerRef.createComponent(
							this.componentFactoryResolver.resolveComponentFactory(MonitoringWelcomeComponent)
						).changeDetectorRef.detectChanges();
					  break;
					case 'Fase 2':
						this.viewContainerRef.createComponent(
							this.componentFactoryResolver.resolveComponentFactory(MonitoringPhase2Component)
						).changeDetectorRef.detectChanges();
					  break;
					case 'Fase 3':
						this.viewContainerRef.createComponent(
							this.componentFactoryResolver.resolveComponentFactory(MonitoringPhase3Component)
						).changeDetectorRef.detectChanges();
					  break;
					case 'Mm Market':
						this.viewContainerRef.createComponent(
							this.componentFactoryResolver.resolveComponentFactory(MonitoringMmMarketComponent)
						).changeDetectorRef.detectChanges();
						break;
					default:
				}
			}
		}));
	}
	
	openSocket(){
		if(!this.globalService.socketConnect){
			const token = this.securityService.getToken() || 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0ZXIiLCJhdXRoIjpbeyJuYW1lIjoiUk9MRV9BRE1JTl9TRUNVUklUWSJ9LHsibmFtZSI6IlJPTEVfQURNSU5fQ09NUExJQU5DRSJ9LHsibmFtZSI6IlJPTEVfQURNSU5fU0FGRSJ9LHsibmFtZSI6IlJPTEVfQURNSU5fQURNSU5JU1RSQVRJVkVfTU9OSVRPUklORyJ9XSwiaWF0IjoxNTY3NTU5Mjc3LCJleHAiOjE1Njc1NjY0Nzd9.Ikozy3CH7DdmWaWGRw2iaRN8M-fJdpQlpL56auotGlI';     

			if (Validate(token)) {
			
				let socket = this.socketService.initSocket(token);
				if(socket["state"] == "open" || socket["state"] == "connecting"){
					this.subscriptions['socketConnect']
					=	this.socketService.onEvent(EventSocket.CONNECT)
							.subscribe(() => {
							this.unsubscribeOpenSocket();
							this.globalService.socketConnect = true;
							this.eventService.sendSocketConnect(new EventMessage(1, null));
							console.log( "Socket Conectado::",this.globalService.socketConnect);
						});
					this.subscriptions['socketDisconnect']
					= 	this.socketService.onEvent(EventSocket.DISCONNECT)
						.subscribe(() => {
							this.unsubscribeSocket();
							this.subscribeOpenSocket();
							this.globalService.socketConnect = false;
							this.eventService.sendSocketConnect(new EventMessage(0, null));
							console.log("Socket desconectado::",this.globalService.socketConnect);
						});
					this.subscriptions['socketOnError']
					=   this.socketService.onError()
						.subscribe((error: any) => {
							this.unsubscribeSocket();
							this.subscribeOpenSocket();
							this.globalService.socketConnect = false;
							this.eventService.sendSocketConnect(new EventMessage(0, null));
							//console.log("Socket ERROR::",error);
						});
					
							
					this.subscriptions['socketLogin']
					=   this.socketService.login()
						.subscribe((errorLogin: any) => {
							if (errorLogin) {
								this.unsubscribeSocket();
								this.subscribeOpenSocket();
								this.globalService.socketConnect = false;
								this.eventService.sendSocketConnect(new EventMessage(0, null));
								//console.log("Socket ERROR Login::",errorLogin);
							} else {
								this.unsubscribeOpenSocket();
								this.globalService.socketConnect = true;
								this.eventService.sendSocketConnect(new EventMessage(1, null));
							}
						});
						
				}
			}else {
				console.log('Token inválido');
				this.unsubscribeSocket();
				//this.subscribeOpenSocket(); // no tiene caso correr esto ya que no esta adecuadamente logueado el usuario
				this.globalService.socketConnect = false;
				this.eventService.sendSocketConnect(new EventMessage(0, null));
			}
		}
	}
	unsubscribeSocket(){
		[  'socketConnect','socketDisconnect'
			,'socketOnError','socketLogin'
		].forEach(event=>{
			if(this.subscriptions[event] != undefined && this.subscriptions[event].isStopped==false){
			this.subscriptions[event].unsubscribe();
			}
		});
	}
	subscribeOpenSocket(){
		if(this.subscriptions['openSocket']  == undefined || this.subscriptions["openSocket"].isStopped==true){
			this.subscriptions['openSocket']
			= this.everySecond.subscribe(second=>{
				this.openSocket();
			});
		}
	}
	unsubscribeOpenSocket(){
		if(this.subscriptions['openSocket']  != undefined && this.subscriptions["openSocket"].isStopped==false){
			this.subscriptions['openSocket'].unsubscribe();
		}
	}



	
	getNameUser() {
		let name = this.securityService.getNameUser() +" "+ this.securityService.getLastNameUser();
		return name;
	}
	getgender(){
		let generoId = JSON.parse(localStorage.getItem('user'));
		generoId = generoId ? generoId['generoId']: 2;
		return generoId;
	}
}
