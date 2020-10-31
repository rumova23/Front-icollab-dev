import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { MatPaginator, MatTableDataSource, MatSort, Sort, MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GlobalService } from "src/app/core/globals/global.service";
import { IdLabel } from "src/app/core/models/IdLabel";
import { ColumnLabel } from "src/app/core/models/ColumnLabel";
import { EventService } from "src/app/core/services/event.service";
import { EventMessage } from "src/app/core/models/EventMessage";
import { ToastrManager } from "ng6-toastr-notifications";
import { EventBlocked } from "src/app/core/models/EventBlocked";
import { timer } from "rxjs";
import { OrderCatalogDTO } from "src/app/compliance/models/OrderCatalogDTO";
import { TagService } from "src/app/compliance/services/tag.service";
import { MaestroOpcionDTO } from "src/app/compliance/models/maestro-opcion-dto";
import { Moment } from 'moment';
import { DatePipe } from '@angular/common';
import { AdministratorComplianceService } from 'src/app/compliance/administration/services/administrator-compliance.service';
import { MatrizCumplimientoDTO } from '../../../models/matriz-cumplimiento-dto';
import { TagOutDTO } from 'src/app/compliance/models/tag-out-dto';
import * as moment from 'moment';
import { HttpParams } from '@angular/common/http';
import * as Util from 'src/app/core/helpers/util.general';
import { SecurityService } from 'src/app/core/services/security.service';
import { GenerigResponseDTO } from 'src/app/compliance/models/GenerigResponseDTO';
import { IncidentService } from 'src/app/bits/services/incident.service';
import { IncidentObservationOutDTO } from 'src/app/bits/models/IncidentObservationOutDTO';
import { ResponseVO } from 'src/app/bits/models/ResponseVO';
import { map } from 'rxjs/operators';
import {BinnacleEventDTO} from '../../../../safe/models/binnacle-event-dto';
import {BinnacleService} from '../../../../safe/services/binnacle.service';
//import { ApprovalCompliace } from './approval-compliance';

@Component({
	selector: "app-approval-compliance",
	templateUrl: "./approval-compliance.component.html",
	styles: [],
})
export class ApprovalComplianceComponent implements OnInit {

	administradores;
	isSupervisor = false;
	nombreCatalogo = "Aprobación de Cumplimiento/Generación de Tareas";
	tableData;
	tableDataFiltered;
	plural = "";
	data: any[] = [];
	formFiltersType : FormGroup;
	menu: any[];
	showAdd = false;
	showView = false;
	showUpdate = false;
	showDelete = false;
	//approved: string;
	statusMatrix: string;
	approveMatrix: boolean;
	rejectMatrix: boolean;
	generateTasks: boolean;
	formTrack : FormGroup;
	tracks : Array<any> = [];
	tracksColumnsDisplay = [
		'order',
		'dateTimeStartString',
		'dateTimeEndString',
		'eventsClassification',
		'events',
		'estatusEvento',
		'estatusAprobacion',
		'usuario',
		'fechaYHoraDeUltimaModificacion',
	];

	trackColumnsLabels = [
		{key: 'binnacleEventID'                                  , label: 'id'},
		{key: 'order'                               , label: '#',isSticky:true},
		{key: 'dateTimeStartString'                   , label: 'Fecha y Hora Inicial'},
		{key: 'dateTimeEndString'                     , label: 'Fecha y Hora Final'},
		{key: 'eventsClassification'              , label: 'Clasificacion de Eventos',isSticky:true},
		{key: 'events'                             , label: 'Eventos'},
		{key: 'estatusEvento'                    , label: 'Estatus del Evento'},
		{key: 'estatusAprobacion'                 , label: 'Estatus de Aprobacion'},
		{key: 'usuario'                             , label: 'Usuario'},
		{key: 'fechaYHoraDeUltimaModificacion'      , label: 'Fecha y Hora de Ultima Modificacion'},
		{key: 'estatus'                             , label: 'Comentarios'}
	];
/* 		'order',
		'userUpdated',
		'observation',
		'dateUpdated',
		'sys_checkbox',
		'sys_edit',
		'sys_delete', */
/* 		{ key: 'order', label: '#' },
		{ key: 'userUpdated', label: 'Nombre' },
		{ key: 'observation', label: 'Observaciones' },
		{ key: 'dateUpdated', label: 'Fecha de Ultima Modificación' , dateFormat:'dd/MM/yyyy HH:mm' },
 */
	
