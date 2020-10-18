import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Entity } from 'src/app/core/models/Entity';
import { ItemNewEvent } from 'src/app/safe/models/ItemNewEvent';
import { CatalogoMaestroService } from 'src/app/core/services/catalogo-maestro.service';
const ELEMENT_DATA: any[] = [
  {orden:'1',observaciones:'observacion 1',fecha:'14/04/2019',hora:'14:55',usuario:'Juan Robles Morales'},
  {orden:'2',observaciones:'observacion 2',fecha:'14/04/2019',hora:'11:00',usuario:'Pedro Toribio Marquez'},
  {orden:'3',observaciones:'observacion 3',fecha:'14/04/2019',hora:'17:20',usuario:'Raúl Mondragon Ferrero'},
];

@Component({
  selector: 'app-plannedPowersPpaH',
  templateUrl: './plannedPowersPpaH.component.html',
  styleUrls: ['./plannedPowersPpaH.component.scss']
})
export class PlannedPowersPPAHComponent implements OnInit {

  title = "Importación";
  formControls=['Temperatura, Presión, Humedad','Tabla Temperatura','Tabla Humedad','Tabla Presión'];

  
  
      
    constructor() { }
    ngOnInit() {
    }

  }
    