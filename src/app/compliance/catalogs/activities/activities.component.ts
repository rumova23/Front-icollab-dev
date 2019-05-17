import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { TagActividadDTO } from '../../models/TagActividadDTO';
import { TagService } from '../../services/tag.service';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation-dialog.service';
import { CatalogType } from '../../models/CatalogType';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';


@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})

export class ActivitiesComponent implements OnInit {
  titulo: String = "Catálogos / Categorías";
  registros: MatTableDataSource<TagActividadDTO>;
  columnas: string[] = ['orden','actividad','prefijo','activo','ver','modificar','eliminar'];
  filtros = [
    {label:"Actividad",inputtype:"text"},
    {label:"Prefijo",inputtype:"text"},
    {label:"Activo",inputtype:"text"},
  ];
  filtrobtn = {label:"buscar"};
  registros_x_pagina = [50,100,250,500];

  constructor(
      private tagService: TagService,
      public toastr: ToastrManager,
      private globalService: GlobalService,
      private eventService: EventService,
      private confirmationDialogService: ConfirmationDialogService,
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
  
    this.obtenerListaActividades();

  }

  
  obtenerListaActividades(){
    this.tagService.getCatalogoActividades().subscribe(
      respuesta => {
        console.log(respuesta)
        let datos: any;
        datos = respuesta;
        this.registros =  new MatTableDataSource<TagActividadDTO>(datos);
        this.registros.paginator = this.paginator;
        
      },
      error => {
        console.log("Error al obtener catalgo de actividades.");
        console.log(<any> error)
      }
    )
  }

  public eliminarActividad(actividad: any) {
    this.confirmationDialogService.confirm('Por favor, confirme..', 
          'Está seguro de eliminar la actividad? ' + actividad.nombre)
    .then((confirmed) => {
        if (confirmed){
          this.eliminarActividadConfirm(actividad)
        }
      })
    .catch(() => console.log('Cancelo'));
  }

  eliminarActividadConfirm(actividad: any){
    console.log(actividad);
    this.tagService.eliminarActividad(actividad.actividadId).subscribe(
      respuesta => {
        let res: any;
        res = respuesta;
        if ( res.clave == 0 ){
          this.obtenerListaActividades();
          this.toastr.successToastr(res.mensaje, 'Success!');
        }else{
          this.toastr.errorToastr(res.mensaje, 'Success!');
        }
      },
      error => {
        console.log(<any> error);
        this.toastr.errorToastr('Error al eliminar la actividad.', 'Oops!');
      }
    )
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
       type = {id: id, action: 'editar',
        name: null}
       break;
    }
    console.log(type);
    this.eventService.sendMainCompliance(new EventMessage(7, type));
 }

}