	trackId : number;
	showTrack : boolean;

	tablaColumnsLabels: ColumnLabel[] = [
		{ key: 'order', label: '#' },
		{ key: "tag", label: 'TAG' },
		{ key: "nombre", label: 'Nombre del Cumplimiento' },
		{ key: "clasificacion", label: 'Categoría' },
		{ key: "cumplimiento_legal", label: 'Tipo de Cumplimiento' },
		{ key: "autoridad", label: 'Autoridad' },
		{ key: "tipo_aplicacion", label: 'Tipo de Aplicación' },
		{ key: "grupo", label: 'Grupo' },
		{ key: "periodo_entrega", label: 'Período de Entrega' },
		{ key: "countTasks", label: 'Generados' },
		{ key: "userUpdated", label: 'Usuario Última Modificación' },
		{ key: "dateUpdated", label: 'Fecha y Hora de Última Modificación', dateFormat: 'dd/MM/yyyy HH:mm' },
		{ key: "estatus", label: 'Estatus' }
	];
	
	tableColumnsDisplay: string[] = [
		'order',
		'tag',
		'nombre',
		'clasificacion',
		'cumplimiento_legal',
		'periodo_entrega',
		'autoridad',
		'tipo_aplicacion',
		'grupo',
		'userUpdated',
		'dateUpdated',
		'estatus'
	];

	tableRowXpage = [50, 100];

	filtrosForm: FormGroup;
	formFiltersTable: FormGroup;
	formMatrizCumplimiento: FormGroup;

	optionsFiltersType: IdLabel[] = [
		{ id: 1, label: "Todos" },
		{ id: 2, label: "Al menos uno" },
	];

	filteredAutoTag: string[];
	filteredAutoName: string[];
	filteredUserUpdated: string[];
	optionsClasificacion: IdLabel[];
	comboUnitPeriod: any[] = [];
	optionsPeriod: IdLabel[] = [];
	comboAutoridad: IdLabel[] = [];
	comboTipoAplicacion: IdLabel[] = [];
	comboGrupo: IdLabel[] = [];

	tableRowXPage = [100, 500, 1000, 1500, 2000];

	isTrack : boolean;

	tableDataSeguimientoAprovacionesColumnsLabels: ColumnLabel[] = [
		{ key: "order", label: "#" },
		{ key: "date", label: "Fecha De Última Modificación", dateFormat: "dd/MM/yyyy HH:mm" }
	]
	tableDataSeguimientoAprovacionesColumnsDisplay: string[] = [
		"order",
		"Usuario",
		"Observaciones",
		"Estatus",
		"date"
	];
	currentYear : number;
	selectYear : number;

	formObservation: FormGroup;

	constructor(
		public globalService: GlobalService,
		private formBuilder: FormBuilder,
		public eventService: EventService,
		private datePipe: DatePipe,
		private toastr: ToastrManager,
		public incidentService : IncidentService,
		private administratorComplianceService: AdministratorComplianceService,
		private tagService: TagService,
		public dialog: MatDialog,
		private binnacleService: BinnacleService,
		public securityService: SecurityService) {
			this.menu = securityService.getMenu('Compliance');

		}

