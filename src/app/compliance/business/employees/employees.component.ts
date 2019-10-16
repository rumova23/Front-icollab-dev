import { Component, OnInit, ViewChild } from '@angular/core';
import { Input  } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Employee } from '../../models/Employee';
import { GlobalService } from 'src/app/core/globals/global.service';


const ELEMENT_DATA: Employee[] = [
  { orden: '1', nombre: 'Juan', appaterno: 'Robles', apmaterno: 'Morales', genero: 'Masculino', posicion: 'Gerente', departamento: 'Operación', puesto: 'Gerente de Operaciónes', lugartrabajo: 'Planta Tuxpan V', ver: 'atributo', modificar: 'atributo', pdf: 'atributo' },
  { orden: '2', nombre: 'Pedro', appaterno: 'Toribio', apmaterno: 'Marquez', genero: 'Masculino', posicion: 'Operador', departamento: 'Operación', puesto: 'Operador 1', lugartrabajo: 'Planta Tuxpan V', ver: 'atributo', modificar: 'atributo', pdf: 'atributo' },
  { orden: '3', nombre: 'Raúl', appaterno: 'Mondragon', apmaterno: 'Ferrero', genero: 'Masculino', posicion: 'Controlador', departamento: 'Operación', puesto: 'Controlador de Finanzas', lugartrabajo: 'Planta Tuxpan V', ver: 'atributo', modificar: 'atributo', pdf: 'atributo' },
];

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  @Input() asideOpen;
  
  titulo: String = "Catálogos / Empleados";
  registros = new MatTableDataSource<Employee>(ELEMENT_DATA);
  columnas: string[] = ['orden', 'nombre', 'appaterno', 'apmaterno', 'genero', 'posicion', 'departamento', 'puesto', 'lugartrabajo', 'ver', 'modificar', 'pdf'];
  filtros = [
    { label: "Nombre", inputtype: "text" },
    { label: "Apellido Paterno	", inputtype: "text" },
    { label: "Apellido Materno", inputtype: "text" },
    { label: "Género", inputtype: "text" },
    { label: "Posición", inputtype: "text" },
    { label: "Departamento", inputtype: "text" },
    { label: "Puesto", inputtype: "text" },
    { label: "Lugar de trabajo", inputtype: "text" },
  ];
  filtrobtn = { label: "buscar" };
  registros_x_pagina = [2, 5, 10, 20, 30];

  constructor(
		public  globalService            : GlobalService) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.registros.paginator = this.paginator;
  }
  alert = function (arg) {
    alert(arg);
  }
}
