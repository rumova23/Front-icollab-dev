import { Component, OnInit } from '@angular/core';
import {MaestroOpcionDTO} from '../../../compliance/models/maestro-opcion-dto';
import {ToastrManager} from 'ng6-toastr-notifications';
import {EventService} from '../../../core/services/event.service';
import {ConfirmationDialogService} from '../../../core/services/confirmation-dialog.service';
import {MasterCatalogService} from '../../services/master-catalog.service';
import {BinnacleService} from '../../services/binnacle.service';
import {EventMessage} from '../../../core/models/EventMessage';
import {EventBlocked} from '../../../core/models/EventBlocked';
import {BinnacleEventConfigurationDTO} from '../../models/binnacle-event-configuration-dto';
import * as moment from 'moment';

@Component({
  selector: 'app-safe-configuration-binnacle',
  templateUrl: './safe-configuration-binnacle.component.html',
  styleUrls: ['./safe-configuration-binnacle.component.scss']
})
export class SafeConfigurationBinnacleComponent implements OnInit {
    tableCatalogos = [];
    tablaColumnsLabels = [
        { key: 'order', label: '#' },
        { key: 'eventClassification', label: 'Clasificacion Evento' },
        { key: 'event', label: 'Evento' },
		{ key: 'user', label: 'Usuario' },
		{ key: 'dateUpdatedDate', label: 'Date and Time last modified' , dateFormat: 'dd/MM/yyyy HH:mm:ss'}, // esto para que la tabla pueda ordenarlo, se tiene que pasar como tipo Date y no como string
		{ key: 'dateUpdated', label: 'Date and Time last modified'},
		{ key: 'nameStatus', label: 'Estatus' }
    ];
    tableColumnsDisplay = [
        'order',
        'eventClassification',
        'event',
        'user',
        'dateUpdatedDate',
        'nameStatus',
        'sys_see',
        'sys_edit',
        'sys_delete'
    ];
    tableRowPage = [50, 100, 250, 500];
    lstEventClassificationDTO: Array<MaestroOpcionDTO>;
    lstEventsDTO: Array<MaestroOpcionDTO>;
    constructor(
        private binnacleService: BinnacleService,
        private eventService: EventService,
        private confirmationDialogService: ConfirmationDialogService,
        private toastr: ToastrManager,
        private masterCatalogService: MasterCatalogService
    ) { }

    ngOnInit() {
        this.loadCatalog();
    }

    loadCatalog() {
        this.addBlock(1, '');
        const names = ['CLASIFICA EVENTO', 'EVENTO'];
        this.masterCatalogService.listCatalog(names).subscribe(data  => {
            this.lstEventClassificationDTO = data['CLASIFICA EVENTO'];
            this.lstEventsDTO = data['EVENTO'];
        },
        error => {
            this.addBlock(2, '');
            this.toastr.errorToastr('Problemas en la consulta', 'Error');
        }, () => {
            this.addBlock(2, '');
            this.loadMasters();
        });
    }
    getOpcion(combo: Array<MaestroOpcionDTO>, opcion: number) {
        let maestro: MaestroOpcionDTO;
        for (let ins = 0; ins < combo.length; ins++) {
            maestro = combo[ins];
            if (maestro.maestroOpcionId === opcion) {
                return maestro.opcion.codigo;
            }
        }
    }
    loadMasters() {
        this.addBlock(1, '');
        this.binnacleService.listTemplates().subscribe(
            (data: Array<BinnacleEventConfigurationDTO>) => {
                data = data.sort((a, b) => moment(b.dateModification).toDate().getTime() - moment(a.dateModification).toDate().getTime());
                let i = 0;
                this.tableCatalogos = data.map( e => {
                    i++;
                    return {
                        order: i
                        , binnacleEventConfigurationDTO: e
                        , eventClassification: this.getOpcion(this.lstEventClassificationDTO, e.eventsClassificationId)
                        , event: this.getOpcion(this.lstEventsDTO, e.eventsId)
                        , user: e.user
                        , dateUpdated: e.dateUpdated
                        , nameStatus: (e.statusElement) ? 'Activo' : 'Inactivo'
                        , dateUpdatedDate : new Date(
                            +e.dateUpdated.split(' ')[0].split('/')[1]
                           , +e.dateUpdated.split(' ')[0].split('/')[2]
                           , +e.dateUpdated.split(' ')[0].split('/')[0]
                           , +e.dateUpdated.split(' ')[1].split(':')[0]
                           , +e.dateUpdated.split(' ')[1].split(':')[1]
                           , 0
                       )
                    };
                });
            },
            errorData => {
                this.toastr.errorToastr('Problemas en la consulta', 'Error');
            },
            () => {
                this.addBlock(2, '');
            });
    }
    tableRowSee(element) {
        const type = {
            dto: element.binnacleEventConfigurationDTO,
            action: 'ver',
            name: element.name,
            element
        };
        this.eventService.sendChangePage(
            new EventMessage(null, type, 'Safe.SafeConfigurationBinnacleEditComponent')
        );
    }
    tableRowEdit(element) {
        const type = {
            dto: element.binnacleEventConfigurationDTO,
            action: 'editar',
            name: element.name,
            element
        };
        this.eventService.sendChangePage(
            new EventMessage(null, type, 'Safe.SafeConfigurationBinnacleEditComponent')
        );
    }
    tableRowDelete(element) {
        console.dir(element);
        this.confirmationDialogService.confirm(
            'Confirmación',
            '¿Está seguro de eliminar el Registro?'
        )
            .then((confirmed) => {
                if ( confirmed ) {
                    this.binnacleService.deleteEventConfiguration(element.binnacleEventConfigurationDTO.binnacleEventConfigurationID).subscribe(
                        data => {
                            this.toastr.successToastr('Configuracion Event, borrada correctamente', '¡Exito!');
                        },
                        errorData => {
                            this.toastr.errorToastr(errorData.error.message, 'Error');
                        },
                        () => {
                            this.loadMasters();
                            this.addBlock(2, '');
                        });
                }
            })
            .catch(() => {});
    }
    btnClickAdd() {
        const type = {
            dto: null,
            action: 'nuevo',
            name: ''
        };
        this.eventService.sendChangePage(
            new EventMessage(null, type, 'Safe.SafeConfigurationBinnacleEditComponent')
        );
    }

    addBlock(type, msg): void {
        this.eventService.sendApp(new EventMessage(1, new EventBlocked(type, msg)));
    }
}