	ngOnInit() {

		/* this.tagService.getEntidadEstatus('TX_MATRIZ_CUMPLIMIENTO', 'Aprobada').subscribe((data: EntidadEstatusDTO) => {
			this.idMatrizFree = data.entidadEstatusId;
		}); */
		for (const option of this.menu) {
			if (option.children) {
				let flag = true;
				while (flag) {
					flag = false;
					for (let ins = 0; ins < option.children.length; ins++) {

						if (option.children[ins]['label'] === this.nombreCatalogo) {
							if (option.children[ins].actions) {
								for (let action = 0; action < option.children[ins].actions.length; action++) {
									if (option.children[ins].actions[action] === 'CREAR') {
										this.showAdd = true;
									}
									if (option.children[ins].actions[action] === 'VER') {
										this.showView = true;
									}
									if (option.children[ins].actions[action] === 'EDITAR') {
										this.showUpdate = true;
									}
									if (option.children[ins].actions[action] === 'BORRAR') {
										this.showDelete = true;
									}
								}
							}
						}
					}
				}
			}
		}

		this.addBlock(1, null);
		timer(1000).subscribe(() => this.addBlock(2, null));

		const user = JSON.parse(localStorage.getItem('user'));
		user.roles.forEach(role => {
			if (role.name === 'ROLE_ADMIN_CUMPLIMIENTO_COMPLIANCE') {
				this.isSupervisor = true;
			}
		});
		this.filtrosForm = this.formBuilder.group({
			fActividad: [{ value: '', disabled: false }, Validators.required],
			fAnio: [{ value: '', disabled: false }, Validators.required]
		});

		this.formFiltersTable = this.formBuilder.group({
			tag: [null],
			nombre: [null],
			clasificacion: [null],
			periodo_entrega_cantidad: [null],
			periodo_entrega_unidad: [null],
			autoridad: [null],
			tipo_aplicacion: [null],
			grupo: [null],
			estatus: ['1'],
			userUpdated: [null],
			minDate__dateUpdated: [''],
			maxDate__dateUpdated: [''],
		});

		this.formFiltersType = this.formBuilder.group({
			typeFilter:[2,Validators.required]
		});

		this.formTrack = this.formBuilder.group({
			id:[null],
			observation:[null,[Validators.required,Validators.minLength(1),Validators.maxLength(1000)]]
		});

		this.filtrosForm.controls.fAnio.setValue(moment(new Date()));
		this.currentYear = (new Date()).getFullYear();
		this.selectYear = this.currentYear;
		this.obtenerListaPorAnio(this.currentYear);

		this.initAutoComplete();

		this.isTrack = false;
		this.trackId = new Date ( ).getTime ( );
		this.showTrack = false;

		this.formObservation = this.formBuilder.group({
			observation: ['', [Validators.minLength(2), Validators.maxLength(2000)]]
		});

		this.statusMatrix = '';
/* 		this.approveMatrix = false;
		this.rejectMatrix = false;
		this.generateTasks = false;
 */		this.approveMatrix = true;
		this.rejectMatrix = true;
		this.generateTasks = true;
	}

	obtenerListaPorAnio(anio:number) {
		this.addBlock(1, 'Cargando...');
		this.data = [];

		this.tagService.obtenTagPorFiltros(anio)

			.subscribe((data: MatrizCumplimientoDTO) => {

				this.addBlock(2, null);
				
				this.setTableData(data.matriz);

				this.administradores =  new MatTableDataSource<any>(data.cumplimientoIntegrantes);
				



				if (this.showView) {
					if (!this.tableColumnsDisplay.includes('sys_see')) this.tableColumnsDisplay.push('sys_see');
				}
				if (this.showUpdate) {
					if (!this.tableColumnsDisplay.includes('sys_edit')) this.tableColumnsDisplay.push('sys_edit');
				}
				if (this.showUpdate) {
					if (!this.tableColumnsDisplay.includes('sys_delete')) this.tableColumnsDisplay.push('sys_delete');
				}
			},
			error => {
				this.addBlock(2, null);
				this.toastr.errorToastr('Error al cargar lista de tags.', 'Lo siento,');

			}
		);
	}

	obtenerListaParam() {
		this.addBlock(1, 'Cargando...');
		this.data = [];
		let params = this.assamblerRequest ();
		this.tagService.obtenTagFiltros(params).subscribe((data: MatrizCumplimientoDTO) => {

			this.setTableData(data.matriz);

			this.administradores =  new MatTableDataSource<any>(data.cumplimientoIntegrantes);
			
			this.addBlock(2, null);

			if (this.showView) {
				if (!this.tableColumnsDisplay.includes('sys_see')) this.tableColumnsDisplay.push('sys_see');
			}
			if (this.showUpdate) {
				if (!this.tableColumnsDisplay.includes('sys_edit')) this.tableColumnsDisplay.push('sys_edit');
			}
			if (this.showUpdate) {
				if (!this.tableColumnsDisplay.includes('sys_delete')) this.tableColumnsDisplay.push('sys_delete');
			}
		},
			error => {
				this.addBlock(2, null);
				this.toastr.errorToastr('Error al cargar lista de tags.', 'Lo siento,');

			}
		);
	}

	get f() { return this.filtrosForm.controls; }


	onTableRowSee(element) {
		const type = {
			dto: element,
			action: "ver",
			name: "",
		};
		this.eventService.sendChangePage(new EventMessage(null, type, "Compliance.ApprovalComplianceVComponent"));
	}

