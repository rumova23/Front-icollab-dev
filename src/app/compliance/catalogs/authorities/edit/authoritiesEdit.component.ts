import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';

export interface Inputs {
  label:String;
  inputtype:String;
  value ?: String;
  checked?:boolean;
  disabled?:boolean;
}
@Component({
  selector: 'app-authoritiesEdit',
  templateUrl: './authoritiesEdit.component.html',
  styleUrls: ['./authoritiesEdit.component.scss']
})
export class AuthoritiesEditComponent implements OnInit {
  titulo:String = "Editar Catalogo de Autoridades";
  inputs:Inputs[] = [
    {label:"ID",inputtype:"text",value:"223696585",disabled:true},
    {label:"Autoridad",inputtype:"text"},
    {label:"Activo",inputtype:"checkbox",checked:true},
  ];
  constructor(private eventService: EventService) { }

  ngOnInit() {
  }


  regresar(){
    this.eventService.sendMainCompliance(new EventMessage(6, {}));
  }

}
