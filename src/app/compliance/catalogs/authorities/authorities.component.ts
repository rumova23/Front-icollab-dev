import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { CatalogType } from '../../models/CatalogType';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { EventService } from 'src/app/core/services/event.service';

export interface catalogo {
  orden: string;
  id: String;
  autoridad: string;
  activo: string;
  ver: string;
  modificar: string;
  eliminar: string;
}

const ELEMENT_DATA: catalogo[] = [
  { orden: '1', id: '1', autoridad: 'Pagos', activo: 'Si', ver: '/catalogo-autoridades-editar', modificar: '/catalogo-autoridades-editar', eliminar: '/catalogo-autoridades-editar' },
  { orden: '2', id: '2', autoridad: 'Reportes', activo: 'si', ver: '/catalogo-autoridades-editar', modificar: '/catalogo-autoridades-editar', eliminar: '/catalogo-autoridades-editar' },
  { orden: '3', id: '3', autoridad: 'Notificaciones', activo: 'si', ver: '/catalogo-autoridades-editar', modificar: '/catalogo-autoridades-editar', eliminar: '/catalogo-autoridades-editar' },
];

@Component({
  selector: 'app-authorities',
  templateUrl: './authorities.component.html',
  styleUrls: ['./authorities.component.scss']
})
export class AuthoritiesComponent implements OnInit {
  titulo: String = "Catálogos / Autoridades";
  registros = new MatTableDataSource<catalogo>(ELEMENT_DATA);
  columnas: string[] = ['orden', 'id', 'autoridad', 'activo', 'ver', 'modificar', 'eliminar'];
  filtros = [
    { label: "Autoridad", inputtype: "text" },
    { label: "Activo", inputtype: "text" },
  ];
  filtrobtn = { label: "buscar" };
  registros_x_pagina = [2, 5, 10, 20, 30];

  constructor(private eventService: EventService) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.registros.paginator = this.paginator;
  }

  action(option: number, id: any) {
    let type: CatalogType = {};
    switch(option) {
       case 1:
       type = {id: id, action: 'nuevo',
        name: null}
       break;
       case 2:
       type = {id: id, action: 'ver',
       name: null}
       break;
       case 3:
       type = {id: id, action: 'edit',
        name: null}
       break;
    }
    console.log(type);
    //this.eventService.sendMainCompliance(new EventMessage(5, type));
 }

  alert = function (arg) {
    alert(arg);
  }
}