	aprobarMatrizCumplimiento() {
		//this.addBlock(1, null);
		if (this.filtrosForm.controls.fAnio.value != null) {
			let year = moment ( this.filtrosForm.controls.fAnio.value ).year( );
			this.administratorComplianceService.apruebaMatrizCumplimiento(year).subscribe(
				response => {
					this.toastr.successToastr('Se aprobo correctamente la matriz de cumplimiento', '¡Se ha logrado!');
					this.obtenerListaPorAnio(year);
					this.statusMatrix = "Aprobado"
					this.approveMatrix = false;
					this.rejectMatrix = true;
					this.generateTasks = true;
				},
				error => {
					this.toastr.errorToastr('Error en la aprovación de la matriz.', 'Lo siento,');

			});
		} else {
			this.toastr.warningToastr('Selecciona un año.' );
		}
		//this.addBlock(2, null);
	}
	rechazarMatrizCumplimiento() {
        //this.addBlock(1, 'Cargando...');
		if (this.filtrosForm.controls.fAnio.value != null) {
			let year = moment ( this.filtrosForm.controls.fAnio.value ).year( );
			this.administratorComplianceService.liberaMatrizCumplimiento(year).subscribe(
				(responseLiberacion: GenerigResponseDTO) => {
					this.toastr.successToastr(responseLiberacion.mensaje, '¡Se ha logrado!');
					this.obtenerListaPorAnio(year);
					this.isTrack = true;
					this.statusMatrix = "Rechazado";
					this.showTrack = true;
					this.approveMatrix = true;
					this.rejectMatrix = false;
					this.generateTasks = false;
				},
				error => {
					this.toastr.errorToastr('Error en el rechazo de la matriz.', 'Lo siento,');
			});
		}
		//this.addBlock(2, null);
	}

    generarTareas() {
    	//this.addBlock(1, null);
        if (this.formFiltersTable.controls.clasificacion.value) {
			let year = moment ( this.filtrosForm.controls.fAnio.value ).year( );
            this.administratorComplianceService.getTasks(
                year,
                1,
                this.formFiltersTable.controls.clasificacion.value).subscribe(
                (data: MatrizCumplimientoDTO) => {
                    this.setTableData(data.matriz);
                    this.administradores =  new MatTableDataSource<any>(data.cumplimientoIntegrantes);
					this.isTrack = true;
					this.approveMatrix = false;
					this.rejectMatrix = false;
					this.generateTasks = false;
					this.toastr.infoToastr('Generación de tareas exitoso.', '');
				},
				error => {
					this.toastr.errorToastr('Error en la generación de tareas.', 'Lo siento,');
				}
            );
        } else {
			this.toastr.warningToastr('Falta selecionar la clasificación', 'Lo siento,');
		}
		//this.addBlock(2, null);
    }

	SeguimientoAprovaciones() {
//		this.showTrack = !this.showTrack;
	}
	
	addBlock(type, msg): void {
		this.eventService.sendApp(new EventMessage(1, new EventBlocked(type, msg)));
	}

	initAutoComplete() {

		let statusConsultActivity = 'TODOS'; // 'TODOS' || 'ACTIVOS'
		this.tagService.getCatalogoActividades(statusConsultActivity)
			.subscribe(catalogoResult => {
				this.optionsClasificacion = catalogoResult.map(e => { return { id: e.consecutive, label: e.name }; });
			},
				error => {
					this.toastr.errorToastr('Error al cargar catálogo de Categoría.', 'Lo siento,');
				}
			);

		this.tagService.comboUnitPeriod().subscribe(
			(lista: Array<MaestroOpcionDTO>) => {
				console.dir(lista);
				this.comboUnitPeriod = lista.map(e => { return { id: e.maestroOpcionId.toString(), singular: e.opcion.codigo, plural: e.opcion.codigo + '' + (e.opcion.codigo == 'MES' ? 'ES' : 'S') }; });
				this.optionsPeriod = this.comboUnitPeriod.map(e => { return { id: e.id, label: e.singular } });
			});

		let listaCombos = Array<OrderCatalogDTO>();
		listaCombos.push(new OrderCatalogDTO('typeCompliance', 1, 1));
		listaCombos.push(new OrderCatalogDTO('authority', 1, 1));
		listaCombos.push(new OrderCatalogDTO('typeApplication', 1, 1));
		listaCombos.push(new OrderCatalogDTO('typeDay', 1, 1));
		listaCombos.push(new OrderCatalogDTO('group', 1, 1));
		this.tagService.getlistCatalogoOrdenados(listaCombos).subscribe(
			(catalogs: any) => {
				catalogs.forEach(element => {
					if (element.catalog === 'authority')
						this.comboAutoridad = element.data.map(e => { return { id: e.id, label: e.code }; });
					else if (element.catalog === 'typeApplication')
						this.comboTipoAplicacion = element.data.map(e => { return { id: e.id, label: e.code }; });
					else if (element.catalog === 'group')
						this.comboGrupo = element.data.map(e => { return { id: e.id, label: e.code }; });

				});
			}
		).add(() => {
			this.addBlock(2, null);
		});
	}

