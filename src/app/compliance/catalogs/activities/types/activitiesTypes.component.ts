import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
export interface catalogo_actividades {
  id: string;
  clasi_actividad: string;
  activo: string;
  ver: string;
  modificar: string;
  pdf: string;
  eliminar: String;
}

const ELEMENT_DATA: catalogo_actividades[] = [
  { id: '1', clasi_actividad: 'Pagos', activo: 'Si', ver: '/catalogo-clasificacion-actividades-editar', modificar: '/catalogo-clasificacion-actividades-editar', pdf: '/catalogo-clasificacion-actividades-editar', eliminar: '/catalogo-clasificacion-actividades-editar' },
  { id: '2', clasi_actividad: 'Reportes', activo: 'si', ver: '/catalogo-clasificacion-actividades-editar', modificar: '/catalogo-clasificacion-actividades-editar', pdf: '/catalogo-clasificacion-actividades-editar', eliminar: '/catalogo-clasificacion-actividades-editar' },
  { id: '3', clasi_actividad: 'Notificaciones', activo: 'si', ver: '/catalogo-clasificacion-actividades-editar', modificar: '/catalogo-clasificacion-actividades-editar', pdf: '/catalogo-clasificacion-actividades-editar', eliminar: '/catalogo-clasificacion-actividades-editar' },
];

@Component({
  selector: 'app-activitiesTypes',
  templateUrl: './activitiesTypes.component.html',
  styleUrls: ['./activitiesTypes.component.scss']
})
export class ActivitiesTypesComponent implements OnInit {
  titulo: String = "Catálogos / Actividades";
  registros = new MatTableDataSource<catalogo_actividades>(ELEMENT_DATA);
  columnas: string[] = ['id', 'clasi_actividad', 'activo', 'ver', 'modificar', 'pdf', 'eliminar'];
  filtros = [
    { label: "Clasificación de Actividad", inputtype: "text" },
    { label: "Activo", inputtype: "text" },
  ];
  filtrobtn = { label: "buscar" };
  registros_x_pagina = [2, 5, 10, 20, 30];


  constructor() { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.registros.paginator = this.paginator;
  }
  alert = function (arg) {
    alert(arg);
  }
}
