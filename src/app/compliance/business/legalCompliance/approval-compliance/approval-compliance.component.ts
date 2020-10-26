import { Component, OnInit } from "@angular/core";
import { MatPaginator, MatTableDataSource, MatSort, Sort } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GlobalService } from "src/app/core/globals/global.service";
import { IdLabel } from "src/app/core/models/IdLabel";
import { ColumnLabel } from "src/app/core/models/ColumnLabel";
import { EventService } from "src/app/core/services/event.service";
import { EventMessage } from "src/app/core/models/EventMessage";
import { ToastrManager } from "ng6-toastr-notifications";
import { EventBlocked } from "src/app/core/models/EventBlocked";
import { Observable, timer } from "rxjs";
import { OrderCatalogDTO } from "src/app/compliance/models/OrderCatalogDTO";
import { TagService } from "src/app/compliance/services/tag.service";
import { MaestroOpcionDTO } from "src/app/compliance/models/maestro-opcion-dto";
import { Moment } from 'moment';
import { DatePipe } from '@angular/common';
import { AdministratorComplianceService } from 'src/app/compliance/administration/services/administrator-compliance.service';
import { MatrizCumplimientoDTO } from '../../../models/matriz-cumplimiento-dto';
import { TagOutDTO } from 'src/app/compliance/models/tag-out-dto';
import * as moment from 'moment';
import { Combo } from 'src/app/compliance/models/Combo';
import { HttpParams } from '@angular/common/http';
import * as Util from 'src/app/core/helpers/util.general';
import { SecurityService } from 'src/app/core/services/security.service';
import { GenerigResponseDTO } from 'src/app/compliance/models/GenerigResponseDTO';
import { IncidentService } from 'src/app/bits/services/incident.service';
import { IncidentObservationOutDTO } from 'src/app/bits/models/IncidentObservationOutDTO';
import { ResponseVO } from 'src/app/bits/models/ResponseVO';
import { map } from 'rxjs/operators';

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
	tiposCumplimientos: Array<any>;
	actividades: Array<any>;
//	anios: Array<any>;
	data: any[] = [];
	formFiltersType : FormGroup;
	menu: any[];
	showAdd = false;
	showView = false;
	showUpdate = false;
	showDelete = false;
	initDate;
	approved: string;
	formTrack : FormGroup;
	tracks : IncidentObservationOutDTO[] = [];
	tracksColumnsDisplay = [
		'order',
		'userUpdated',
		'observation',
		'dateUpdated',
		'sys_checkbox',
		'sys_edit',
		'sys_delete',
	];
	trackColumnsLabels = [
		{ key: 'order', label: '#' },
		{ key: 'userUpdated', label: 'Nombre' },
		{ key: 'observation', label: 'Observaciones' },
		{ key: 'dateUpdated', label: 'Fecha de Ultima Modificación' , dateFormat:'dd/MM/yyyy HH:mm' },
	];
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
	comboEstatus: IdLabel[] = [{ id: '1', label: 'Activo' }, { id: '2', label: 'Inactivo' }];

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

	constructor(
		public globalService: GlobalService,
		private formBuilder: FormBuilder,
		public eventService: EventService,
		private datePipe: DatePipe,
		private toastr: ToastrManager,
		public incidentService : IncidentService,
		private administratorComplianceService: AdministratorComplianceService,
		private tagService: TagService,
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
			fTipoCumplimiento: [{ value: '', disabled: false }, Validators.required],
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
			estatus: [null],
			userUpdated: [null],
			minDate__dateUpdated: [null],
			maxDate__dateUpdated: [null],
		});

		this.formFiltersType = this.formBuilder.group({
			typeFilter:[2,Validators.required]
		});

		this.formTrack = this.formBuilder.group({
			id:[null],
			observation:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(1000)]]
		});
/* 		this.formMatrizCumplimiento = this.formBuilder.group({
			fMatrizCumplimiento: [null, Validators.required],
		}); */

		this.filtrosForm.controls.fAnio.setValue(moment(new Date()));
		this.currentYear = (new Date()).getFullYear();
		this.selectYear = this.currentYear;
		this.obtenerListaPorAnio(this.currentYear);

		this.initAutoComplete();

		this.tiposCumplimientos = [];
		this.actividades = [];
