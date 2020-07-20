/* tslint:disable:indent */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { EventBlocked } from 'src/app/core/models/EventBlocked';
import * as moment from 'moment';
import {BinnacleService} from '../../services/binnacle.service';
import {BinnacleEventConfigurationDTO} from '../../models/binnacle-event-configuration-dto';
import {BinnacleEventDTO} from '../../models/binnacle-event-dto';

@Component({
	selector: 'app-safe-list-of-events',
	templateUrl: './safe-list-of-events.component.html',
	styleUrls: ['./safe-list-of-events.component.scss']
})
export class SafeListOfEventsComponent implements OnInit {
	formQuery: FormGroup;
	dateToMin = new Date();
	// { order: '', dateOpCom: '', process: '', user: '', dateUpdated: '', status: '' }
	tableData: Array<BinnacleEventDTO> = [];
	tablaColumnsLabels = [
		{key: 'binnacleEventID'                                  , label: 'id'},
		{key: 'order'                               , label: '#'},
		{key: 'dateTimeStartString'                   , label: 'Fecha y Hora Inicial'},
		{key: 'dateTimeEndString'                     , label: 'Fecha y Hora Final'},
		{key: 'eventsClassification'              , label: 'Clasificacion de Eventos'},
		{key: 'events'                             , label: 'Eventos'},
		{key: 'fuels'                         , label: 'Combustible'},
		{key: 'powerMw'                           , label: 'Potencia (MW)'},
		{key: 'units'                              , label: 'Unidad'},
		{key: 'impactContracts'                   , label: 'Contrato Impactado'},
		{key: 'realsCcdv'                            , label: 'Real/CCDV'},
		{key: 'toleranceBands'                   , label: 'Banda de Tolerancia'},
		{key: 'marketTypes'                       , label: 'Tipo de Mercado'},
		{key: 'mwOffered'                         , label: 'MW Ofertados'},
		{key: 'relatedServices'                    , label: 'Servicios Conexos'},
		{key: 'licenseNumber'                           , label: '#Licencia'},
		{key: 'equipment'                              , label: 'Equipo'},
		{key: 'initialCharge'                      , label: 'Carga Inicial (MW)'},
		{key: 'finalCharge'                        , label: 'Carga Final (MW)'},
		{key: 'mwPowerLoss'                   , label: '(-) Perdida Potencia (MW)'},
		{key: 'workOrderId'                      , label: 'Orden de Trabajo'},
		{key: 'conceptoLicencia'     , label: 'Descripcion / Concepto de la Licencia'},
		{key: 'plantOperatorOpened'  , label: 'Nombre(s)/Apellidos(s) Operador Planta Abrio'},
		{key: 'plantOperatorClosed'  , label: 'Nombre(s)/Apellidos(s) Operador Planta Cerro'},
		{key: 'cenaceOperatorOpened'  , label: 'Nombre(s)/Apellidos(s) Operador CENACE Abrio'},
		{key: 'cenaceOperatorClosed'  , label: 'Nombre(s)/Apellidos(s) Operador CENACE Cerro'},
		{key: 'sourceEvent'                     , label: 'Fuente del Evento'},
		{key: 'estatusEvento'                    , label: 'Estatus del Evento'},
		{key: 'estatusAprobacion'                 , label: 'Estatus de Aprobacion'},
		{key: 'observacionesComentarios'            , label: 'Observaciones y/o comentarios'},
		{key: 'usuario'                             , label: 'Usuario'},
		{key: 'fechaYHoraDeUltimaModificacion'      , label: 'Fecha y Hora de Ultima Modificacion'},
		{key: 'estatus'                             , label: 'Estatus'}

	];
	tableColumnsDisplay: string[] = [
		'order',
		'dateTimeStartString',
		'dateTimeEndString',
		'eventsClassification',
		'events',
		'fuels',
		'powerMw',
		'units',
		'impactContracts',
		'realsCcdv',
		'toleranceBands',
		'marketTypes',
		'mwOffered',
		'relatedServices',
		'licenseNumber',
		'equipment',
		'initialCharge',
		'finalCharge',
		'mwPowerLoss',
		'workOrderId',
		'conceptoLicencia',
		'plantOperatorOpened',
		'plantOperatorClosed',
		'cenaceOperatorOpened',
		'cenaceOperatorClosed',
		'sourceEvent',
		'estatusEvento',
		'estatusAprobacion',
		'observacionesComentarios',
		'usuario',
		'fechaYHoraDeUltimaModificacion',
		'estatus',
		'sys_see',
		'sys_edit',
		'sys_delete'
	];
	tableRowXpage = [100, 250, 500];

