import { Injectable    } from '@angular/core';
import { HttpClient    } from '@angular/common/http';
import { Observable    } from 'rxjs';
import { map           } from 'rxjs/operators';
import { environment   } from 'src/environments/environment';
import { SocketService } from 'src/app/core/services/socket.service';
import { PiServerBox   } from '../models/piServer/piServerBox';



@Injectable({ providedIn: 'root' })
export class MonitoringTrService {

	constructor(private http: HttpClient, private socketService:SocketService) { }
	/**********************************************************************\
	 *    REST REQUEST
	\**********************************************************************/
	getStreamsetsInterpolatedLast24Hours(plant,tags): Observable<PiServerBox> {
		let url:string = "plantId="+plant;
		for(let tag of tags){url += `&webId=${tag}`;}
		url += '&startTime=*-24h&endTime=*&interval=1h&selectedFields=Items.WebId;Items.Name;Items.Items.Timestamp;Items.Items.Value';
		return this.getStreamsetsInterpolated(url);
	}
	getStreamsetsInterpolatedFromTo(plant,tags,startTime,endTime,interval): Observable<PiServerBox> {
		let url:string = "plantId="+plant;
		for(let tag of tags){url += `&webId=${tag}`;}
		url += `&startTime=${startTime}&endTime=${endTime}&interval=${interval}&selectedFields=Items.WebId;Items.Name;Items.Items.Timestamp;Items.Items.Value`;
		return this.getStreamsetsInterpolated(url);
	}
	getStreamsetsInterpolated(params): Observable<PiServerBox> {
		// tslint:disable-next-line:max-line-length
		// https://192.168.1.175/piwebapi/streamsets/interpolated?webId=P0uQAgHoBd0ku7P3cWOJL6IgGCUAAAU0VSVklET1JfUElcREFBMDgxMDM&webId=P0uQAgHoBd0ku7P3cWOJL6IglyQAAAU0VSVklET1JfUElcUDJBMDgyMTE&
		// startTime='21-08-19 00:00:00 GMT'&endTime=*-10h&interval=1h&selectedFields=Items.WebId;Items.Name;Items.Items.Timestamp;Items.Items.Value&timeZone=America/New_York
		return this.http.get<PiServerBox>(environment.urlTrPi + 'piwebapi/streamsets/interpolated?' + params).pipe(
			map(data => new PiServerBox().deserialize(data))
		);
		//*/
		//return this.http.get(environment.urlTrPi + 'piwebapi/streamsets/interpolated?' + params);
	}

	
	/**********************************************************************\
	 *    SOCKETS 
	\**********************************************************************/
	getSocketChanelbackPiIsRun(): Observable<any>{
		let channel = this.socketService.suscribeChannel("back-pi-isrun");
		return this.socketService.onChannelWatch(channel - 1);
	}
	getSocketChanelbackPiIsRunError(): Observable<any>{
		let channel = this.socketService.suscribeChannel("back-pi-isrun");
		return this.socketService.onChannelError(channel - 1);
	}

	getSocketPiServers(): Observable<PiServerBox>{
		let channel = this.socketService.suscribeChannel("pi-servers");
		return this.socketService.onChannelWatch(channel - 1).pipe(
			map(data => new PiServerBox().deserialize(data))
		);
	}
	getSocketPiServersError(): Observable<any>{
		let channel = this.socketService.suscribeChannel("pi-servers");
		return this.socketService.onChannelError(channel - 1);
	}
	getSocketPiSol(): Observable<PiServerBox>{
		let channel = this.socketService.suscribeChannel("pi-sol");
		return this.socketService.onChannelWatch(channel - 1).pipe(
			map(data => new PiServerBox().deserialize(data))
		);
	}
	getSocketPiSolError(): Observable<any>{
		let channel = this.socketService.suscribeChannel("pi-sol");
		return this.socketService.onChannelError(channel - 1);
	}
	getSocketPiAguila(): Observable<PiServerBox>{
		let channel = this.socketService.suscribeChannel("pi-aguila");
		return this.socketService.onChannelWatch(channel - 1).pipe(
			map(data => new PiServerBox().deserialize(data))
		);
	}
	getSocketPiAguilaError(): Observable<any>{
		let channel = this.socketService.suscribeChannel("pi-aguila");
		return this.socketService.onChannelError(channel - 1);
	}
}
