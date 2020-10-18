import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../globals/Constants';
import { EventSocket } from '../models/EventSocket';
declare var socketCluster: any;

@Injectable({ providedIn: 'root' })
export class SocketService {
    private socket: any;
    private options: any;
    private token: any;
    private channels: Array<any> = [];
    constructor() { }
    public initSocket(token): void {
        if (this.socket) {
            socketCluster.destroy(this.socket);
        }
        this.token = token;
        this.options = Constants.OPTIONS;
        this.options.query = { token: token };
        this.socket = socketCluster.connect(this.options);
        return this.socket;
    }
    public closeSocket(){
        if (this.socket) {
            this.removeAllChannels();
            socketCluster.destroy(this.socket);
        }
    }

    public onEvent(event: EventSocket): Observable<any> {
        return new Observable<EventSocket>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }

    public onError(): Observable<any> {
        return new Observable<any>(observer => {
            this.socket.on('error', (data: any) => observer.next(data));
        });
    }

    public login(): Observable<any> {
        return new Observable<any>(observer => {
            this.socket.emit('login', { token: this.token }, (data: any) => observer.next(data));
        });
    }

    public suscribeChannel(channel: string) {
        for(let i = 0; i < this.channels.length; i++){
            if(this.channels[i].name == channel){
                return i+1;
            }
        }
        return this.channels.push(this.socket.subscribe(channel));
    }

    /*public suscribeChannel(channel: string) {
        return this.channels.push(this.socket.subscribe(channel));
    }*/

    public onChannelWatch(index: number): Observable<any> {
        return new Observable<any>(observer => {
            this.channels[index].watch((data: any) => observer.next(data));
        });
    }

    public onChannelError(index: number): Observable<any> {
        return new Observable<any>(observer => {
            this.channels[index].on((data: any) => observer.next(data));
        });
    }

    public removeAllChannels(){
        this.channels.forEach((item, index) => {
            this.channels.splice(index, 1);
        });
    }
    public removeChannel(channel: string) {
        this.channels.forEach((item, index) => {
            if (item.name === channel) {
                this.channels.splice(index, 1);
            }
        });
    }
    /*public removeChannel(channel: string) {
        this.channels.forEach((item, index) => {
            if (item === channel) {
                this.channels.splice(index, 1);
            }
        });
    }*/

    public getChannels(){
        return this.channels;
    }
}
