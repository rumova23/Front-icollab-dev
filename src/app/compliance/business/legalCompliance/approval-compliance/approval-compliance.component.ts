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

	menu: any[];
	nombreCatalogo: string;
	matrixDisplay: string[];
	showAdd: boolean;
	showView: boolean;
	showUpdate: boolean;
	showDelete: boolean;
	isSupervisor: boolean;
	filtrosForm: FormGroup;
	formFiltersTable: FormGroup;
	formFiltersType : FormGroup;
	formTrack : FormGroup;
	currentYear : number;
	optionsClasificacion: IdLabel[];
	comboUnitPeriod: any[];
	optionsPeriod: IdLabel[];
	comboAutoridad: IdLabel[];
	comboTipoAplicacion: IdLabel[];
	comboGrupo: IdLabel[];
	matrix: any[];
	tagAutoList: string[];
	complianceNameAutoList: string[];
	userAutoList: string[];
	plural: string;
	matrixLabels: ColumnLabel[];
	andOrOptions: IdLabel[];
	tableRowXPage: number[];
	trackLabels: ColumnLabel[];
	trackDisplay: string[];
	showTrack: boolean;
	showObservation: boolean;
	statusMatrix: string;
	tracks : Array<any>;
	approveMatrix: boolean;
	rejectMatrix: boolean;
	generateTasks: boolean;

	constructor(
		public globalService: GlobalService,
		private formBuilder: FormBuilder,
		public eventService: EventService,
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

		this.tableRowXPage = [50, 100];
		this.showAdd = false;
		this.showView = false;
		this.showUpdate = false;
		this.showDelete = false;
		this.isSupervisor = false;
		this.comboAutoridad = [];
		this.comboTipoAplicacion = [];
		this.comboGrupo = [];
		this.matrix = [];
		this.optionsClasificacion = null;
		this.comboUnitPeriod = [];
		this.optionsPeriod = [];
		this.plural = null;
		this.showTrack = false;
		this.showObservation = false;
		this.statusMatrix = null;
		this.tracks = [];
		this.statusMatrix = '';
 		this.approveMatrix = false;
		this.rejectMatrix = false;
		this.generateTasks = false;


		this.nombreCatalogo = "Aprobación de Cumplimiento/Generación de Tareas";
		this.matrixDisplay = [
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
		this.matrixLabels = [
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
		this.andOrOptions = [
			{ id: 1, label: "Todos" },
			{ id: 2, label: "Al menos uno" },
		];
		this.trackLabels = [
			{key: 'binnacleEventID', label: 'id'},
			{key: 'order', label: '#' },
//			{key: 'dateTimeStartString', label: 'Fecha y Hora Inicial'},
//			{key: 'dateTimeEndString', label: 'Fecha y Hora Final'},
//			{key: 'eventsClassification', label: 'Clasificacion de Eventos'},
			{key: 'events', label: 'Eventos'},
//			{key: 'estatusEvento', label: 'Estatus del Evento'},
//			{key: 'estatusAprobacion', label: 'Estatus de Aprobacion'},
			{key: 'usuario', label: 'Usuario'},
			{key: 'fechaYHoraDeUltimaModificacion', label: 'Fecha y Hora de Ultima Modificacion'},
			{key: 'estatus', label: 'Comentarios'}
		];
		this.trackDisplay = [
			'order',
//			'dateTimeStartString',
//			'dateTimeEndString',
//			'eventsClassification',
			'events',
//			'estatusEvento',
//			'estatusAprobacion',
			'usuario',
			'fechaYHoraDeUltimaModificacion',
		];

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
		this.obtenerListaPorAnio(this.currentYear);

		this.initAutoComplete();

	}

	obtenerListaPorAnio(anio:number) {

		this.tagService.obtenTagPorFiltros(anio)

			.subscribe((data: MatrizCumplimientoDTO) => {

				this.setTableData(data.matriz);

				if (this.showView) {
					if (!this.matrixDisplay.includes('sys_see')) this.matrixDisplay.push('sys_see');
				}
				if (this.showUpdate) {
					if (!this.matrixDisplay.includes('sys_edit')) this.matrixDisplay.push('sys_edit');
				}
				if (this.showDelete) {
					if (!this.matrixDisplay.includes('sys_delete')) this.matrixDisplay.push('sys_delete');
				}
			},
			error => {
				this.toastr.errorToastr('Error al cargar lista de tags.', 'Lo siento,');

			}
		);
	}

	obtenerListaParam() {
		let params = this.assamblerRequest ();
		this.tagService.obtenTagFiltros(params).subscribe((data: MatrizCumplimientoDTO) => {

			this.setTableData(data.matriz);

			if (this.showView) {
				if (!this.matrixDisplay.includes('sys_see')) this.matrixDisplay.push('sys_see');
			}
			if (this.showUpdate) {
				if (!this.matrixDisplay.includes('sys_edit')) this.matrixDisplay.push('sys_edit');
			}
			if (this.showUpdate) {
				if (!this.matrixDisplay.includes('sys_delete')) this.matrixDisplay.push('sys_delete');
			}
		},
			error => {
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
		});
	}

	setTableData(matriz: TagOutDTO[]) {

		this.matrix = matriz
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
  			this.tagService.obtenTagCatalogos( new HttpParams ( ).set ( "tag", $event.target.value )).subscribe((data: any) => {
				this.tagAutoList = data;
			});

		} else {
			this.tagAutoList = [];
		}
	}

	keyUpComplianceName ($event) : void {
		if ($event.target.value.length > 3 ) {
  			this.tagService.obtenTagCatalogos( new HttpParams ( ).set ( "classificationActivity", $event.target.value )).subscribe((data: any) => {
				this.complianceNameAutoList = data;
			});

		} else {
			this.complianceNameAutoList = [];
		}
	}

	keyUpUserUpdate ($event) : void {
		if ($event.target.value.length > 3 ) {
  			this.tagService.obtenTagCatalogos( new HttpParams ( ).set ( "userUpdated", $event.target.value )).subscribe((data: any) => {
				this.userAutoList = data;
			});

		} else {
			this.userAutoList = [];
		}
	}

 	saveObservation() {
		let binnacle : any;
		binnacle = {
			binnacleEventID : this.formFiltersTable.controls['clasificacion'].value,
			estatusAprobacion : "Evento Rechazado",
			reasonObservation : this.formTrack.controls['observation'].value
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
	}

	aprobarMatrizCumplimiento() {

		if (this.filtrosForm.controls.fAnio.value != null) {
			let year = moment ( this.filtrosForm.controls.fAnio.value ).year( );
			this.administratorComplianceService.apruebaMatrizCumplimiento(year).subscribe(
				response => {
					this.toastr.successToastr('Se aprobo correctamente la matriz de cumplimiento', '¡Se ha logrado!');
					this.obtenerListaPorAnio(year);
 					this.statusMatrix = "Aprobado"
/*					this.approveMatrix = false;
					this.rejectMatrix = true;
					this.generateTasks = true; */
				},
				error => {
					this.toastr.errorToastr('Error en la aprovación de la matriz.', 'Lo siento,');

			});
		} else {
			this.toastr.warningToastr('Selecciona un año.' );
		}
	}

	rechazarMatrizCumplimiento() {

		if (this.filtrosForm.controls.fAnio.value != null) {
			let year = moment ( this.filtrosForm.controls.fAnio.value ).year( );
			this.administratorComplianceService.liberaMatrizCumplimiento(year).subscribe(
				(responseLiberacion: GenerigResponseDTO) => {
					this.toastr.successToastr(responseLiberacion.mensaje, '¡Se ha logrado!');
					this.obtenerListaPorAnio(year);
//					this.showTrack = true;
					this.showObservation = true;
					this.statusMatrix = "Rechazado";
/* 					this.approveMatrix = true;
					this.rejectMatrix = false;
					this.generateTasks = false; */
				},
				error => {
					this.toastr.errorToastr('Error en el rechazo de la matriz.', 'Lo siento,');
			});
		}
	}

    generarTareas() {

        if (this.formFiltersTable.controls.clasificacion.value) {
			let year = moment ( this.filtrosForm.controls.fAnio.value ).year( );
            this.administratorComplianceService.getTasks(
                year,
                1,
                this.formFiltersTable.controls.clasificacion.value).subscribe(
                (data: MatrizCumplimientoDTO) => {
                    this.setTableData(data.matriz);
/* 					this.approveMatrix = false;
					this.rejectMatrix = false;
					this.generateTasks = false; */
					this.toastr.infoToastr('Generación de tareas exitoso.', '');
				},
				error => {
					this.toastr.errorToastr('Error en la generación de tareas.', 'Lo siento,');
				}
            );
        } else {
			this.toastr.warningToastr('Falta selecionar la clasificación', 'Lo siento,');
		}
    }

 	getTrack() {
		let binnacle : any;
		binnacle = {
			binnacleEventID : this.formFiltersTable.controls['clasificacion'].value,
		}
		this.binnacleService.eventsSearch(binnacle).subscribe(
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

			},
			errorData => {
				this.toastr.errorToastr('Problemas en la consulta', 'Error');
			},
			() => {
				console.log('loadMasters:: ', 'Termino');
			});
	}

	eventChangeAnio(d: Moment) {
		let selectYear = d.year ();
 		if ( selectYear < this.currentYear+1 ) {
			this.approveMatrix = false;
			this.rejectMatrix = false;
			this.generateTasks = false;

		} else {
			if (this.approveMatrix) {
				this.rejectMatrix = false;
				this.generateTasks = false;
			} else if (this.rejectMatrix) {
				this.generateTasks = true;
			} else {
			    this.approveMatrix = true;
			    this.rejectMatrix = false;
				this.generateTasks = false;
			}
		}
		this.obtenerListaPorAnio(selectYear);
	}

}
