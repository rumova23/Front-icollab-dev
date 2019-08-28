import { Injectable }  from '@angular/core';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/core/globals/Constants';
import { EventSocket } from 'src/app/core/models/EventSocket';
declare var socketCluster: any;


@Injectable({
  providedIn: 'root'
})
export class MonitoringSoService {
    private socket: any;
    private options: any;
    private token: any;
    private channels: Array<any> = [];
 
    constructor(private http: HttpClient) { }

    public initSocket(token): void{
      if (this.socket) {
          socketCluster.destroy(this.socket);
      }
      this.token = token;
      this.options = Constants.OPTIONS;
      this.options.query = { token: token };
      this.socket = socketCluster.connect(this.options);
    }
    public onEvent(event: EventSocket): Observable<any> {
        return new Observable<EventSocket>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }

    public suscribeChannel(channel: string) {
        return this.channels.push(this.socket.subscribe(channel));
    }

    public onChannelWatch(index: number): Observable<any> {
        return new Observable<any>(observer => {
            this.channels[index].watch((data: any) => observer.next(data));
        });
    }

}
