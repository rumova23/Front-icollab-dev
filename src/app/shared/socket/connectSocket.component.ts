import { Component, OnInit               } from '@angular/core';
import { Subscription, Observable, timer } from 'rxjs';
import { EventMessage                    } from 'src/app/core/models/EventMessage';
import { SocketService                   } from 'src/app/core/services/socket.service';
import { GlobalService                   } from 'src/app/core/globals/global.service';
import { SecurityService                 } from 'src/app/core/services/security.service';
import { Validate                        } from 'src/app/core/helpers/util.validator.';
import { EventSocket                     } from 'src/app/core/models/EventSocket';
import { EventService                    } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-base-connectsocket',
  template: `NO UI TO BE FOUND HERE!`
})
export class ConnectSocketComponent implements OnInit {
	public subscriptions                : Subscription[]     = [];
	public time_to_reconnect_socket     : Observable<number> = timer(0,8000);

	constructor(
		public  globalService            : GlobalService,
		public securityService          : SecurityService,
		public socketService            : SocketService,
		public eventService             : EventService
	) { }

	ngOnInit() {
		this.openSocket();
	}
	ngOnDestroy(){
		for (const iterator in this.subscriptions) {
			this.subscriptions[iterator].unsubscribe();
		}
		this.socketService.closeSocket();
	}
	
	openSocket(){
		if(!this.globalService.socketConnect){
			//const token = this.securityService.getToken();
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
							console.log("Socket Conectado::",this.globalService.socketConnect);
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
			= this.time_to_reconnect_socket.subscribe(second=>{
				console.log("Socket Reconnection in::",second);
				this.openSocket();
			});
		}
	}
	unsubscribeOpenSocket(){
		if(this.subscriptions['openSocket']  != undefined && this.subscriptions["openSocket"].isStopped==false){
			this.subscriptions['openSocket'].unsubscribe();
		}
	}

}
