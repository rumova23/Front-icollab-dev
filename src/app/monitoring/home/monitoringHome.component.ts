import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, Input, OnDestroy } from '@angular/core';
import { Observable, timer, Subscription }     from 'rxjs';

import { GlobalService }                       from 'src/app/core/globals/global.service';
import { ThemeService }                        from 'src/app/core/globals/theme';
import { EventMessage }                        from 'src/app/core/models/EventMessage';
import { EventSocket }                         from 'src/app/core/models/EventSocket';
import { EventService }                        from 'src/app/core/services/event.service';
import { SecurityService }                     from 'src/app/core/services/security.service';
import { SocketService }                       from 'src/app/core/services/socket.service';
import { Validate }                            from 'src/app/core/helpers/util.validator.';

import { ChangePasswordComponent }             from 'src/app/common/changePassword/changePassword.component';

import { MonitoringWelcomeComponent }          from 'src/app/monitoring/home/welcome/monitoringWelcome.component';
import { MonitoringPhase2MockupComponent }     from 'src/app/monitoring/boards/phase2Mockup/monitoringPhase2Mockup.component';
import { MonitoringPhase2Component }           from 'src/app/monitoring/boards/phase2/monitoringPhase2.component';
import { MonitoringPhase3Component }           from 'src/app/monitoring/boards/phase3/monitoringPhase3.component';
import { MonitoringMmMarketComponent }         from 'src/app/monitoring/boards/mmMarket/monitoringMmMarket.component';


@Component({
	selector: 'app-monitoringHome',
	templateUrl: './monitoringHome.component.html',
	styleUrls: ['./monitoringHome.component.scss'],
	entryComponents: [
		 MonitoringWelcomeComponent, ChangePasswordComponent, MonitoringPhase3Component, MonitoringPhase2Component, MonitoringPhase2MockupComponent
		,MonitoringMmMarketComponent
	]
})
export class MonitoringHomeComponent implements OnInit, OnDestroy {
	@Input() aside_open;
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
	){
		this.theme.setApp("Administrative_monitoring");
		this.subscribeOnMenu();
	}
	ngOnInit() {
		this.globalService.page  = 101; // dado que inicia con welcome
		this.openSocket();
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
	subscribeOnMenu(){
		this.subscriptions.push(this.eventService.onChangeMainMonitoring.subscribe({
			next: (event: EventMessage) => {
			switch (event.id) {
				case 1:
					this.aside_open = !this.aside_open;
				break;
				default:
					this.globalService.page  = event.id;
					this.clickMenu(event);
				break;
			}
			}
		}));
		
		this.subscriptions.push(this.eventService.onChangeSidebarMenu.subscribe({
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
			
				  this.eventService.sendMainMonitoring(new EventMessage(option, data));
			}
		}));
	}

	inputHeaderComponent(event: EventMessage){
		this.eventService.sendMainMonitoring(event);
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
			case 101:
				this.viewContainerRef.createComponent(
					this.componentFactoryResolver.resolveComponentFactory(MonitoringWelcomeComponent)
				).changeDetectorRef.detectChanges();
			break;
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

