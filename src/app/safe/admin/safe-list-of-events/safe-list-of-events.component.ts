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
import { IdLabel } from 'src/app/core/models/IdLabel';
import { MasterCatalogService } from '../../services/master-catalog.service';
import { MaestroOpcionDTO } from '../../../compliance/models/maestro-opcion-dto';
import { EstatusMaestroService } from '../../../core/services/estatus-maestro.service';
import { EntidadEstatusDTO } from '../../../compliance/models/entidad-estatus-dto';

@Component({
	selector: 'app-safe-list-of-events',
	templateUrl: './safe-list-of-events.component.html',
	styleUrls: ['./safe-list-of-events.component.scss']
})
export class SafeListOfEventsComponent implements OnInit {
	formQuery: FormGroup;
	dateToMin = new Date();
	// { order: '', dateOpCom: '', process: '', user: '', dateUpdated: '', status: '' }
	tableData: Array<any> = []; //Array<BinnacleEventDTO>
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
		{key: 'licenseDescription'     , label: 'Descripcion / Concepto de la Licencia'},
		{key: 'plantOperatorOpened'  , label: 'Nombre(s)/Apellidos(s) Operador Planta Abrio'},
		{key: 'plantOperatorClosed'  , label: 'Nombre(s)/Apellidos(s) Operador Planta Cerro'},
		{key: 'cenaceOperatorOpened'  , label: 'Nombre(s)/Apellidos(s) Operador CENACE Abrio'},
		{key: 'cenaceOperatorClosed'  , label: 'Nombre(s)/Apellidos(s) Operador CENACE Cerro'},
		{key: 'sourceEvent'                     , label: 'Fuente del Evento'},
		{key: 'estatusEvento'                    , label: 'Estatus del Evento'},
		{key: 'estatusAprobacion'                 , label: 'Estatus de Aprobacion'},
		{key: 'plantOperatorAccepted'            , label: 'Nombre(s)/Apellidos(s) Supervisor (Aprobo / Rechazo)'},
		{key: 'usuario'                             , label: 'Usuario'},
		{key: 'fechaYHoraDeUltimaModificacion'      , label: 'Fecha y Hora de Ultima Modificacion'},
		{key: 'estatus'                             , label: 'Comentarios'}

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
		'licenseDescription',
		'plantOperatorOpened',
		'plantOperatorClosed',
		'cenaceOperatorOpened',
		'cenaceOperatorClosed',
		'sourceEvent',
		'estatusEvento',
		'estatusAprobacion',
		'plantOperatorAccepted',
		'usuario',
		'fechaYHoraDeUltimaModificacion',
		'sys_see',
		'sys_edit',
		'sys_delete'
	];
	tableRowXpage = [100, 250, 500];

	optionsFiltersType   : IdLabel[] = [{id:1,label:'Todos'},{id:2,label:'Al menos uno'}];
	comboClasificacionEventos : IdLabel[] = [];
	comboEventos : IdLabel[] = [];
	comboCobustible : IdLabel[] = [];
	comboUnidad : IdLabel[] = [];
	comboContratoImpactado : IdLabel[] = [];
	comboRealCCDV : IdLabel[] = [];
	comboBandaTolerancia : IdLabel[] = [];
	comboTipoMercado : IdLabel[] = [];
	comboServiciosConexos : IdLabel[] = [];
	comboEquipo : IdLabel[] = [];
	comboNombreOpePlantaA : IdLabel[] = [{id:1,label:'option'}];
	comboNombreOpePlantaC : IdLabel[] = [{id:1,label:'option'}];
	comboFuenteEvento : IdLabel[] = [];
	comboEstatusEvento : IdLabel[] = [];
	comboEstatusAprovacion : IdLabel[] = [];
	comboUsuarioModifico : IdLabel[] = [{id:1,label:'option'}];
	constructor(
		private formBuilder: FormBuilder,
		public toastr: ToastrManager,
		public eventService: EventService,
		public binnacleService: BinnacleService,
		private masterCatalogService: MasterCatalogService,
		private estatusMaestroService: EstatusMaestroService
	) { }

	ngOnInit() {
		this.addBlock(1, '');
		this.formQuery = this.formBuilder.group({
			typeFilter: [2],
			dateTimeStartFrom: [null],
			dateTimeStartTo: [null],
			eventsClassificationId: [null],
			eventsId: [null],
			fuelsId: [null],
			powerMwFrom: [null],
			powerMwTo: [null],
			unitsId: [null],
			impactContractsId: [null],
			realsCcdvId: [null],
			toleranceBandsId: [null],
			marketTypesId: [null],
			mwOfferedFrom: [null],
			mwOfferedTo: [null],
			relatedServicesId: [null],
			licenseNumber: [null],
			equipmentId: [null],
			initialChargeFrom: [null],
			initialChargeTo: [null],
			finalChargeFrom: [null],
			finalChargeTo: [null],
			mwPowerLossFrom: [null],
			mwPowerLossTo: [null],
			workOrderId: [null],
			plantOperatorOpened: [null],
			plantOperatorClosed: [null],
			cenaceOperatorOpened: [null],
			cenaceOperatorClosed: [null],
			sourceEventId: [null],
			estatusAprobacionId: [null],
			estatusEventoId: [null],
			usuario: [null],
			dateUpdatedFrom: [null],
			dateUpdatedTo: [null]
		});
		this.onLoadInit();
		this.loadCatalog();
	}
	onDateFromChange() {
		this.dateToMin = new Date(this.formQuery.get('dateTimeStartFrom').value);
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
				this.tableData.forEach((element) => {
					i++;
					element.order = i;
					element.usuario = (element.userUpdated !== null) ? element.userUpdated : element.userCreated;
					if(element.estatusEvento == "Evento Abierto" && element.estatusAprobacion == "Evento Rechazado"){
						element.backgroundColor = '#F08080';
					}else if(element.estatusEvento == "Evento Cerrado" && element.estatusAprobacion == "Evento Aprobado"){
						element.backgroundColor = '#9ACD32';
					}else if(element.estatusEvento == "Evento Terminado" && element.estatusAprobacion == "Evento Sin Aprobacion"){
						element.backgroundColor = '#FFD700';
					}else if(element.estatusEvento == "Evento Abierto" && element.estatusAprobacion == "Evento Sin Aprobacion"){
						element.backgroundColor = '#DCDCDC';
					}
				});
				this.addBlock(2, '');
			},
			errorData => {
				this.toastr.errorToastr('Problemas en la consulta', 'Error');
				this.addBlock(2, '');
			},
			() => {
				console.log('loadMasters:: ', 'Termino');
				this.addBlock(2, '');
			});
	}

	onFormQuerySubmitBack(o) {
		this.addBlock(1, '');
		this.binnacleService.searchEvents(o.searchText).subscribe(
			(data: Array<BinnacleEventDTO>) => {
				this.tableData = data.sort((a, b) =>  moment(a.dateTimeStart).toDate().getTime() - moment(b.dateTimeStart).toDate().getTime());
				let i = 0;
				this.tableData.forEach((element) => {
					i++;
					element.order = i;
					element.usuario = (element.userUpdated !== null) ? element.userUpdated : element.userCreated;
					if(element.estatusEvento == "Evento Abierto" && element.estatusAprobacion == "Evento Rechazado"){
						element.backgroundColor = '#F08080';
					}else if(element.estatusEvento == "Evento Cerrado" && element.estatusAprobacion == "Evento Aprobado"){
						element.backgroundColor = '#9ACD32';
					}else if(element.estatusEvento == "Evento Terminado" && element.estatusAprobacion == "Evento Sin Aprobacion"){
						element.backgroundColor = '#FFD700';
					}else if(element.estatusEvento == "Evento Abierto" && element.estatusAprobacion == "Evento Sin Aprobacion"){
						element.backgroundColor = '#DCDCDC';
					}
				});

				this.addBlock(2, '');
			},
			errorData => {
				this.toastr.errorToastr('Problemas en la consulta', 'Error');
				this.addBlock(2, '');
			},
			() => {
				console.log('loadMasters:: ', 'Termino');
				this.addBlock(2, '');
			});
	}
	onFormQuerySubmit(o) {
		this.addBlock(1, '');
		this.binnacleService.eventsSearch(o).subscribe(
			(data: Array<BinnacleEventDTO>) => {
				this.tableData = data.sort((a, b) =>  moment(a.dateTimeStart).toDate().getTime() - moment(b.dateTimeStart).toDate().getTime());
				let i = 0;
				this.tableData.forEach((element) => {
					i++;
					element.order = i;
					element.usuario = (element.userUpdated !== null) ? element.userUpdated : element.userCreated;
					if(element.estatusEvento == "Evento Abierto" && element.estatusAprobacion == "Evento Rechazado"){
						element.backgroundColor = '#F08080';
					}else if(element.estatusEvento == "Evento Cerrado" && element.estatusAprobacion == "Evento Aprobado"){
						element.backgroundColor = '#9ACD32';
					}else if(element.estatusEvento == "Evento Terminado" && element.estatusAprobacion == "Evento Sin Aprobacion"){
						element.backgroundColor = '#FFD700';
					}else if(element.estatusEvento == "Evento Abierto" && element.estatusAprobacion == "Evento Sin Aprobacion"){
						element.backgroundColor = '#DCDCDC';
					}
				});

				this.addBlock(2, '');
			},
			errorData => {
				this.toastr.errorToastr('Problemas en la consulta', 'Error');
				this.addBlock(2, '');
			},
			() => {
				console.log('loadMasters:: ', 'Termino');
				this.addBlock(2, '');
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
		this.binnacleService.deleteBinnacleEvent(element).subscribe(
			data => {
				this.toastr.successToastr('Elemento Correctamente Borrado', 'Exito');
				this.onLoadInit();
			},
			errorData => {
				this.toastr.errorToastr(errorData.error.message, 'Error');
			},
			() => {
				console.log('deleteBinnacleEvent:: ', 'Termino');
			});
	}
	addBlock(type, msg): void {
		this.eventService.sendApp(new EventMessage(1,
			new EventBlocked(type, msg)));
	}
	clearFilters(){
		this.formQuery.reset();
		this.formQuery.controls.typeFilter.setValue(2);
	}
	loadCatalog() {
		this.addBlock(1, '');
		const names = ['CLASIFICA EVENTO', 'EVENTO', 'COMBUSTIBLE', 'UNIDAD', 'CONTRATO IMPACTADO', 'REAL-CCDV', 'BANDA TOLERANCIA',
		'TIPO MERCADO MEM', 'SERVICIOS CONEXOS MEM', 'EQUIPO', 'FUENTE EVENTO'];
		this.masterCatalogService.listCatalog(names).subscribe(data  => {
			this.loadSelect(this.comboClasificacionEventos, data['CLASIFICA EVENTO']);
			this.loadSelect(this.comboEventos, data['EVENTO']);
			this.loadSelect(this.comboCobustible, data['COMBUSTIBLE']);
			this.loadSelect(this.comboUnidad, data['UNIDAD']);
			this.loadSelect(this.comboContratoImpactado, data['CONTRATO IMPACTADO']);
			this.loadSelect(this.comboRealCCDV, data['REAL-CCDV']);
			this.loadSelect(this.comboBandaTolerancia, data['BANDA TOLERANCIA']);
			this.loadSelect(this.comboTipoMercado, data['TIPO MERCADO MEM']);
			this.loadSelect(this.comboServiciosConexos, data['SERVICIOS CONEXOS MEM']);
			this.loadSelect(this.comboEquipo, data['EQUIPO']);
			this.loadSelect(this.comboFuenteEvento, data['FUENTE EVENTO']);
		},error => {});
		
		this.loadCatalogStatus('TX_BINNACLE_EVENT', this.comboEstatusAprovacion);
		this.loadCatalogStatus('TX_BINNACLE_EVENT_II', this.comboEstatusEvento);
	}
	loadSelect(selectCombo: Array<any>, catalog: Array<MaestroOpcionDTO>) {
		if (catalog !== null) {
			catalog.forEach((element: MaestroOpcionDTO) => {
				selectCombo.push({id: element.maestroOpcionId, label: element.opcion.codigo, maestroOpcionId: element.maestroOpcionId});
			});
			selectCombo.sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()));
		}
	}
	
	loadCatalogStatus(entidad: string, lstStatus: IdLabel[]) {
		this.estatusMaestroService.getCatalogoEntidad(entidad).subscribe((data: Array<EntidadEstatusDTO>)  => {
			data.forEach((element: EntidadEstatusDTO) => {
				lstStatus.push({id: element.entidadEstatusId, label: element.estatus.nombre});
			});
		}, errorData => {
				return '';
			},
			() => {
				console.log("cargo estatus");
			});
	}
	onbtndownload(){
		console.log("onbtndownload");
		
	}
}
