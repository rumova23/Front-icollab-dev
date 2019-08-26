import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { ToastrManager } from 'ng6-toastr-notifications';

import { ActivatedRoute } from '@angular/router';
import { CatalogoMaestroService } from 'src/app/core/services/catalogo-maestro.service';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation-dialog.service';
import { GlobalService } from 'src/app/core/globals/global.service';
import { EventService } from 'src/app/core/services/event.service';
import { CatalogType } from 'src/app/compliance/models/CatalogType';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { DatePipe } from '@angular/common';
import { SecurityService } from 'src/app/core/services/security.service';
import { EventBlocked } from 'src/app/core/models/EventBlocked';
import { menuItem }   from '../../../comun/menu-items/menuItem';


@Component({
  selector: 'app-complianceTypes',
  templateUrl: './complianceTypes.component.html',
  styleUrls: ['./complianceTypes.component.scss'],
  providers: [DatePipe]
})
export class ComplianceTypesComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  public static mainCatalog = 'authority';

  @Input() nombreCatalogo: string;
  entidadEstatusId: string;
  title: String;
  listUsers: Array<any>;

  dataSource;
  data                    : any[] = [];
  displayedColumnsOrder   : any[]    = [];
  displayedColumnsActions : any[]    = [];
  columnsToDisplay        : string[] = [];
  row_x_page = [50, 100, 250, 500];

  // tslint:disable-next-line:ban-types
  // tslint:disable-next-line:variable-name

  listaCombos: Array<any>;
  result;

  menu : menuItem[];
  showAdd    : boolean = false;
  showView   : boolean = false;
  showUpdate : boolean = false;
  showDelete : boolean = false;

  constructor(
    private catalogoMaestroService: CatalogoMaestroService,
    public globalService: GlobalService,
                private confirmationDialogService: ConfirmationDialogService,
                public toastr: ToastrManager,
                private eventService: EventService,
                private datePipe: DatePipe,
                private securityService: SecurityService) { 
    this.menu = securityService.getMenu('Compliance');
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  ngOnInit() {
    this.title = 'Catálogos / ' + this.nombreCatalogo;

    this.loadUsers();

    this.getDataSource();
     
    console.log("**********")
    console.dir(this.menu);
    for (let option of this.menu) {
      //console.log("option")
      //console.dir(option)
      if (option.children){
        let flag:boolean = true;
        while ( flag ){
          flag = false;          
          for (let ins=0; ins < option.children.length -1; ins++) {
            //if (option.children[ins]['label']=="Autoridades"){
            if (option.children[ins]['label']==this.nombreCatalogo){
              if (option.children[ins].actions){
                for (let action=0; action < option.children[ins].actions.length ; action++) {
                   //console.log("option.children[ins].actions[action]")
                   console.log(option.children[ins].actions[action]);
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
        console.log("****  SALIENDO DEL while *****");
      }
    }
 
  }


  private loadUsers() {
    this.addBlock(1, "Cargando...")
    /*
    this.securityService.loadUsers()
      .subscribe(
        data => {
          this.listUsers = data.resultado;
          this.cargaDatos();
        },
        errorData => {
          console.log(errorData);
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Usuarios');
          this.addBlock(2,null)
        });
    */
  }

  
  getDataSource(){
    this.data = [];

    this.catalogoMaestroService.getCatalogoIndividual(ComplianceTypesComponent.mainCatalog).subscribe(
      dataBack => {
        console.log("dataBack");
        console.dir(dataBack);
        this.result = dataBack;
        let i = 0;
        //for (let element of dataBack['result'][0]['data']) {
        for (let element of this.result) {
          i += 1;
          let obj            = {};
          obj['order']       = i;
          obj['id']          = element.id;
          obj['name']        = element.code;
          obj['description'] = element.description;
          obj['userUpdated'] = element.userUpdated == undefined ? element.userCreated : element.userUpdated;
          let dateUpdated = element.dateUpdated == undefined ? element.dateCreated : element.dateUpdated;
              //console.log("let dateUpdated");
              //console.log(dateUpdated);
          obj['dateUpdated'] = ".";  
          if (dateUpdated){
            obj['dateUpdated'] = this.datePipe.transform(new Date(dateUpdated) ,'dd/MM/yyyy HH:mm')
          }

          obj['status']      = element.active == true ? 'Activo' : 'Inactivo';
          obj['element']     = element; //Al Eliminar se usa
          this.data.push(obj);
        }

        this.displayedColumnsOrder = [
          {key:'order',label:'#'} 
         ,{key:'name',label:'Nombre'}
         ,{key:'description',label:'Descripción'}
         ,{key:'userUpdated',label:'Usuario Modificó'}
         ,{key:'dateUpdated',label:'Fecha y Hora última modificación'}
         ,{key:'status',label:'Estatus'}
        ];

        this.displayedColumnsActions = [];
        this.columnsToDisplay = [ 'order','name','description','userUpdated','dateUpdated','status'];
        
        if (this.showView){
          this.displayedColumnsActions.push({key:'sys_see',label:'Ver'});
          this.columnsToDisplay.push('sys_see');
        }
        if (this.showUpdate){
          this.displayedColumnsActions.push({key:'sys_edit',label:'Editar'});
          this.columnsToDisplay.push('sys_edit');
        }
        if (this.showUpdate){
          this.displayedColumnsActions.push({key:'sys_delete',label:'Eliminar'});
          this.columnsToDisplay.push('sys_delete');
        }

        console.log("this.data");
        console.dir(this.data);
        this.dataSource = new MatTableDataSource<any>(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    ).add(() => {
      this.addBlock(2, null);
    });




  }


  action(option: number, id: any) {
    let type: CatalogType = {};

    switch(option) {
      case 1:
        type = { 
                 id     : id
                ,action : 'nuevo'
                ,name   : this.nombreCatalogo
               }
      break;
      case 2:
        type = { 
                 id     : id
                ,action : 'ver'
                ,name   : this.nombreCatalogo
               }
      break;
      case 3:
        type = {
                 id     : id
                ,action : 'editar'
                ,name   : this.nombreCatalogo
               }
      break;
    }

    console.log(type);
    this.eventService.sendMainCompliance(new EventMessage(5, type));
  }



  eliminarRegistro(maestroOpcion: any) {
      console.dir(maestroOpcion);
      console.log(maestroOpcion["referenceclone"]);
      this.confirmationDialogService.confirm('Por favor, confirme..',
          'Está seguro de eliminar el registro? ')
          .then((confirmed) => {
            if (confirmed) {           
              console.log("$$$$$$$$");
              this.catalogoMaestroService.outCatalogoItem(ComplianceTypesComponent.mainCatalog 
                ,maestroOpcion.id).subscribe(
                  data =>{
                   this.toastr.successToastr('El registro fue correctamente eliminado', '¡Se ha logrado!');
                   this.eventService.sendMainCompliance(new EventMessage(4, {}));

                   this.confirmationDialogService.confirm('Por favor, confirme..'
                     ,'Está seguro de eliminar los registros clonados? ')
                     .then((confirmed) => {
                       if (confirmed) {  
                         this.catalogoMaestroService.outCatalogItemCloned(ComplianceTypesComponent.mainCatalog 
                           ,maestroOpcion["referenceclone"]).subscribe(
                             data =>{
                              this.toastr.successToastr('Los registros clonados fueron correctamente eliminados', '¡Se ha logrado!');
                             }          
                         );
                       }
                     }
                   )
                   .catch(() => console.log('Cancelo eliminar clones'));

                  }
                )
            }
            
          })
          .catch(() => console.log('Cancelo eliminar'));
  }  

  cargaDatos() {
    this.addBlock(1, "Cargando...")
    this.data = [];
    this.catalogoMaestroService.getCatalogo( this.nombreCatalogo ).subscribe(data => {
      let i = 0;
      let userDetail;
      for (let element of data) {
        i += 1;
        let obj             = {};
        obj['order']        = i;
        obj['id']           = element.maestroOpcionId;
        obj['name']         = element.opcion.codigo;
        obj['description']  = element.opcion.descripcion;
        //obj['user']         = element.opcion.userUpdated || element.opcion.userCreated;
        //obj['user']         = element.opcion.fullNameUpdated;
        
        userDetail = this.listUsers.find( user => user.user === element.userUpdated );
        obj['user']        = userDetail == undefined ? 'system' : userDetail.name + " " + userDetail.lastName;
        obj['dateup']       = (element.dateUpdated) ? this.datePipe.transform(new Date(element.dateUpdated ),'dd-MM-yyyy h:mm a') : "";
        obj['status']       = (element.entidadEstatusId == this.entidadEstatusId) ? 'Activo' : 'Inactivo';
        obj['see']          = 'sys_see';
        obj['edit']         = 'sys_edit';
        obj['delete']       = 'sys_delete';
        obj['element']      = element;
        
        this.data.push(obj);
      }
  
      this.displayedColumnsOrder = [
        {key:'name',label:'Nombre'},
        {key:'description',label:'Descripción'},
      ];
      this.displayedColumnsActions = [
        {key:'see',label:'Ver'},
        {key:'edit',label:'Editar'},
        {key:'delete',label:'Eliminar'}
      ];
      this.columnsToDisplay= ['name','description','see','edit','delete'];
      
      this.dataSource = new MatTableDataSource<any>(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.addBlock(2,null)
    },
    error =>{
      console.log(<any> error)
      this.addBlock(2,null)
      this.toastr.errorToastr('Error al cargar catalogo.', 'Lo siento,');
    });
  }


  //Loading
  private addBlock(type, msg): void {
    this.eventService.sendApp(new EventMessage(1, new EventBlocked(type, msg)));
  }

}
