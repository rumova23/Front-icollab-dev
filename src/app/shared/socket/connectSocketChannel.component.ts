import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConnectSocketComponent       } from './connectSocket.component';
import { GlobalService                } from 'src/app/core/globals/global.service';
import { SecurityService              } from 'src/app/core/services/security.service';
import { SocketService                } from 'src/app/core/services/socket.service';
import { EventService                 } from 'src/app/core/services/event.service';
import { Subscription } from 'rxjs';
import { EventMessage } from 'src/app/core/models/EventMessage';

@Component({
	selector: 'app-connect-socket-channel',
	template: `NO UI TO BE FOUND HERE!`
})
export class ConnectSocketChannelComponent extends ConnectSocketComponent implements OnInit, OnDestroy {
	public chanels                 : Array<string>  = [];
	public subscriptionsPerChannel : Array<string>  = []; //tiene el listado de los keys de subscriptions que solo corresponden a los canales del socket

	constructor(
		public globalService       : GlobalService ,
		public eventService        : EventService  ,
		public socketService       : SocketService ,
		public securityService    : SecurityService,
	){
		super(globalService,securityService,socketService,eventService);
	}

	ngOnInit() {
		this.subscribeSocketOnStatus();
		this.subscribeSocketChanels();
	}
	ngOnDestroy(){
		this.connectSocketChannelNgOnDestroy();
	}

	connectSocketChannelNgOnDestroy(){
		for (const iterator in this.subscriptions) {
			this.subscriptions[iterator].unsubscribe();
		}
		this.unsubscribeSocketChanels();
	}
	subscribeSocketOnStatus(){
		if(this.subscriptions['onChangeSocketConnect']  == undefined || this.subscriptions["onChangeSocketConnect"].isStopped==true){
			this.subscriptions['onChangeSocketConnect'] = this.eventService.onChangeSocketConnect
				.subscribe({
					next: (event: EventMessage) => {
						if(event.id === 0){
							this.unsubscribeSocketChanels();
							this.whenLosingConnection();
						}else if(event.id === 1){
							this.subscribeSocketChanels();
						}
					}
				}
			);
		}
	}
	subscribeSocketChannel(strChannel:string) {
		let strChannelErr : string = `${strChannel}-error`;
		this.addSubscriptionsPerChannel([strChannel, strChannelErr]);
		this.addChanels([strChannel]);

		if(this.globalService.socketConnect){
			debugger;
			let channel                       = this.socketService.suscribeChannel(strChannel);
			this.subscriptions[strChannelErr] = this.socketService.onChannelError(channel - 1).subscribe((errorChannel: any) => { console.log(strChannelErr, errorChannel); });
			this.subscriptions[strChannel]    = this.socketService.onChannelWatch(channel - 1)
				.subscribe((data) => {
					this.dataAdapter(data);
				});
		}else{
			this.subscribeOpenSocket();
			this.subscribeSocketOnStatus();
		}
	}
	subscribeSocketChanels(){
		for (const channel of this.chanels) {
			this.subscribeSocketChannel(channel);
		}
	}
	addSubscriptionsPerChannel(channels:Array<string>){
		for (const channel of channels) {
			if(! this.subscriptionsPerChannel.includes(channel) ){
				this.subscriptionsPerChannel.push(channel);
			}
		}
	}
	addChanels(channels:Array<string>){
		for (const channel of channels) {
			if(! this.chanels.includes(channel) ){
				this.chanels.push(channel);
			}
		}
	}
	
	unsubscribeSocketChanels(){
		for (const event of this.subscriptionsPerChannel) {
			if(this.subscriptions[event] != undefined && this.subscriptions[event]['isStopped']==false){
				this.subscriptions[event].unsubscribe();
			}
		}
		for (const chanel of this.chanels) {
			this.socketService.removeChannel(chanel);
		}
	}

	dataAdapter(data:any){
	}
	whenLosingConnection(){
		/*Esto es un ejemplo ya que el contenido sera sobreescrito por quien hereda */
	}
}
