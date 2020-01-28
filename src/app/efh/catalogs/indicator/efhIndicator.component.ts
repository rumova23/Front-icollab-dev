import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { ToastrManager                  } from 'ng6-toastr-notifications';
import { CatalogoMaestroService         } from 'src/app/core/services/catalogo-maestro.service';
import { ConfirmationDialogService      } from 'src/app/core/services/confirmation-dialog.service';
import { GlobalService                  } from 'src/app/core/globals/global.service';
import { EventService                   } from 'src/app/core/services/event.service';
import { CatalogType                    } from 'src/app/compliance/models/CatalogType';
import { EventMessage                   } from 'src/app/core/models/EventMessage';
import { DatePipe                       } from '@angular/common';
import { SecurityService                } from 'src/app/core/services/security.service';
import { EventBlocked                   } from 'src/app/core/models/EventBlocked';

@Component({
  selector: 'app-efh-indicator',
  templateUrl: './efhIndicator.component.html',
  styleUrls: ['./efhIndicator.component.scss']
})
export class EfhIndicatorComponent implements OnInit {
    public static mainCatalog = 'typeIndicator';
    @Input() nombreCatalogo: string;
    entidadEstatusId: string;
    title: String;
    listUsers: Array<any>;
    dataSource;
    data: any[] = [];
    displayedColumnsOrder: any[] = [];
    displayedColumnsActions: any[]    = [];
    columnsToDisplay: string[] = [];
    rowPerPage = [50, 100, 250, 500];
    listaCombos: Array<any>;
    result;

    menu: any[];
    showAdd: boolean = false;
    showView: boolean = false;
    showUpdate: boolean = false;
    showDelete: boolean = false;

    constructor(
        private catalogoMaestroService: CatalogoMaestroService,
        public globalService: GlobalService,
        private confirmationDialogService: ConfirmationDialogService,
        public toastr: ToastrManager,
        private eventService: EventService,
        private datePipe: DatePipe,
        private securityService: SecurityService) {
        this.menu = securityService.getMenu('Efh');
    }

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    ngOnInit() {
      this.title = 'Catálogos / ' + this.nombreCatalogo;
      this.getDataSource();
      for (let option of this.menu) {
          if (option.children) {
              let flag:boolean = true;
              while ( flag ) {
                  flag = false;
                  for(let ins=0; ins < option.children.length; ins++) {
                      if (option.children[ins]['label'] == this.nombreCatalogo) {
                          if (option.children[ins].actions) {
                              for(let action = 0; action < option.children[ins].actions.length ; action++) {

                                  if (option.children[ins].actions[action] == 'CREAR') {
                                      this.showAdd = true;
                                  }
                                  if (option.children[ins].actions[action] == 'VER') {
                                      this.showView = true;
                                  }
                                  if (option.children[ins].actions[action] == 'EDITAR') {
                                      this.showUpdate = true;
                                  }
                                  if (option.children[ins].actions[action] == 'BORRAR') {
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

    getDataSource() {
        this.addBlock(1, 'Cargando...');
        this.data = [];
        this.catalogoMaestroService.getCatalogoIndividual(EfhIndicatorComponent.mainCatalog).subscribe(
            dataBack => {
                this.result = dataBack;
                let i = 0;
                debugger;
                for (let element of this.result) {
                    i += 1;
                    let obj            = {};
                    obj['order']       = i;
                    obj['id']          = element.id;
                    obj['name']        = element.code;
                    obj['description'] = element.description;
                    obj['userUpdated'] = element.userUpdated == undefined ? element.userCreated : element.userUpdated;
                    let dateUpdated = element.dateUpdated == undefined ? element.dateCreated : element.dateUpdated;
                    obj['dateUpdated'] = '.';
                    if (dateUpdated) {
                        obj['dateUpdated'] = this.datePipe.transform(new Date(dateUpdated) ,'dd/MM/yyyy HH:mm');
                    }
                    obj['status']      = element.active == true ? 'Activo' : 'Inactivo';
                    obj['element']     = element; //Al Eliminar se usa
                    this.data.push(obj);
                }

                this.displayedColumnsOrder = [
                    {key: 'order', label: '#'}
                    , {key: 'name', label: 'Nombre'}
                    , {key: 'description', label: 'Descripción'}
                    , {key: 'userUpdated', label: 'Usuario Modificó'}
                    , {key: 'dateUpdated', label: 'Fecha y Hora última modificación'}
                    , {key: 'status', label: 'Estatus'}
                ];

                this.displayedColumnsActions = [];
                this.columnsToDisplay = [ 'order', 'name', 'description', 'userUpdated', 'dateUpdated', 'status'];

                if (this.showView) {
                    this.displayedColumnsActions.push({key: 'sys_see', label: 'Ver'});
                    this.columnsToDisplay.push('sys_see');
                }
                if (this.showUpdate) {
                    this.displayedColumnsActions.push({key: 'sys_edit', label: 'Editar'});
                    this.columnsToDisplay.push('sys_edit');
                }
                if (this.showUpdate) {
                    this.displayedColumnsActions.push({key: 'sys_delete', label: 'Eliminar'});
                    this.columnsToDisplay.push('sys_delete');
                }
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

        switch (option) {
            case 1:
                type = {
                    id: id
                    , action: 'nuevo'
                    , name: this.nombreCatalogo
                }
                break;
            case 2:
                type = {
                    id: id
                    , action: 'ver'
                    , name: this.nombreCatalogo
                }
                break;
            case 3:
                type = {
                    id: id
                    , action: 'editar'
                    , name: this.nombreCatalogo
                }
                break;
        }
        this.eventService.sendChangePage(new EventMessage(5 , type, 'Efh.Tipo de Indicador.ABC'));
    }

    eliminarRegistro(maestroOpcion: any) {
        this.confirmationDialogService.confirm('Por favor, confirme..',
            'Está seguro de eliminar el registro?')
            .then((confirmed) => {
                if (confirmed) {
                    this.catalogoMaestroService.outCatalogoItem(EfhIndicatorComponent.mainCatalog
                        , maestroOpcion.id).subscribe(
                        data => {
                            this.toastr.successToastr('El registro fue correctamente eliminado', '¡Se ha logrado!');
                            this.eventService.sendChangePage(new EventMessage(4, {} , 'Efh.Tipo de evento'));
                        }
                        , error => {
                            if (error.error['text'] === 'Ok') {
                                this.toastr.successToastr('El registro fue correctamente eliminado', '¡Se ha logrado!');
                                this.eventService.sendChangePage(new EventMessage(4, {} , 'Efh.Tipo de evento'));
                            } else {
                                this.toastr.errorToastr(error.error['text'], 'Lo siento,');
                            }
                        },
                    );
                }
            })
            .catch(() => console.log('Canceló eliminar tipo de evento'));
    }

    private addBlock(type, msg): void {
        this.eventService.sendApp(new EventMessage(1, new EventBlocked(type, msg)));
    }

}