	constructor(
		private formBuilder: FormBuilder,
		public toastr: ToastrManager,
		public eventService: EventService,
		public binnacleService: BinnacleService
	) { }

	ngOnInit() {
		this.formQuery = this.formBuilder.group({
			from: [{ value: moment(), disabled: false }, Validators.required],
			to: [{ value: moment(), disabled: false }, Validators.required],
		});
		this.onLoadInit();
	}
	onDateFromChange() {
		this.dateToMin = new Date(this.formQuery.get('from').value);
	}
	onLoadInit() {
		const twoMonthMoment = moment(Date.now()).subtract(2, 'month');
		const dateTwo = new Date(twoMonthMoment.year(), twoMonthMoment.month(), 1);
		const nowMoment =  moment(Date.now());
		const dateNow = new Date(nowMoment.year(), nowMoment.month(), 1);

		this.binnacleService.eventsBetween(
			moment(dateTwo).toDate().getTime(),
			moment(dateNow).toDate().getTime()).subscribe(
			(data: Array<BinnacleEventDTO>) => {
				this.tableData = data.sort((a, b) =>  moment(a.dateTimeStart).toDate().getTime() - moment(b.dateTimeStart).toDate().getTime());
				let i = 0;
				this.tableData.forEach((element: BinnacleEventDTO) => {
					i++;
					element.order = i;
					element.usuario = (element.userUpdated !== null) ? element.userUpdated : element.userCreated;
				});
			},
			errorData => {
				this.toastr.errorToastr('Problemas en la consulta', 'Error');
			},
			() => {
				console.log('loadMasters:: ', 'Termino');
			});
	}

	onFormQuerySubmit(o) {
		this.binnacleService.eventsBetween(
			moment(this.formQuery.get('from').value).toDate().getTime(),
			moment(this.formQuery.get('to').value).toDate().getTime()).subscribe(
			(data: Array<BinnacleEventDTO>) => {
				console.dir(data);
				this.tableData = data;
			},
			errorData => {
				this.toastr.errorToastr('Problemas en la consulta', 'Error');
			},
			() => {
				console.log('loadMasters:: ', 'Termino');
			});
	}
	onbtnAddEvent() {
		console.log('onbtnAddEvent');
		const type = {
            dto: null,
            action: 'nuevo',
			name: '',
			element: {tester: 'tester'}
        };
  this.eventService.sendChangePage(
            new EventMessage(null, type, 'Safe.SafeRegistrationOfEventsComponent')
        );
	}

	onTableRowSee(element) {
		const type = {
            dto: null,
            action: 'ver',
			name: '',
			element
		};
  this.eventService.sendChangePage(
            new EventMessage(null, type, 'Safe.SafeRegistrationOfEventsComponent')
        );
	}
	onTableRowEdit(element) {
		console.dir(element);
		const type = {
            dto: null,
            action: 'editar',
			name: '',
			element
		};
  this.eventService.sendChangePage(
            new EventMessage(null, type, 'Safe.SafeRegistrationOfEventsComponent')
        );
	}
	onTableRowDelete(element) {
		console.log(element);

	}
	addBlock(type, msg): void {
		this.eventService.sendApp(new EventMessage(1,
			new EventBlocked(type, msg)));
	}
}
