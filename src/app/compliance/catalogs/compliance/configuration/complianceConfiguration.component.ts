import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, Sort } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrManager } from 'ng6-toastr-notifications';
import { GlobalService } from 'src/app/core/globals/global.service';
import { TagService } from 'src/app/compliance/services/tag.service';
import { SecurityService } from 'src/app/core/services/security.service';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation-dialog.service';
import { CatalogType } from 'src/app/compliance/models/CatalogType';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { EventService } from 'src/app/core/services/event.service';
import { EventBlocked } from 'src/app/core/models/EventBlocked';
import { DatePipe } from '@angular/common';
import { Combo } from '../../../models/Combo';
import { AdministratorComplianceService } from '../../../administration/services/administrator-compliance.service';
import { MatrizCumplimientoDTO } from '../../../models/matriz-cumplimiento-dto';
import { TagOutDTO } from '../../../models/tag-out-dto';
import { MaestroOpcionDTO } from '../../../models/maestro-opcion-dto';
import { EntidadEstatusDTO } from '../../../models/entidad-estatus-dto';
import * as moment from 'moment';
import { IdLabel } from 'src/app/core/models/IdLabel';
import { ColumnLabel } from '../../../../core/models/ColumnLabel';
import { OrderCatalogDTO } from 'src/app/compliance/models/OrderCatalogDTO';
import * as Util from 'src/app/core/helpers/util.general';
import { HttpParams } from '@angular/common/http';

@Component({
	selector: 'app-complianceConfiguration',
	templateUrl: './complianceConfiguration.component.html',
	styleUrls: ['./complianceConfiguration.component.scss']
	, providers: [DatePipe]
})
export class ComplianceConfigurationComponent implements OnInit {
	nombreCatalogo = 'Configuración de Cumplimiento';
	titulo = 'Configuración de Cumplimiento';
	data: any[] = [];
	userResult;
	tiposCumplimientos: Array<any>;
	actividades: Array<any>;
	isSupervisor = false;
	isFree = false;
	idMatrizFree: number;
	statusMatriz: string;
	menu: any[];
	showAdd = false;
	showView = false;
	showUpdate = false;
	showDelete = false;
	plural = "";
	initDate;
	/* action: string = "Consultar"; */

	columnasResponsabilidad: string[] = ['order', 'admin', 'responsabilidad'];

	filtrobtn = { label: 'buscar' };
	registros_x_pagina = [100, 200, 300];

	serviceSubscription: any;

	tableData;
	tableDataFiltered;
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
	//tableRowXPage = [100, 500, 1000, 1500, 2000];
	tableRowXPage = [5, 10, 50, 100];
	formFiltersTable: FormGroup;
	formFiltersType : FormGroup;
	optionsFiltersType: IdLabel[] = [{ id: 1, label: 'Todos', disabled: false }, { id: 2, label: 'Al menos uno', disabled: true }];
	optionsPeriod: IdLabel[] = [];
	comboAutoridad: IdLabel[] = [];
	comboTipoAplicacion: IdLabel[] = [];
	comboGrupo: IdLabel[] = [];
	comboEstatus: IdLabel[] = [{ id: '1', label: 'Activo' }, { id: '2', label: 'Inactivo' }];
	comboUnitPeriod: any[] = [];
	filteredAutoTag: string[];
	filteredAutoName: string[];
	filteredUserUpdated: string[];

	optionsClasificacion: IdLabel[];

