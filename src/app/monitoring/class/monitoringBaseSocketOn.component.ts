import { Component, OnInit } from '@angular/core';
import { Subscription, Observable, timer } from 'rxjs';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { SocketService } from 'src/app/core/services/socket.service';
import { GlobalService } from 'src/app/core/globals/global.service';

@Component({
  selector: 'app-base-socket',
  template: `NO UI TO BE FOUND HERE!`
})
export class MonitoringBaseSocketOnComponent implements OnInit {
	public subscriptions           : Subscription[] = [];
	public timeCurrent             : Date = new Date();
	public timePast                : Date = new Date();
	public subscriptionsPerChannel : Array<string> = [];
	public chanels                 : Array<string> = [];
	public time_refreseh_data      : number;


	constructor(
		public globalService      : GlobalService ,
		public eventService       : EventService,
		public socketService      : SocketService
	) { }

	ngOnInit() {
		/*Esto es un ejemplo ya que el contenido sera sobreescrito por quien hereda */
		this.subscribeEverySecond();
		this.subscribeSocketOnStatus();
		this.subscribeSocketChanels();
	}
	ngOnDestroy(){
		for (const iterator in this.subscriptions) {
			this.subscriptions[iterator].unsubscribe();
		}
		this.unsubscribeSocketChanels();
	}
	subscribeEverySecond(){
		this.subscriptions['everySecond'] = timer(0,1000).subscribe(()=>{
			this.timeCurrent = new Date();
      
			/*console.log("fechaActualAnterior::: ",this.fechaActualAnterior);
			console.log("fechaActual::: ",this.fechaActual);
			var seconds = (this.fechaActual.getTime() - this.fechaActualAnterior.getTime()) / 1000;
			console.log("fechaActual - Anterior seconds ::: ",seconds);//*/
			
		});
	}
	subscribeSocketOnStatus(){
		this.subscriptions['onChangeSocketConnect'] = this.eventService.onChangeSocketConnect.subscribe({
			next: (event: EventMessage) => {
				if(event.id === 0){
					this.unsubscribeSocketChanels();
					this.whenLosingConnection()
				}else if(event.id === 1){
					this.subscribeSocketChanels();
				}
			}
		});
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
	subscribeSocketChanelbackPiIsRun(){
		this.addSubscriptionsPerChannel(['back-pi-isrun','back-pi-isrun-error']);
		this.addChanels(["back-pi-isrun"]);

		let channelBackPiIsRun = this.socketService.suscribeChannel("back-pi-isrun");

		this.subscriptions['back-pi-isrun'] = this.socketService.onChannelWatch(channelBackPiIsRun-1)
			.subscribe((data:any)=>{
				if(data.isrun == 0){
					this.whenLosingConnection();
				}else if(data.isrun == 1){
					if(data.backPi['status-pi-aguila'] == 0){
						if(this.globalService.plant.name === "AGUILA"){
							this.whenLosingConnection();
						}
					}else if(data.backPi['status-pi-sol'] == 0){
						if(this.globalService.plant.name === "SOL"){
							this.whenLosingConnection();
						}
					}else if(data.backPi['status-doc-aguila'] == 0){
					}else if(data.backPi['status-doc-sol'] == 0){
					}
				}
				//console.log("back-pi-isrun::",data);
			});
		this.subscriptions['back-pi-isrun-error'] = this.socketService.onChannelError(channelBackPiIsRun-1)
			.subscribe((errorChannel:any)=>{
				//console.log("errorChannel back-pi-isrun-isrun::",errorChannel);
			});
	}
	subscribeSocketChanelAguila(){
		if(this.globalService.plant.name === "AGUILA"){
			this.addSubscriptionsPerChannel(['pi-aguila','pi-aguila-error',]);
			this.addChanels(["pi-aguila"]);
			let channelPiAguila = this.socketService.suscribeChannel("pi-aguila");
			this.subscriptions['pi-aguila-error'] = this.socketService.onChannelError(channelPiAguila - 1)
			.subscribe((errorChannel: any) => {console.log("pi-aguila-error",errorChannel);});

			this.subscriptions['pi-aguila'] = this.socketService.onChannelWatch(channelPiAguila - 1)
			.subscribe((data: any) => {
				this.dataAdapter(data);
			});
		}
	}
	subscribeSocketChanelSol(){
		if(this.globalService.plant.name === "SOL"){
			this.addSubscriptionsPerChannel(['pi-sol','pi-sol-error']);
			this.addChanels(["pi-sol"]);
			let channelPiSol = this.socketService.suscribeChannel("pi-sol");
			this.subscriptions['pi-sol-error'] = this.socketService.onChannelError(channelPiSol - 1)
			.subscribe((errorChannel: any) => {/*console.log("pi-sol-error",errorChannel);*/});

			this.subscriptions['pi-sol'] = this.socketService.onChannelWatch(channelPiSol - 1)
			.subscribe((data: any) => {
				this.dataAdapter(data);
			});
		}
	}
	subscribeSocketChanels(){
		if(this.globalService.socketConnect){
			this.subscribeSocketChanelbackPiIsRun();
			this.subscribeSocketChanelAguila();
			this.subscribeSocketChanelSol();
		}
	}

	check_time_refreseh_data(){
		// se le resta 1 porque elsimple echo de esperar al siguiente cambio y evaluacion tarda un segundo 
		// esto es porque usamos this.fechaActual
		return (this.time_refreseh_data - 1) < ( ( this.timeCurrent.getTime() - this.timePast.getTime() ) / 1000) ;
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


	/*
	 * Metodos que se tienen que definir en el controlador que hereda
	*/
	whenLosingConnection(){
		/*Esto es un ejemplo ya que el contenido sera sobreescrito por quien hereda */
	}
	dataAdapter(data){

	}
	
}
