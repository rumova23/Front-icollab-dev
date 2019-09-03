import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { EventService } from 'src/app/core/services/event.service';
import { ChangePasswordComponent } from 'src/app/common/changePassword/changePassword.component';
import { GlobalService } from 'src/app/core/globals/global.service';
import { SecurityService } from 'src/app/core/services/security.service';
import { MonitoringPhase3Component } from '../boards/phase3/monitoringPhase3.component';
import { MonitoringPhase2Component } from '../boards/phase2/monitoringPhase2.component';
 
import { Validate } from 'src/app/core/helpers/util.validator.';
import { SocketService } from 'src/app/core/services/socket.service';
import { EventSocket } from 'src/app/core/models/EventSocket';
import { Observable, timer, Subscription } from 'rxjs';
import { MonitoringWelcomeComponent } from './welcome/monitoringWelcome.component';
import { ThemeService } from 'src/app/core/globals/theme';

@Component({
  selector: 'app-monitoringHome',
  templateUrl: './monitoringHome.component.html',
  styleUrls: ['./monitoringHome.component.scss'],
  entryComponents: [
    MonitoringWelcomeComponent, ChangePasswordComponent, MonitoringPhase3Component, MonitoringPhase2Component
  ]
})
export class MonitoringHomeComponent implements OnInit, OnDestroy {
	@Input() aside_open;
	@ViewChild('container', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;
	private subscriptions : Subscription[] = [];
	private everySecond   : Observable<number> = timer(0,8000);


	constructor(
		private route: ActivatedRoute,
		public  globalService: GlobalService,
		public  theme:ThemeService,
		private componentFactoryResolver: ComponentFactoryResolver,
		private eventService: EventService,
		private securityService: SecurityService,
		private socketService: SocketService
	) {
		this.theme.setApp("Administrative_monitoring");
		this.globalService.plant = this.securityService.loadPlants()[0];
		this.subscribeOnMenu();
	}
	ngOnInit() {
		this.globalService.page  = 101; // dado que inicia con welcome
		this.openSocket();
	}
	ngAfterViewInit() {
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
			const token = this.securityService.getToken();        
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
			console.log("Click en Aside",event);
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
		generoId = generoId['generoId'];
		return generoId;
	}
}

