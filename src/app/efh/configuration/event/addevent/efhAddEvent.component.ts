import { Component, Input, OnInit, ViewChild} from '@angular/core';
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
import { EfhService                     } from 'src/app/core/services/efh.service';
import { Constants                      } from '../../../../core/globals/Constants';
import { EventType                      } from '../../../models/EventType';

@Component({
  selector: 'app-efh-add-event',
  templateUrl: './efhAddEvent.component.html',
  styleUrls: ['./efhAddEvent.component.scss'],
  providers: [DatePipe]
})
export class EfhAddEventComponent implements OnInit {

  public static mainCatalog = 'typeEvent';
  @Input() nombreCatalogo: string;
  title: String;
  menu: any[];
  catalogType: CatalogType;
  showAdd = false;
  showView = false;
  showUpdate = false;
  showDelete = false;
  dataSource;
  data: any[] = [];
  displayedColumnsOrder: any[] = [];
  displayedColumnsActions: any[]    = [];
  columnsToDisplay: string[] = [];
  rowPerPage = [50, 100, 250, 500];
  listaCombos: Array<any>;
  result;
  resultService;
  eventTypesArr = [];
  unitsArr = [];
  fuelTypesArr = [];

  constructor(
      private catalogoMaestroService: CatalogoMaestroService,
      public globalService: GlobalService,
      private confirmationDialogService: ConfirmationDialogService,
      public toastr: ToastrManager,
      private eventService: EventService,
      private datePipe: DatePipe,
      private securityService: SecurityService,
      private efhService: EfhService) {
      this.menu = securityService.getMenu('Efh');
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.title = 'Configuración de Eventos / Eventos configurados';
    this.getCatalogs();
    for (const option of this.menu) {
      if (option.children) {
        let flag = true;
        while ( flag ) {
          flag = false;
          for (let ins = 0; ins < option.children.length; ins++) {
            if ((option.children[ins].label == this.nombreCatalogo) || option.children[ins].children) {
              // option.children[ins].actions.push('CREAR', 'VER', 'EDITAR', 'BORRAR');
              if (option.children[ins].actions && option.children[ins].label == this.nombreCatalogo) {
                for (let action = 0; action < option.children[ins].actions.length ; action++) {

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
              if(option.children[ins].children) {
                  const subChildren = option.children[ins].children;
                  for (let sub = 0; sub < subChildren.length; sub++) {
                      if (subChildren[sub].label === this.nombreCatalogo) {
                          if (subChildren[sub].actions) {
                              for (let action = 0; action < subChildren[sub].actions.length ; action++) {

                                  if (subChildren[sub].actions[action] == 'CREAR') {
                                      this.showAdd = true;
                                  }
                                  if (subChildren[sub].actions[action] == 'VER') {
                                      this.showView = true;
                                  }
                                  if (subChildren[sub].actions[action] == 'EDITAR') {
                                      this.showUpdate = true;
                                  }
                                  if (subChildren[sub].actions[action] == 'BORRAR') {
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
      }
    }
  }

  getDataSource() {
    this.data = [];
    this.efhService.getEventsConfigurated().subscribe(
        dataBack => {
          this.result = dataBack;
          let i = 0;
          for (const element of this.result) {
            i += 1;
            const obj            = {};
            obj['id'] = element.id;
            obj['typeEvent'] = this.eventTypesArr.find(x => x.id === element.idtypeevent).name;
            // obj['idtypefuel'] = element.idtypefuel;
            obj['typeFuel'] = this.fuelTypesArr.find(x => x.id === element.idtypefuel).name;
            // obj['idunit'] = element.idunit;
            obj['unit'] = this.unitsArr.find(x => x.id === element.idunit).name;
            obj['dateInit'] = this.datePipe.transform(new Date(element.dateinit) , 'dd/MM/yyyy HH:mm');
            obj['order'] = i;
            // debugger;
            obj['spliced'] = element.spliced;
            obj['userUpdated'] = element.userUpdated === null ? element.userCreated : element.userUpdated;
            const dateUpdated = element.dateUpdated === null ? element.dateCreated : element.dateUpdated;
            obj['dateUpdated'] = '.';
            if (dateUpdated) {
              obj['dateUpdated'] = this.datePipe.transform(new Date(dateUpdated) , 'dd/MM/yyyy HH:mm');
            }
            obj['status']      = element.active === true ? 'Activo' : 'Inactivo';
            obj['element']     = element;

            this.data.push(obj);
          }

          this.displayedColumnsOrder = [
            {key: 'order', label: '#'}
            , {key: 'dateInit', label: 'Fecha'}
            , {key: 'unit', label: 'Unidad'}
            , {key: 'typeEvent', label: 'Tipo de evento'}
            , {key: 'typeFuel', label: 'Combustible'}
            , {key: 'userUpdated', label: 'Usuario Modificó'}
            , {key: 'dateUpdated', label: 'Fecha y Hora última modificación'}
            , {key: 'status', label: 'Estatus'}
          ];

          this.displayedColumnsActions = [];
          this.columnsToDisplay = [ 'order', 'dateInit', 'unit', 'typeEvent', 'typeFuel', 'userUpdated', 'dateUpdated', 'status'];

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

  action(option: number, id: any, section: any) {
    let type: EventType = {};

    switch (option) {
      case 1:
        type = {
          id
          , action: 'nuevo'
          , section
          , eventTypesArr: this.eventTypesArr
          , fuelTypesArr: this.fuelTypesArr
          , unitsArr: this.unitsArr
        };
        break;
      case 2:
        type = {
          id
          , action: 'ver'
          , section
          , eventTypesArr: this.eventTypesArr
          , fuelTypesArr: this.fuelTypesArr
          , unitsArr: this.unitsArr
        };
        break;
      case 3:
        type = {
          id
          , action: 'editar'
          , section
          , eventTypesArr: this.eventTypesArr
          , fuelTypesArr: this.fuelTypesArr
          , unitsArr: this.unitsArr
        };
        break;
    }
    this.eventService.sendChangePage(new EventMessage(5 , type, 'Efh.Agregar eventos.ABC'));
  }

  private addBlock(type, msg): void {
    this.eventService.sendApp(new EventMessage(1, new EventBlocked(type, msg)));
  }

  getCatalogs() {
    this.addBlock(1, 'Cargando...');
    this.catalogoMaestroService.getCatalogoIndividual('typeEvent')
        .subscribe(
            data => {
                this.resultService = data;
                let i = 0;
                for (const element of this.resultService) {
                    i += 1;
                    const obj            = {};
                    // @ts-ignore
                    obj.order       = i;
                    // @ts-ignore
                    obj.id          = element.id;
                    // @ts-ignore
                    obj.name        = element.code;
                    // @ts-ignore
                    obj.description = element.description;
                    // @ts-ignore
                    obj.active = element.active;
                    this.eventTypesArr.push(obj);
                }
                this.catalogoMaestroService.getCatalogoIndividual('typeFuel')
                    .subscribe(
                        data1 => {
                            this.resultService = data1;
                            let j = 0;
                            for (const element of this.resultService) {
                                j += 1;
                                const obj            = {};
                                // @ts-ignore
                                obj.order       = j;
                                // @ts-ignore
                                obj.id          = element.id;
                                // @ts-ignore
                                obj.name        = element.code;
                                // @ts-ignore
                                obj.description = element.description;
                                // @ts-ignore
                                obj.active = element.active;
                                this.fuelTypesArr.push(obj);
                            }
                            this.catalogoMaestroService.getCatalogoIndividual('unit')
                                .subscribe(
                                    data2 => {
                                        this.resultService = data2;
                                        let k = 0;
                                        for (const element of this.resultService) {
                                            k += 1;
                                            const obj            = {};
                                            // @ts-ignore
                                            obj.order       = k;
                                            // @ts-ignore
                                            obj.id          = element.id;
                                            // @ts-ignore
                                            obj.name        = element.code;
                                            // @ts-ignore
                                            obj.description = element.description;
                                            // @ts-ignore
                                            obj.active = element.active;
                                            this.unitsArr.push(obj);
                                        }
                                        this.getDataSource();
                                    },
                                    errorData => {
                                        this.toastr.errorToastr(Constants.ERROR_LOAD, 'Lo siento,');
                                    }
                                );
                        },
                        errorData => {
                            this.toastr.errorToastr(Constants.ERROR_LOAD, 'Lo siento,');
                        }
                    );

            },
            errorData => {
                this.toastr.errorToastr(Constants.ERROR_LOAD, 'Lo siento,');
                this.addBlock(2, null);
            }
        );
  }

  eliminarRegistro(maestroOpcion: any) {
    this.confirmationDialogService.confirm('Por favor, confirme..',
        'Está seguro de eliminar el registro?')
        .then((confirmed) => {
          if (confirmed) {
            this.efhService.deleteEvent(maestroOpcion.id)
                .subscribe(
                    data => {
                      this.toastr.successToastr('El registro fue correctamente eliminado', '¡Se ha logrado!');
                      this.eventService.sendChangePage(new EventMessage(4, {} , 'Efh.Agregar eventos'));
                    }
                    , error => {
                        if (error.error['text'] === 'OK') {
                            this.toastr.successToastr('El registro fue correctamente eliminado', '¡Se ha logrado!');
                            this.eventService.sendChangePage(new EventMessage(4, {} , 'Efh.Agregar eventos'));
                        } else {
                            this.toastr.errorToastr(error.error['text'], 'Lo siento,');
                        }
                    },
                );
          }
        })
        .catch(() => console.log('Canceló eliminar'));
  }

  getTimeLocale(dateString: string): Date {
      //debugger;
      const toConvertDate = new Date(dateString);
      const offsetTimeZone = toConvertDate.getTimezoneOffset() * 60000;
      return new Date(toConvertDate.getTime() + offsetTimeZone);
  }

}