//		this.anios = [];
		this.initCombos();
		this.isTrack = false;
		this.trackId = new Date ( ).getTime ( );
		this.getObservations ( null );
		this.showTrack = false;

	}

	obtenerListaPorAnio(anio:number) {
		this.addBlock(1, 'Cargando...');
		this.data = [];

		this.tagService.obtenTagPorFiltros(anio)

			.subscribe((data: MatrizCumplimientoDTO) => {

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

	eventChangeAnio(d: Moment) {
		this.selectYear = d.year ();
	}

	onTableRowSee(element) {
		const type = {
			dto: element,
			action: "ver",
			name: "",
		};
		this.eventService.sendChangePage(new EventMessage(null, type, "Compliance.ApprovalComplianceVComponent"));
	}

	aprobarMatrizCumplimiento() {
		this.addBlock(1, null);
		if (this.filtrosForm.controls.fAnio.value != null) {
			let year = moment ( this.filtrosForm.controls.fAnio.value ).year( );
			this.administratorComplianceService.apruebaMatrizCumplimiento(year).subscribe(
				response => {
					this.toastr.successToastr('Se aprobo correctamente la matriz de cumplimiento', '¡Se ha logrado!');
					this.obtenerListaPorAnio(year);
					this.approved = "Aprobado"
				},
				error => {
					this.toastr.errorToastr('Error en la aprovación de la matriz.', 'Lo siento,');

			});
		} else {
			this.toastr.warningToastr('Selecciona un año.' );
		}
		this.addBlock(2, null);
	}
	rechazarMatrizCumplimiento() {
        this.addBlock(1, 'Cargando...');
		if (this.filtrosForm.controls.fAnio.value != null) {
			let year = moment ( this.filtrosForm.controls.fAnio.value ).year( );
			this.administratorComplianceService.liberaMatrizCumplimiento(year).subscribe(
				(responseLiberacion: GenerigResponseDTO) => {
					this.toastr.successToastr(responseLiberacion.mensaje, '¡Se ha logrado!');
					this.obtenerListaPorAnio(year);
					this.isTrack = true;
					this.approved = "Rechazado"
				},
				error => {
					this.toastr.errorToastr('Error en el rechazo de la matriz.', 'Lo siento,');
			});
		}
		this.addBlock(2, null);
	}

    generarTareas() {
    	this.addBlock(1, null);
        if (this.filtrosForm.controls.fTipoCumplimiento.value.length > 0 && this.filtrosForm.controls.fActividad.value.length > 0) {
			let year = moment ( this.filtrosForm.controls.fAnio.value ).year( );
            this.administratorComplianceService.getTasks(
                year,
                this.filtrosForm.controls.fTipoCumplimiento.value,
                this.filtrosForm.controls.fActividad.value).subscribe(
                (data: MatrizCumplimientoDTO) => {
                    this.setTableData(data.matriz);
                    this.administradores =  new MatTableDataSource<any>(data.cumplimientoIntegrantes);
					this.isTrack = true;
					this.toastr.infoToastr('Generación de tareas exitoso.', 'Lo siento,');
				},
				error => {
					this.toastr.errorToastr('Error en la generación de tareas.', 'Lo siento,');
				}
            );
        }
		this.addBlock(2, null);
    }

	SeguimientoAprovaciones() {
		this.showTrack = true;
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

	initCombos() {
		this.administratorComplianceService.initComboTiposCumplimientos().subscribe(
			(respuesta: Array<any>) => {
				this.tiposCumplimientos = [];
				respuesta.forEach(elementActual => {
					const value = elementActual.maestroOpcionId;
					const label = elementActual.opcion.codigo;
					this.tiposCumplimientos.push(new Combo(value, label));
				}
				);
			}
		);

		this.administratorComplianceService.initComboActividades().subscribe(
			(respuesta: Array<any>) => {
				this.actividades = [];
				respuesta.forEach(elementActual => {
					const value = elementActual.idActivity;
					const label = elementActual.name;
					this.actividades.push(new Combo(value, label));
				}
				);
			}
		);
//		const currentYear = (new Date()).getFullYear();
//		const nextYear = currentYear + 1;
//		this.anios.push(new Combo(currentYear.toString(), currentYear.toString()));
//		this.anios.push(new Combo(nextYear.toString(), nextYear.toString()));
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
      	const typeSearch = this.formFiltersType.value.typeFilter.toString() === '1' ? 'AND' : 'OR'; // 1. OR \ 2. AND for search conditions

		if ( !Util.isEmptyFilters2 ( this.formFiltersTable.value, typeSearch ) ) {
			this.obtenerListaParam();
		} else {
			this.toastr.warningToastr(typeSearch === 'AND' ? "Tienes que capturar todos los datos de búsqueda." : 'Tienes que capturar al menos un dato de búsqueda.' );
		}

	}

	limpiarFiltros() {
		this.formFiltersTable.reset();
		this.obtenerListaParam();
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
		let minDate = this.formFiltersTable.controls['minDate__dateUpdated'].value == null
			? ""
			: moment ( this.formFiltersTable.controls['minDate__dateUpdated'].value ).format ( 'YYYY/MM/DD' );
		let maxDate = this.formFiltersTable.controls['maxDate__dateUpdated'].value == null
			? ""
			: moment ( this.formFiltersTable.controls['maxDate__dateUpdated'].value ).format ( 'YYYY/MM/DD' );
			
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
			.set ( "active", this.formFiltersTable.controls['estatus'].value == null ? "" : this.formFiltersTable.controls['estatus'].value)
			.set ( "userUpdated", this.formFiltersTable.controls['userUpdated'].value == null ? "" : this.formFiltersTable.controls['userUpdated'].value)
			.set ( "minDateUpdated", minDate )
			.set ( "maxDateUpdated", maxDate )
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

	onChangeDateIniFechaFin ( $event ) : void {
		this.initDate = new Date($event);
	}

	addObservation ( ) : void {
		this.addBlock(1,null);
		let incidentObservationInDTO = [this.formTrack.value].map(e=>{
			return {
					id               : e.id
				,incidentId       : this.trackId
				,observation      : e.observation
				,dateobservation  : this.datePipe.transform(new Date(), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS')
				,save             : e.id == null
				,active           : true
			};
		})[0];
		this.incidentService.saveObservation(incidentObservationInDTO).subscribe((data:ResponseVO)=>{
			if(data.success){
				this.getObservations ( this.trackId );
				this.isTrack = false;
			}
		}
		,err=>{
			this.toastr.errorToastr('Ocurrió un error al intentar registrar la observación', 'Lo siento,');
			console.log(err);
			
		}
		,()=>{
			this.addBlock(2,null);
		}
		);
		this.formTrack.reset();
	}

	getObservations ( trackId : number ) : void {
		if(trackId != null){
			this.incidentService.getListObservations(trackId).subscribe(
				(data:IncidentObservationOutDTO[])=>{
					this.tracks=data.map((e,index)=>{
						e.order = index+1;
						return e;
					});
				},
				err=>{
					console.log(err);
				}
				,()=>{
					this.isTrack = false;
				}
			);
		}
	}
}
