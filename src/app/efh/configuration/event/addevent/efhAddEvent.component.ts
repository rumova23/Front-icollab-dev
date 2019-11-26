import {Component, Input, OnInit} from '@angular/core';
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
  showAdd: boolean = false;
  showView: boolean = false;
  showUpdate: boolean = false;
  showDelete: boolean = false;
  dataSource;
  data: any[] = [];
  displayedColumnsOrder: any[] = [];
  displayedColumnsActions: any[]    = [];
  columnsToDisplay: string[] = [];
  rowPerPage = [50, 100, 250, 500];
  listaCombos: Array<any>;
  result;

  constructor(
      private catalogoMaestroService: CatalogoMaestroService,
      public globalService: GlobalService,
      private confirmationDialogService: ConfirmationDialogService,
      public toastr: ToastrManager,
      private eventService: EventService,
      private datePipe: DatePipe,
      private securityService: SecurityService) {
    this.menu = securityService.getMenu('EFH');
  }

  ngOnInit() {
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
    this.eventService.sendChangePage(new EventMessage(5 , type, 'EFH.Tipo de Evento.ABC'));
  }

  eliminarRegistro(maestroOpcion: any) {
    this.confirmationDialogService.confirm('Por favor, confirme..',
        'Está seguro de eliminar el registro?')
        .then((confirmed) => {
          if (confirmed) {
            this.catalogoMaestroService.outCatalogoItem(EfhAddEventComponent.mainCatalog
                , maestroOpcion.id).subscribe(
                data => {
                  this.toastr.successToastr('El registro fue correctamente eliminado', '¡Se ha logrado!');
                  this.eventService.sendChangePage(new EventMessage(4, {} , 'EFH.Tipo de Evento'));
                  this.confirmationDialogService.confirm('Por favor, confirme..'
                      , 'Está seguro de eliminar los registros clonados? ')
                      .then((confirmed) => {
                            if (confirmed) {
                              this.catalogoMaestroService.outCatalogItemCloned(EfhAddEventComponent.mainCatalog
                                  , maestroOpcion['referenceclone']).subscribe(
                                  data => {
                                    this.toastr.successToastr('Los registros clonados fueron correctamente eliminados', '¡Se ha logrado!');
                                  }
                              );
                            }
                          }
                      )
                      .catch(() => console.log('Cancelo eliminar clones'));

                }
                , error => {
                  this.toastr.errorToastr(error.error['text'], 'Lo siento,');
                },
            );
          }
        })
        .catch(() => console.log('Canceló eliminar'));
  }

  private addBlock(type, msg): void {
    this.eventService.sendApp(new EventMessage(1, new EventBlocked(type, msg)));
  }

}
