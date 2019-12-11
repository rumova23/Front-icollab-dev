import { Component, OnInit, ViewChild } from '@angular/core';
import { Input } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, Sort } from '@angular/material';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications'
import { SecurityService } from 'src/app/core/services/security.service';
import { TagService } from '../../services/tag.service';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation-dialog.service';
import { CatalogType } from '../../models/CatalogType';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { EventBlocked } from 'src/app/core/models/EventBlocked';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
 ,providers: [DatePipe]  
})

export class ActivitiesComponent implements OnInit {

  @Input() nombreCatalogo: string;

  titulo: String = "";
  registros;
  userResult;
  data: any[] = [];
  columnas: string[] = ['order','prefix','category','userUpdated','dateUpdated','status'];

  filtros = [
    {label:"Actividad",inputtype:"text"},
    {label:"Prefijo",inputtype:"text"},
    {label:"Activo",inputtype:"text"},
  ];
  filtrobtn = {label:"buscar"};
  registros_x_pagina = [50,100,250,500];

  menu : any[];
  showAdd    : boolean = false;
  showView   : boolean = false;
  showUpdate : boolean = false;
  showDelete : boolean = false;

  constructor(
    private tagService: TagService,
    public  toastr: ToastrManager,
    public  globalService: GlobalService,
    private eventService: EventService,
    private confirmationDialogService: ConfirmationDialogService,
    private datePipe: DatePipe
   ,private securityService: SecurityService) { 
      this.menu = securityService.getMenu('Compliance');
  }

  @ViewChild(MatSort) matSort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.titulo =  this.nombreCatalogo;
    this.addBlock(1, null);
    this.obtenerListaActividades();
    /*
    this.securityService.loadUsers().subscribe( userResult => {
      this.userResult = userResult;
      this.obtenerListaActividades();
      this.addBlock(2, null);
    },
    error =>{
      console.log(<any>error);
      this.addBlock(2, null);
      this.toastr.errorToastr('Error al cargar lista de usuarios.', 'Lo siento,');
    });*/

    for (let option of this.menu) {
      if (option.children){
        let flag:boolean = true;
        while ( flag ){
          flag = false;          
          for (let ins=0; ins < option.children.length; ins++) {
            //if (option.children[ins]['label']=="Categorías"){
            if (option.children[ins]['label']==this.nombreCatalogo){
              if (option.children[ins].actions){
                for (let action=0; action < option.children[ins].actions.length ; action++) {
                   if (option.children[ins].actions[action] == "CREAR"){
                    this.showAdd = true;
                   }                   
                   if (option.children[ins].actions[action] == "VER"){
                     this.showView = true;
                   }
                   if (option.children[ins].actions[action] == "EDITAR"){
                    this.showUpdate = true;
                   }
                   if (option.children[ins].actions[action] == "BORRAR"){
                    this.showDelete = true;
                   }
                }
              }
            }

          }
        }
      }
    }


  }

  
  sortData(sort: Sort) {
        //debugger;
  }
  obtenerListaActividades(){
    this.data = [];
    this.tagService.getCatalogoActividades("TODOS").subscribe( data => {
        let listObj = [];
        let i = 0;
        let userDetail;
        for (let element of data) {
          i += 1;
          let obj             = {};
          obj['order']        = i; 
          obj['category']     = element.name;
          obj['prefix']       = element.prefix;
          obj['status']       = element.active == true ? 'Activo' : 'Inactivo'; 
          obj['userUpdated'] = element.userUpdated == undefined ? element.userCreated : element.userUpdated;
          let dateUpdated = element.dateUpdated == undefined ? element.dateCreated : element.dateUpdated;

          obj['dateUpdated'] = ".";  
          if (dateUpdated){
            //obj['dateUpdated'] = this.datePipe.transform(new Date(dateUpdated) ,'dd/MM/yyyy HH:mm')
            obj['dateUpdated'] = dateUpdated;
          }

          obj['see']      = 'sys_see';
          obj['edit']     = 'sys_edit';
          obj['delete']   = 'sys_delete';
          obj['element']  = element;
          listObj.push(obj);
        }


        if (this.showView){
          //this.displayedColumnsActions.push({key:'see',label:'Ver'});
          this.columnas.push('see');
        }
        if (this.showUpdate){
          //this.displayedColumnsActions.push({key:'update',label:'Editar'});
          this.columnas.push('update');
        }
        if (this.showUpdate){
          //this.displayedColumnsActions.push({key:'delete',label:'Eliminar'});
          this.columnas.push('delete');
        }
      

        this.registros =  new MatTableDataSource<any>(listObj);
        this.registros.paginator = this.paginator;
        let dateUpdated = null;
        this.registros.sortingDataAccessor = (item, property) => {
            switch(property) {
                case 'prefix': return item.prefix;
                case 'dateUpdated' : dateUpdated = ((item.element.dateUpdated != null) ? item.element.dateUpdated : item.element.dateCreated);
                    return new Date(dateUpdated).getTime();
                default: return item[property];
              }
        }
        this.registros.sort = this.matSort;

        this.addBlock(2, null);
      },
      error => {
        this.addBlock(2, null);
        this.toastr.errorToastr('Error al obtener catalgo de actividades.', 'Lo siento,');
      }
    )
  }

  public eliminarActividad(actividad: any) {
    this.confirmationDialogService.confirm('Por favor, confirme..', 
          'Está seguro de eliminar la actividad? ' + actividad.name).then((confirmed) => {
        if (confirmed){
          this.eliminarActividadConfirm(actividad)
        }
      })
    .catch(() => console.log('Cancelo'));
  }

  eliminarActividadConfirm(actividad: any){
    this.tagService.eliminarActividad(actividad.idActivity).subscribe(
      respuesta => {
        let res: any;
        res = respuesta;
        if ( res.clave == 0 ){
          this.obtenerListaActividades();
          this.toastr.successToastr(res.mensaje, '¡Se ha logrado!');

          this.confirmationDialogService.confirm('Por favor, confirme..'
          ,'Está seguro de eliminar los registros clonados? ')
          .then((confirmed) => {
            if (confirmed) {  
              this.tagService.outCatalogItemCloned(actividad["referenceclone"]).subscribe(
                  data =>{
                   this.toastr.successToastr('Los registros clonados fueron correctamente eliminados', '¡Se ha logrado!');
                  }
              );
            }
          }
        )
        .catch(() => console.log('Cancelo eliminar clones'));


        }else{
          this.toastr.errorToastr(res.mensaje, 'Lo siento,');
        }
      },
      error => {
        this.toastr.errorToastr('Error al eliminar la actividad.', 'Lo siento,');
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
    this.eventService.sendChangePage(new EventMessage(7, type, "Compliance.Categorías.ABC"));
 }

  //Loadin
  private addBlock(type, msg): void {
    this.eventService.sendApp(new EventMessage(1, new EventBlocked(type, msg)));
  }

}
