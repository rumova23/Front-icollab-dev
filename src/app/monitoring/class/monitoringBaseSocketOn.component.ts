import { Component, OnInit   } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { EventService        } from 'src/app/core/services/event.service';
import { EventMessage        } from 'src/app/core/models/EventMessage';
import { SocketService       } from 'src/app/core/services/socket.service';
import { GlobalService       } from 'src/app/core/globals/global.service';
import { MonitoringTrService } from '../services/monitoringTr.service';
import { PiServerBox         } from '../models/piServer/piServerBox';

@Component({
  selector: 'app-base-socket',
  template: `NO UI TO BE FOUND HERE!`
})
export class MonitoringBaseSocketOnComponent implements OnInit {
	public PiIsRun                 : boolean        = false;
	public subscriptions           : Subscription[] = [];          // almacena las todos los observables
	public timeCurrent             : Date           = new Date();  // Se actualiza cada segundo subscribeEverySecond();
	public subscriptionsPerChannel : Array<string>  = []; //tiene el listado de los keys de subscriptions que solo corresponden a los canales del socket
	public chanels                 : Array<string>  = [];


	constructor(
		public globalService       : GlobalService ,
		public eventService        : EventService,
		public socketService       : SocketService,
		public monitoringTrService : MonitoringTrService
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
		});
	}
	subscribeSocketOnStatus(){
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


		this.subscriptions['back-pi-isrun'] = this.monitoringTrService.getSocketChanelbackPiIsRun()
			.subscribe((data:any)=>{
				if(data.isrun == 0){
					this.PiIsRun = false;
					this.whenLosingConnection();
					console.log(data);
				}else if(data.isrun == 1){
					this.PiIsRun=true;
					
				}
				//console.log("back-pi-isrun::",data);
			});
		this.subscriptions['back-pi-isrun-error'] = this.monitoringTrService.getSocketChanelbackPiIsRunError()
			.subscribe((errorChannel:any)=>{
				//console.log("errorChannel back-pi-isrun-isrun::",errorChannel);
			});
	}
	subscribeSocketChanelAguila(){
		if(this.globalService.plant.name === "AGUILA"){
			this.addSubscriptionsPerChannel(['pi-aguila','pi-aguila-error',]);
			this.addChanels(["pi-aguila"]);

			this.subscriptions['pi-aguila-error'] = this.monitoringTrService.getSocketPiAguilaError()
			.subscribe((errorChannel: any) => {console.log("pi-aguila-error",errorChannel);});

			this.subscriptions['pi-aguila'] = this.monitoringTrService.getSocketPiAguila()
			.subscribe((data: PiServerBox) => {
				this.dataAdapter(data);
			});
		}
	}
	subscribeSocketChanelSol(){
		if(this.globalService.plant.name === "SOL"){
			this.addSubscriptionsPerChannel(['pi-sol','pi-sol-error']);
			this.addChanels(["pi-sol"]);

			this.subscriptions['pi-sol-error'] = this.monitoringTrService.getSocketPiSolError()
			.subscribe((errorChannel: any) => {/*console.log("pi-sol-error",errorChannel);*/});

			this.subscriptions['pi-sol'] = this.monitoringTrService.getSocketPiSol()
			.subscribe((data: PiServerBox) => {
				this.dataAdapter(data);
			});
		}
	}
	subscribeSocketChanelPiServers(){
		this.addSubscriptionsPerChannel(['pi-servers','pi-servers-error']);
		this.addChanels(["pi-servers"]);

		this.subscriptions['pi-servers-error'] = this.monitoringTrService.getSocketPiServersError()
		.subscribe((errorChannel: any) => {console.log("pi-servers-error",errorChannel);});

		this.subscriptions['pi-servers'] = this.monitoringTrService.getSocketPiServers()
		.subscribe((data: PiServerBox) => {
			this.dataAdapter(data);
		});
	}
	subscribeSocketChanelMmMarketAguila(){
		//mm-market-aguila
		this.addSubscriptionsPerChannel(["mm-market-aguila","mm-market-aguila-error"]);
		this.addChanels(["mm-market-aguila"]);
		let channel = this.socketService.suscribeChannel("mm-market-aguila");
		this.subscriptions["mm-market-aguila-error"] = this.socketService.onChannelError(channel - 1)
		.subscribe((errorChannel: any) => {/*console.log("mm-market-aguila-error",errorChannel);*/});

		this.subscriptions["mm-market-aguila"] = this.socketService.onChannelWatch(channel - 1)
		.subscribe((data: any) => {
			this.dataAdapter(data);
		});
	}
	subscribeSocketChanelWeather(){
		this.addSubscriptionsPerChannel(['weather','weather-error']);
		this.addChanels(["weather"]);
		let channel = this.socketService.suscribeChannel("weather");
		this.subscriptions['weather-error'] = this.socketService.onChannelError(channel - 1)
		.subscribe((errorChannel: any) => {console.log("weather-error",errorChannel);});

		this.subscriptions['weather'] = this.socketService.onChannelWatch(channel - 1)
		.subscribe((data: any) => {
			this.dataAdapter(data);
		});
	}
	subscribeSocketChanelForecast(){
		this.addSubscriptionsPerChannel(['forecast','forecast-error']);
		this.addChanels(["forecast"]);
		let channel = this.socketService.suscribeChannel("forecast");
		this.subscriptions['forecast-error'] = this.socketService.onChannelError(channel - 1)
		.subscribe((errorChannel: any) => {/*console.log("forecast-error",errorChannel);*/});

		this.subscriptions['forecast'] = this.socketService.onChannelWatch(channel - 1)
		.subscribe((data: any) => {
			this.dataAdapter(data);
		});
	}
	subscribeSocketChanelHourly(){
		this.addSubscriptionsPerChannel(['hourly','hourly-error']);
		this.addChanels(["hourly"]);
		let channel = this.socketService.suscribeChannel("hourly");
		this.subscriptions['hourly-error'] = this.socketService.onChannelError(channel - 1)
		.subscribe((errorChannel: any) => {/*console.log("hourly-error",errorChannel);*/});

		this.subscriptions['hourly'] = this.socketService.onChannelWatch(channel - 1)
		.subscribe((data: any) => {
			this.dataAdapter(data);
		});
	}
	subscribeSocketChanels(){
		if(this.globalService.socketConnect){
			this.subscribeSocketChanelbackPiIsRun();
			this.subscribeSocketChanelAguila();
			this.subscribeSocketChanelSol();
		}
	}
    getStreamsetsInterpolatedLast24Hours(webids) {
        this.subscriptions.push(
            this.monitoringTrService.getStreamsetsInterpolatedLast24Hours(this.globalService.plant.id, webids).subscribe(
                (box: PiServerBox) => {
                    box.name = "getStreamsetsInterpolatedLast24Hours";
                    this.dataAdapter(box);
                },
                errorData => {
                    //this.toastr.errorToastr(Constants.ERROR_LOAD, 'Clima actual');
                }
            )
        );
    }
	check_time_refreseh_data(time_refreseh_data_seconds:number, timePast:Date){
		// se le resta 1 porque elsimple echo de esperar al siguiente cambio y evaluacion tarda un segundo 
		// esto es porque usamos this.fechaActual
			/*
			console.log("fechaActualAnterior::: ",timePast);
			console.log("fechaActual::: ",this.timeCurrent);
			console.log("time_refreseh_data::: ",time_refreseh_data);
			var seconds = (this.timeCurrent.getTime() - timePast.getTime()) / 1000;
			console.log("fechaActual - Anterior seconds ::: ",seconds);//*/

		return (time_refreseh_data_seconds -1) < ( ( this.timeCurrent.getTime() - timePast.getTime() ) / 1000) ;
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
	getTime(){
		let checkTime = function(i) {
			if (i < 10) {
			  i = "0" + i;
			}
			return i;
		  }
		return checkTime(this.timeCurrent.getHours()) + ":" + checkTime(this.timeCurrent.getMinutes()) + ":" + checkTime(this.timeCurrent.getSeconds());
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