	setTableData(matriz: TagOutDTO[]) {

		this.tableData = matriz
			.map((e: TagOutDTO, index) => {
				let dateUpdated = ((e.dateUpdated != null) ? e.dateUpdated : e.dateCreated);
				return {
					'order': index + 1,
					'idTag': e.idTag,
					'tag': e.tag,
					'nombre': e.classificationActivity ? e.classificationActivity : '',
					'clasificacion': e.activity ? e.activity.name : '',
					'cumplimiento_legal': (e.typeCompliance && e.typeCompliance.code) ? e.typeCompliance.code : '',
					'periodo_entrega': this.formatPeriodo_entrega(e.period ? e.period : 0, (e.unitPeriod && e.unitPeriod.code) ? e.unitPeriod.code : ''),
					'countTasks': e.countCompliance ? e.countCompliance : '',
					'autoridad': (e.authority && e.authority.code) ? e.authority.code : '',
					'tipo_aplicacion': (e.applicationType && e.applicationType.code) ? e.applicationType.code : '',
					'grupo': (e.group && e.group.code) ? e.group.code : '',
					'userUpdated': e.userUpdated ? e.userUpdated : e.userCreated ? e.userCreated : '',
					'dateUpdated': e.dateUpdated ? e.dateUpdated : e.dateCreated ? e.dateCreated : '',
					'estatus': (e.active) ? 'Activo' : 'Inactivo'
				};
			});
		this.tableDataFiltered = [].concat(this.tableData);
	}

	formatPeriodo_entrega(period, code) {
		period > 1 ? this.plural = "S" : this.plural = "";
		if (code == "MES" && period > 1) this.plural = "ES"
		return period + ' ' + code + this.plural;
	}

	onFiltersTable() {

		if ( !Util.isEmptyFilters2 ( this.formFiltersTable.value ) ) {
			this.obtenerListaParam();
		} else {
			this.toastr.warningToastr("Tienes que capturar al menos un dato de búsqueda.");
		}

	}

	limpiarFiltros() {
		this.formFiltersTable.reset();
		this.obtenerListaParam();
		let binn : any;
		binn = {
			events:"AGC"
		};
//		this.onFormQuerySubmit(binn);
	}

	isnumeric(v) {
		if (isNaN(Number(v)) || 0 === Number(v)) {
			// para no permitir letras, que en firefox si permite insertarlas
			v = null;
			this.formFiltersTable.controls.periodo_entrega_cantidad.setValue(null);
		}
		if (Number(v) > 1) {
			this.optionsPeriod = this.comboUnitPeriod.map((e) => {
				return { id: e.id, label: e.plural };
			});
		} else if (Number(v) <= 1) {
			this.optionsPeriod = this.comboUnitPeriod.map((e) => {
				return { id: e.id, label: e.singular };
			});
		}
	}

