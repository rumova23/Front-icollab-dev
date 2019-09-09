import { Component, OnInit } from '@angular/core';
import { Subscription, Observable, timer } from 'rxjs';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { SocketService } from 'src/app/core/services/socket.service';

@Component({
  selector: 'app-base-socket',
  template: `NO UI TO BE FOUND HERE!`
})
export class MonitoringBaseSocketOnComponent implements OnInit {
	public subscriptions           : Subscription[] = [];
	public timeCurrent             : Date = new Date();
	public timePast                : Date = new Date();
	public subscriptionsPerChannel ;
	public chanels                 ;
	public time_refreseh_data      : number;


	constructor(
		public eventService       : EventService,
		public socketService      : SocketService
	) { }

	ngOnInit() {
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
	subscribeSocketChanels(){
		
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
	
	check_time_refreseh_data(){
		// se le resta 1 porque elsimple echo de esperar al siguiente cambio y evaluacion tarda un segundo 
		// esto es porque usamos this.fechaActual
		return (this.time_refreseh_data - 1) < ( ( this.timeCurrent.getTime() - this.timePast.getTime() ) / 1000) ;
	}
	whenLosingConnection(){

	}
	
}
