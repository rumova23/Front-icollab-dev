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
  selector: 'app-safeNewEvent',
  templateUrl: './safeNewEvent.component.html',
  styleUrls: ['./safeNewEvent.component.scss']
})
export class SafeNewEventComponent implements OnInit {

    titulo: String = "Evento / Nuevo";
    itemNewEvent: ItemNewEvent = new ItemNewEvent();
    formControls = this.itemNewEvent.formControls;
    formControlsObservations = this.itemNewEvent.formControlsObservations;
    formControlsOther = this.itemNewEvent.formControlsOther;

    eventObservations: Array<any> = []; // lista para la tabla
    newEventtForm: FormGroup;
    observationsForm: FormGroup;
    otherForm: FormGroup;
    
    eventsDatasource = new MatTableDataSource<any>();
    //registros = new MatTableDataSource<any>(ELEMENT_DATA);
    columns: string[] = ['orden','observaciones','fecha','hora','usuario','rm'];
    registros_x_pagina = [50,100,250,500];

 



    
    @ViewChild('autosize') autosize: CdkTextareaAutosize;
    constructor(private fb: FormBuilder,
      private catalogoMaestroService: CatalogoMaestroService) { }
    @ViewChild(MatPaginator) paginator: MatPaginator;
    ngOnInit() {

      
      this.newEventtForm = this.fb.group({
        //datos de general
        'Fecha inicio': new FormControl('', Validators.required),
        'Hora inicio': new FormControl('', Validators.required),
        'Fecha Final': new FormControl('', Validators.required),
        'Hora Final': new FormControl('', Validators.required),
        'Combustible': new FormControl('', Validators.required),
        'Potencia MW': new FormControl('', Validators.required),
        'Perdida en MW': new FormControl('', Validators.required),
        'Estatus': new FormControl('', Validators.required),
        'Claevento': new FormControl('', Validators.required),
        'Evento': new FormControl('', Validators.required),
        'Contrato Afectado': new FormControl('', Validators.required),
        'RealCCDV': new FormControl('', Validators.required),
        'BT': new FormControl('', Validators.required),
        'MEM': new FormControl('', Validators.required),
        'MW Ofertados': new FormControl('', Validators.required),
        'Servicios Conexos': new FormControl('', Validators.required),
      });

      this.observationsForm = this.fb.group({
        'observations': new FormControl('', Validators.required)
      });
      
      this.otherForm = this.fb.group({
        "Unidad": new FormControl('', Validators.required),
        "observations" : new FormControl('', Validators.required),
        "Licencia" : new FormControl('', Validators.required),
        "Equipo": new FormControl('', Validators.required),
        "Carga Inicial MW" : new FormControl('', Validators.required),
        "Carga Final MW" : new FormControl('', Validators.required),
        "Tipos de Eventos": new FormControl('', Validators.required),
        "Fuente": new FormControl('', Validators.required),
        "nopcenaceOpen": new FormControl('', Validators.required),
        "apopcenaceOpen": new FormControl('', Validators.required),
        "nopeatOpen": new FormControl('', Validators.required),
        "nopcenaceclose": new FormControl('', Validators.required),
        "apopclose": new FormControl('', Validators.required),
        "nopclose": new FormControl('', Validators.required),
      });



      this.eventsDatasource.paginator = this.paginator;


    }
    
    alert = function(arg){
        alert(arg);
    }
    save(value) {
      console.log(value);
      
    }
    saveObservations(value) {
      this.eventObservations.push({orden:'1',observaciones:value.observations,fecha:'14/04/2019',hora:'14:55',usuario:'Juan Robles Morales'});
      console.log(this.eventObservations);
      this.eventsDatasource.data = this.eventObservations;
      this.eventObservations.slice();
      this.observationsForm.reset();
    }
    
    deleteObservations(i) {
      this.eventObservations.splice(i, 1);
      this.eventsDatasource.data = this.eventObservations;
    }
  }
  