	assamblerRequest ( ) : HttpParams {

		return new HttpParams ( )
			.set ( "type", this.formFiltersType.value.typeFilter.toString() === '1' ? 'AND' : 'OR' )
			.set ( "tag", this.formFiltersTable.controls['tag'].value == null ? "" : this.formFiltersTable.controls['tag'].value)
			.set ( "classificationActivity", this.formFiltersTable.controls['nombre'].value == null ? "" : this.formFiltersTable.controls['nombre'].value)
			.set ( "activityName", this.formFiltersTable.controls['clasificacion'].value == null ? "" : this.formFiltersTable.controls['clasificacion'].value)
			.set ( "period", this.formFiltersTable.controls['periodo_entrega_cantidad'].value == null ? "" : this.formFiltersTable.controls['periodo_entrega_cantidad'].value)
			.set ( "unitPeriodCode", this.formFiltersTable.controls['periodo_entrega_unidad'].value == null ? "" : this.formFiltersTable.controls['periodo_entrega_unidad'].value)
			.set ( "authorityCode", this.formFiltersTable.controls['autoridad'].value == null ? "" : this.formFiltersTable.controls['autoridad'].value)
			.set ( "applicationTypeCode", this.formFiltersTable.controls['tipo_aplicacion'].value == null ? "" : this.formFiltersTable.controls['tipo_aplicacion'].value)
			.set ( "groupCode", this.formFiltersTable.controls['grupo'].value == null ? "" : this.formFiltersTable.controls['grupo'].value)
			.set ( "active", this.formFiltersTable.controls['estatus'].value )
			.set ( "userUpdated", this.formFiltersTable.controls['userUpdated'].value == null ? "" : this.formFiltersTable.controls['userUpdated'].value)
			.set ( "minDateUpdated", this.formFiltersTable.controls['minDate__dateUpdated'].value )
			.set ( "maxDateUpdated", this.formFiltersTable.controls['maxDate__dateUpdated'].value )
	}

	keyUpTag ($event) : void {
		if ($event.target.value.length > 3 ) {
			//this.filteredAutoTag = ["hijo 1","nieto 3","nose 3","sobrino 2","talvez"];
  			this.tagService.obtenTagCatalogos( new HttpParams ( ).set ( "tag", $event.target.value )).subscribe((data: any) => {
				this.filteredAutoTag = data;
			});

		} else {
			this.filteredAutoTag = [];
		}
	}

	keyUpComplianceName ($event) : void {
		if ($event.target.value.length > 3 ) {
			//this.filteredAutoName = ["nc 04","nc 05","nc 06"];
  			this.tagService.obtenTagCatalogos( new HttpParams ( ).set ( "classificationActivity", $event.target.value )).subscribe((data: any) => {
				this.filteredAutoName = data;
			});

		} else {
			this.filteredAutoName = [];
		}
	}

	keyUpUserUpdate ($event) : void {
		if ($event.target.value.length > 3 ) {
			//this.filteredUserUpdated = ["josefina","gabriela","ivette"];
  			this.tagService.obtenTagCatalogos( new HttpParams ( ).set ( "userUpdated", $event.target.value )).subscribe((data: any) => {
				this.filteredUserUpdated = data;
			});

		} else {
			this.filteredUserUpdated = [];
		}
	}

/* 	saveObservation() {
		let binnacle : any;
		binnacle = {
			binnacleEventID : this.formFiltersTable.controls['clasificacion'].value,
			estatusAprobacion : "Evento Rechazado",
			reasonObservation : this.formObservation.controls['observation'].value
		}
		this.binnacleService.changeStatus(binnacle)
		    .subscribe(data  => {
			    this.toastr.successToastr('Cambio de Estatus Correcto: ' + "Evento Rechazado", 'Exito!.');
				this.showTrack = true;
		    }, error => {
			    this.toastr.errorToastr("Error al guardar la bitácora", 'Error!');
		    }, () => {

			    //const type = {};
			    //this.eventService.sendChangePage(
			    //new EventMessage(null, type, 'Compliance.SafeListOfEventsComponent')
			    //);
		});
	} */

/* 	onFormQuerySubmit(o) {
		this.addBlock(1, '');
		this.binnacleService.eventsSearch(o).subscribe(
			(data: Array<BinnacleEventDTO>) => {
				this.tracks = data;
				let i = 0;
				this.tracks.forEach((element) => {
					i++;
					element.order = i;
					element.userUpdated = (element.userUpdated !== null) ? element.userUpdated : element.userCreated;
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
	} */

	eventChangeAnio(d: Moment) {
		this.selectYear = d.year ();
/* 		if ( this.selectYear < this.currentYear+1 ) {
			this.approveMatrix = false;
			this.rejectMatrix = false;
			this.generateTasks = false;

		} else {
			if (this.approveMatrix) {
				this.rejectMatrix = false;
				this.generateTasks = false;
			} else if (this.rejectMatrix) {
				this.generateTasks = true;
			} else if ( this.tableData && this.tableData.length > 0 ) {
			    this.approveMatrix = true;
			    this.rejectMatrix = false;
				this.generateTasks = false;
			}
		}
		this.rejectMatrix = true;
 */		this.obtenerListaPorAnio(this.selectYear);
	}

}
