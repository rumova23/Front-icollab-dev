import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';

export interface catalogo {
  orden: string;
  id:String;
  tipo_aplicaion: string;
  activo: string;
  ver: string;
  modificar: string;
  eliminar: string;
}

const ELEMENT_DATA: catalogo[] = [
  {orden:'1',id:'1',tipo_aplicaion:'Pagos',activo:'Si',ver:'/catalogo-tipo-aplicaciones-editar',modificar:'/catalogo-tipo-aplicaciones-editar',eliminar:'/catalogo-tipo-aplicaciones-editar'},
  {orden:'2',id:'2',tipo_aplicaion:'Reportes',activo:'si',ver:'/catalogo-tipo-aplicaciones-editar',modificar:'/catalogo-tipo-aplicaciones-editar',eliminar:'/catalogo-tipo-aplicaciones-editar'},
  {orden:'3',id:'3',tipo_aplicaion:'Notificaciones',activo:'si',ver:'/catalogo-tipo-aplicaciones-editar',modificar:'/catalogo-tipo-aplicaciones-editar',eliminar:'/catalogo-tipo-aplicaciones-editar'},
];

@Component({
  selector: 'app-applicationsTypes',
  templateUrl: './applicationsTypes.component.html',
  styleUrls: ['./applicationsTypes.component.scss']
})
export class ApplicationsTypesComponent implements OnInit {
  titulo: String = "Catálogos / Tipos de Aplicaciones";
  registros = new MatTableDataSource<catalogo>(ELEMENT_DATA);
  columnas: string[] = ['orden','id','tipo_aplicaion','activo','ver','modificar','eliminar'];
  filtros = [
    {label:"Tipo de Aplicaión",inputtype:"text"},
    {label:"Activo",inputtype:"text"},
  ];
  filtrobtn = {label:"buscar"};
  registros_x_pagina = [2, 5, 10, 20,30];

  constructor() { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    this.registros.paginator = this.paginator;
    this.registros.sort = this.sort;
  }
  alert = function(arg){
      alert(arg);
  }
}
