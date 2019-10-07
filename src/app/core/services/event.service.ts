import { Injectable, EventEmitter } from '@angular/core';
import { EventMessage } from '../models/EventMessage';



@Injectable()
export class EventService {

    public onChangeMainCompliance: EventEmitter<EventMessage> = new EventEmitter<EventMessage>();

    public onChangeMainSecurity: EventEmitter<EventMessage> = new EventEmitter<EventMessage>();

    public onChangeMainSafe: EventEmitter<EventMessage> = new EventEmitter<EventMessage>();

    public onChangeApp: EventEmitter<EventMessage> = new EventEmitter<EventMessage>();

    public onChangePlant: EventEmitter<EventMessage> = new EventEmitter<EventMessage>();

    public onChangeMainLinkMockUp : EventEmitter<EventMessage> = new EventEmitter<EventMessage>();

    public onChangeMainMonitoring : EventEmitter<EventMessage> = new EventEmitter<EventMessage>();

    public onChangeSocketConnect  : EventEmitter<EventMessage> = new EventEmitter<EventMessage>();

    public onChangeSidebarMenu    : EventEmitter<EventMessage> = new EventEmitter<EventMessage>();

    public onChangeNavBar         : EventEmitter<EventMessage> = new EventEmitter<EventMessage>();

    public onChangePage           : EventEmitter<EventMessage> = new EventEmitter<EventMessage>();



    public sendMainCompliance(message: EventMessage) {
        this.onChangeMainCompliance.emit(message);
    }

    public sendMainSecurity(message: EventMessage) {
        this.onChangeMainSecurity.emit(message);
    }
    
    public sendMainMonitoring(message: EventMessage) {
        this.onChangeMainMonitoring.emit(message);
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

    public sendSocketConnect(message: EventMessage) {
        this.onChangeSocketConnect.emit(message);
    }

    public sendChangeSidebarMenu(message: EventMessage) {
        this.onChangeSidebarMenu.emit(message);
    }

    public sendChangeNavBar(message: EventMessage) {
        this.onChangeNavBar.emit(message);
    }

    public sendChangePage(message: EventMessage) {
        this.onChangePage.emit(message);
    }

}
