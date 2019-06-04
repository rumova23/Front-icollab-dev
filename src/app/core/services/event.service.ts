import { Injectable, EventEmitter } from '@angular/core';
import { EventMessage } from '../models/EventMessage';



@Injectable()
export class EventService {

    public onChangeMainCompliance: EventEmitter<EventMessage> = new EventEmitter<EventMessage>();

    public onChangeMainSecurity: EventEmitter<EventMessage> = new EventEmitter<EventMessage>();

    public onChangeMainSafe: EventEmitter<EventMessage> = new EventEmitter<EventMessage>();

    public onChangeApp: EventEmitter<EventMessage> = new EventEmitter<EventMessage>();

    public onChangePlant: EventEmitter<EventMessage> = new EventEmitter<EventMessage>();

    public onChangeMainLinkMockUp: EventEmitter<EventMessage> = new EventEmitter<EventMessage>();



    public sendMainCompliance(message: EventMessage) {
        this.onChangeMainCompliance.emit(message);
    }

    public sendMainSecurity(message: EventMessage) {
        this.onChangeMainSecurity.emit(message);
    }

    public sendMainSafe(message: EventMessage) {
        this.onChangeMainSafe.emit(message);
    }

    public sendApp(message: EventMessage) {
        this.onChangeApp.emit(message);
    }

    public sendPlant(message: EventMessage) {
        this.onChangePlant.emit(message);
    }

    public sendLinkMockUp(message: EventMessage) {
        this.onChangeMainLinkMockUp.emit(message);
    }
}