	constructor(
		private tagService: TagService,
		private formBuilder: FormBuilder,
		public toastr: ToastrManager,
		private route: ActivatedRoute,
		private router: Router,
		private confirmationDialogService: ConfirmationDialogService,
		public globalService: GlobalService,
		private eventService: EventService,
		private datePipe: DatePipe,
		private administratorComplianceService: AdministratorComplianceService,
		public securityService: SecurityService) {
		this.menu = securityService.getMenu('Compliance');
	}

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	ngOnInit() {
		this.tagService.getEntidadEstatus('TX_MATRIZ_CUMPLIMIENTO', 'Aprobada').subscribe((data: EntidadEstatusDTO) => {
			this.idMatrizFree = data.entidadEstatusId;
		});
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
			maxDate__dateUpdated: [null]
		});
		this.formFiltersType = this.formBuilder.group({
			typeFilter:[2,Validators.required]
		});

		this.obtenerListaTags();

		this.initAutoComplete();

		this.tiposCumplimientos = [];
		this.actividades = [];

		this.initCombos();
	}

	sortData(sort: Sort) { }

	obtenerListaTags() {
		

		this.data = [];
		const params : HttpParams = this.assamblerRequest ();
		this.tagService.obtenTagFiltros(params).subscribe((data: MatrizCumplimientoDTO) => {

			this.setTableData(data.matriz);

			

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
				
				this.toastr.errorToastr('Error al cargar lista de tags.', 'Lo siento,');

			}
		);
	}

	public eliminarTag(tag: any) {
		this.confirmationDialogService.confirm('Por favor, confirme..',
			'Está seguro de eliminar el Cumplimiento? ' + tag.tag)
			.then((confirmed) => {
				if (confirmed) {
					this.eliminarTagConfirm(tag);
				}
			})
			.catch(() => console.log('Cancelo'));
	}

	eliminarTagConfirm(tag: any) {
		this.tagService.eliminarTag(tag.idTag).subscribe(
			respuesta => {
				// 
				let res: any;
				res = respuesta;
				if (res.clave === 0) {
					this.obtenerListaTags();
					this.toastr.successToastr(res.mensaje, '¡Se ha logrado!');
				} else {
					this.toastr.errorToastr(res.mensaje, 'Lo siento,');
				}
			},
			error => {
				// 
				this.toastr.errorToastr('Error al eliminar el tag.', 'Lo siento,');
			}
		);

	}

	action(option: number, id: any) {
		let type: CatalogType = {};
		switch (option) {
			case 1:
				type = {
					id, action: 'nuevo',
					name: null
				};
				break;
			case 2:
				type = {
					id, action: 'ver',
					name: null
				};
				break;
			case 3:
				type = {
					id, action: 'edit',
					name: null
				};
				break;
		}
		this.eventService.sendChangePage(new EventMessage(9, type, 'Compliance.Características.ABC'));
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
		const currentYear = (new Date()).getFullYear();
		const nextYear = currentYear + 1;
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
			this.obtenerListaTags();
		} else {
			this.toastr.warningToastr('Tienes que capturar al menos un dato de búsqueda.' );
		}

	}

	limpiarFiltros() {
		this.formFiltersTable.reset();
		this.obtenerListaTags();
	}
	
	isnumeric(v) {
		if (isNaN(Number(v)) || 0 === Number(v)) {
			// para no permitir letras, que en firefox si permite insertarlas
			v = null;
			this.formFiltersTable.controls.periodo_entrega_cantidad.setValue(null);
		}
		if (Number(v) > 1) {
			this.optionsPeriod = this.comboUnitPeriod.map(e => { return { id: e.id, label: e.plural } });
		} else if (Number(v) <= 1) {
			this.optionsPeriod = this.comboUnitPeriod.map(e => { return { id: e.id, label: e.singular } });
		}
		/* this.onchangePeriod(); */
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
			},
			error => {
//				
				this.toastr.errorToastr('Error al cargar lista de tags.', 'Lo siento,');
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
			},
			error => {
//				
				this.toastr.errorToastr('Error al cargar lista de nombres de cumplimiento.', 'Lo siento,');
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
			},
			error => {
//				
				this.toastr.errorToastr('Error al cargar lista de usuarios.', 'Lo siento,');
			});

		} else {
			this.filteredUserUpdated = [];
		}
	}

	onChangeDateIniFechaFin ( $event ) : void {
		this.initDate = new Date($event);
	}
}
