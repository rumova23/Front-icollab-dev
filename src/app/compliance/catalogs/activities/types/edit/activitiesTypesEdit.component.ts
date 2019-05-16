import { Component, OnInit } from '@angular/core';
export interface Inputs {
  label: String;
  inputtype: String;
  value?: String;
  checked?: boolean;
  disabled?: boolean;
}
@Component({
  selector: 'app-activitiesTypesEdit',
  templateUrl: './activitiesTypesEdit.component.html',
  styleUrls: ['./activitiesTypesEdit.component.scss']
})
export class ActivitiesTypesEditComponent implements OnInit {
  titulo: String = "Editar Catalogo de Actividades";
  inputs: Inputs[] = [
    { label: "Id Clasificación de Actividad", inputtype: "text", value: "223696585", disabled: true },
    { label: "Clasificación de actividad", inputtype: "text" },
    { label: "Activo", inputtype: "checkbox", checked: true },
  ];
  constructor() { }
  ngOnInit() {
  }

}
