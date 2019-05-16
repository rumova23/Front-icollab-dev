import { Component, OnInit } from '@angular/core';
export interface Inputs {
  label:String;
  inputtype:String;
  value ?: String;
  checked?:boolean;
  disabled?:boolean;
}
@Component({
  selector: 'app-applicationsTypesEdit',
  templateUrl: './applicationsTypesEdit.component.html',
  styleUrls: ['./applicationsTypesEdit.component.scss']
})
export class ApplicationsTypesEditComponent implements OnInit {
  titulo:String = "Editar Catalogo de Tipo de Aplicaciónes";
  inputs:Inputs[] = [
    {label:"ID",inputtype:"text",value:"223696585",disabled:true},
    {label:"Tipo de Aplicación",inputtype:"text"},
    {label:"Activo",inputtype:"checkbox",checked:true},
  ];
  constructor() { }

  ngOnInit() {
  }

}
