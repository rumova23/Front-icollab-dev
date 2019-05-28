import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';

export interface catalogo {
    orden: string;
    observaciones:String;
    fecha: string;
    hora: string;
    usuario: string;
  }
  
  const ELEMENT_DATA: catalogo[] = [
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
    frm1_status: any[] = [
      {value: 'abierto', viewValue: 'Abierto'},
      {value: 'cerrado', viewValue: 'Cerrado'}
    ];
  
    registros = new MatTableDataSource<catalogo>(ELEMENT_DATA);
    columnas: string[] = ['orden','observaciones','fecha','hora','usuario'];
    registros_x_pagina = [2, 5, 10, 20,30];
    constructor() { }
    @ViewChild(MatPaginator) paginator: MatPaginator;
    ngOnInit() {
      this.registros.paginator = this.paginator;
    }
    alert = function(arg){
        alert(arg);
    }
  }
  