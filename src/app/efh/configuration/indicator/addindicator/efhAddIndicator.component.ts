import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe                            } from '@angular/common';
import {CatalogType} from '../../../../compliance/models/CatalogType';
import { GlobalService                  } from 'src/app/core/globals/global.service';
import { EventService                   } from 'src/app/core/services/event.service';
import {IndicatorType} from '../../../models/IndicatorType';
import {EventMessage} from '../../../../core/models/EventMessage';
import {Constants} from '../../../../core/globals/Constants';
import {CatalogoMaestroService} from '../../../../core/services/catalogo-maestro.service';
import {ToastrManager} from 'ng6-toastr-notifications';
import {EventBlocked} from '../../../../core/models/EventBlocked';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { SecurityService                } from 'src/app/core/services/security.service';
import {EfhService} from '../../../../core/services/efh.service';
import {ConfirmationDialogService} from '../../../../core/services/confirmation-dialog.service';

@Component({
  selector: 'app-efh-add-indicator',
  templateUrl: './efhAddIndicator.component.html',
  styleUrls: ['./efhAddIndicator.component.scss'],
  providers: [DatePipe]
})
export class EfhAddIndicatorComponent implements OnInit {

  @Input() nombreCatalogo: string;
  title: String;
  menu: any[];
  catalogType: CatalogType;
  showAdd = true;
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
  indicatorTypesArr = [];
  unitsArr = [];
  fuelTypesArr = [];

  constructor(
      public globalService: GlobalService,
      private eventService: EventService,
      private catalogoMaestroService: CatalogoMaestroService,
      private confirmationDialogService: ConfirmationDialogService,
      public toastr: ToastrManager,
      private efhService: EfhService,
      private securityService: SecurityService,
      private datePipe: DatePipe) {
    this.menu = securityService.getMenu('Efh');
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.title = 'Configuración de Indicadores / Indicadores configurados';
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

  getCatalogs() {
    this.addBlock(1, 'Cargando...');
    this.catalogoMaestroService.getCatalogoIndividual('typeIndicator')
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
                this.indicatorTypesArr.push(obj);
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

  getDataSource() {
    this.data = [];
    this.efhService.getIndicatorsConfigurated().subscribe(
        dataBack => {
          this.result = dataBack;
          let i = 0;
          for (const element of this.result) {
            i += 1;
            const obj            = {};
            obj['id'] = element.id;
            obj['typeIndicator'] = this.indicatorTypesArr.find(x => x.id === element.idtypeindicator).name;
            obj['typeFuel'] = this.fuelTypesArr.find(x => x.id === element.idtypefuel).name;
            obj['unit'] = this.unitsArr.find(x => x.id === element.idunit).name;
            obj['dateInit'] = this.datePipe.transform(new Date(element.dateinit) , 'dd/MM/yyyy HH:mm');
            obj['dateEnd'] = this.datePipe.transform(new Date(element.dateinit) , 'dd/MM/yyyy HH:mm');
            obj['userCreated'] = element.userUpdated === null ? element.userCreated : element.userUpdated;
            obj['userUpdated'] = element.userUpdated === null ? element.userCreated : element.userUpdated;
            const dateUpdated = element.dateUpdated === null ? element.dateCreated : element.dateUpdated;
            obj['dateUpdated'] = '.';
            if (dateUpdated) {
              obj['dateUpdated'] = this.datePipe.transform(new Date(dateUpdated) , 'dd/MM/yyyy HH:mm');
            }
            obj['status']      = element.active === true ? 'Activo' : 'Inactivo';
            obj['element']     = element;
            obj['order'] = i;

            this.data.push(obj);
          }
          this.displayedColumnsOrder = [
            {key: 'order', label: '#'}
            , {key: 'dateInit', label: 'Fecha'}
            , {key: 'unit', label: 'Unidad'}
            , {key: 'typeIndicator', label: 'Tipo de indicador'}
            , {key: 'typeFuel', label: 'Combustible'}
            , {key: 'userUpdated', label: 'Usuario Modificó'}
            , {key: 'dateUpdated', label: 'Fecha y Hora última modificación'}
            , {key: 'status', label: 'Estatus'}
          ];

          this.displayedColumnsActions = [];
          this.columnsToDisplay = [ 'order', 'dateInit', 'unit', 'typeIndicator', 'typeFuel', 'userUpdated', 'dateUpdated', 'status'];

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
    let type: IndicatorType = {};

    switch (option) {
      case 1:
        type = {
          id
          , action: 'nuevo'
          , section
          , indicatorTypesArr: this.indicatorTypesArr
          , fuelTypesArr: this.fuelTypesArr
          , unitsArr: this.unitsArr
        };
        break;
      case 2:
        type = {
          id
          , action: 'ver'
          , section
          , indicatorTypesArr: this.indicatorTypesArr
          , fuelTypesArr: this.fuelTypesArr
          , unitsArr: this.unitsArr
        };
        break;
      case 3:
        type = {
          id
          , action: 'editar'
          , section
          , indicatorTypesArr: this.indicatorTypesArr
          , fuelTypesArr: this.fuelTypesArr
          , unitsArr: this.unitsArr
        };
        break;
    }
    this.eventService.sendChangePage(new EventMessage(5 , type, 'Efh.addIndicadorComponent.ABC'));
  }

  eliminarRegistro(maestroOpcion: any) {
    this.confirmationDialogService.confirm('Por favor, confirme..',
        'Está seguro de eliminar el registro?')
        .then((confirmed) => {
          if (confirmed) {
            this.efhService.deleteIndicator(maestroOpcion.id)
                .subscribe(
                    data => {
                      this.toastr.successToastr('El registro fue correctamente eliminado', '¡Se ha logrado!');
                      this.eventService.sendChangePage(new EventMessage(4, {} , 'Efh.addIndicadorComponent'));
                    }
                    , error => {
                      if (error.error['text'] === 'OK') {
                        this.toastr.successToastr('El registro fue correctamente eliminado', '¡Se ha logrado!');
                        this.eventService.sendChangePage(new EventMessage(4, {} , 'Efh.addIndicadorComponent'));
                      } else {
                        this.toastr.errorToastr(error.error['text'], 'Lo siento,');
                      }
                    },
                );
          }
        })
        .catch(() => console.log('Canceló eliminar'));
  }

  private addBlock(type, msg): void {
    this.eventService.sendApp(new EventMessage(1, new EventBlocked(type, msg)));
  }

  getTimeLocale(dateString: string): Date {
    const toConvertDate = new Date(dateString);
    const offsetTimeZone = toConvertDate.getTimezoneOffset() * 60000;
    return new Date(toConvertDate.getTime() + offsetTimeZone);
  }

}
