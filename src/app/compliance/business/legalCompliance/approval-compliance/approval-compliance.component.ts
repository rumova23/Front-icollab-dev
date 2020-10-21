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
import { Combo } from 'src/app/compliance/models/Combo';
import { HttpParams } from '@angular/common/http';
import * as Util from 'src/app/core/helpers/util.general';
import { SecurityService } from 'src/app/core/services/security.service';

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
	anios: Array<any>;
	data: any[] = [];
	formFiltersTypeTable : FormGroup;
	menu: any[];
	showAdd = false;
	showView = false;
	showUpdate = false;
	showDelete = false;

	tablaColumnsLabels: ColumnLabel[] = [
		{ key: "order", label: "#" },
		{ key: "tag", label: "Tag" },
		{ key: "classificationActivity", label: "Nombre del Cumplimiento" },
		{ key: "countCompliance", label: "Tareas Generadas" },
		{ key: "activity", label: "Categoría" },
		{ key: "typeCompliance", label: "Tipo de Cumplimiento" },
		{ key: "period_unit", label: "Periodo de Entrega" },
		{ key: "authority", label: "Autoridad" },
		{ key: "applicationType", label: "Tipo de Aplicación" },
		{ key: "group", label: "Grupo" },
		{ key: "userUpdated", label: "Usuario Última Modificación" },
		{ key: "dateUpdated", label: "Fecha y Hora Última Modificacion", dateFormat: "dd/MM/yyyy HH:mm" },
		{ key: "status", label: "Estatus" },
	];
	tableColumnsDisplay: string[] = [
		"order",
		"tag",
		"classificationActivity",
		"countCompliance",
		"activity",
		"typeCompliance",
		"period_unit",
		"authority",
		"applicationType",
		"group",
		"userUpdated",
		"dateUpdated",
		"status",
//	"sys_see",
	];

	tableRowXpage = [50, 100];

	filtrosForm: FormGroup;
	formFiltersTable: FormGroup;
	formFiltersType: FormGroup;
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
	comboEstatus: IdLabel[] = [{ id: 'Activo', label: 'Activo' }, { id: 'Inactivo', label: 'Inactivo' }];

	tableRowXPage = [100, 500, 1000, 1500, 2000];

	isSeguimientoAprovaciones = false;
	tableDataSeguimientoAprovaciones = [
		{
			order: '1'
			, Usuario: 'Usuario'
			, Observaciones: 'Observaciones'
			, Estatus: 'Estatus'
			, date: new Date()
		}
	];

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
	constructor(
		public globalService: GlobalService,
		private formBuilder: FormBuilder,
		public eventService: EventService,
		private datePipe: DatePipe,
		private toastr: ToastrManager,
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
		this.formFiltersType = this.formBuilder.group({
			typeFilter: [2, Validators.required],
		});

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

		this.formFiltersTypeTable = this.formBuilder.group({
			typeFilter:[2,Validators.required]
		});

		this.formMatrizCumplimiento = this.formBuilder.group({
			fMatrizCumplimiento: [null, Validators.required],
		});

		const currentYear = (new Date()).getFullYear();
		this.filtrosForm.controls.fAnio.setValue(currentYear);

		this.obtenerListaTags();

		this.tiposCumplimientos = [];
		this.actividades = [];
		this.anios = [];
		this.initCombos();

	}

	obtenerListaTags() {
		this.addBlock(1, 'Cargando...');
		this.data = [];
		const params : HttpParams = this.assamblerRequest ();
//		this.tagService.obtenTagFiltros(params).subscribe((data: MatrizCumplimientoDTO) => {
		this.tagService.obtenTagPorFiltros(2021).subscribe((data: MatrizCumplimientoDTO) => {
			/* this.statusMatriz = data.entidadEstatus.estatus.nombre;
			if (data.entidadEstatus.entidadEstatusId === this.idMatrizFree) {
				this.isFree = true;
			} */
			this.setTableData(data.matriz);

			this.initAutoComplete();

			/* this.administradores = new MatTableDataSource<any>(data.cumplimientoIntegrantes); */

			let dateUpdated = null;
			let autoridad = null;


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

	initAutoComplete() {
		this.filteredAutoTag = this.tableData.map((d) => d.tag).filter((el, index, arr) => arr.indexOf(el) === index);
		this.filteredAutoName = this.tableData.map((d) => d.classificationActivity).filter((el, index, arr) => arr.indexOf(el) === index);
		this.filteredUserUpdated = this.tableData.map((d) => d.userUpdated).filter((el, index, arr) => arr.indexOf(el) === index);
		let statusConsultActivity = "TODOS"; // 'TODOS' || 'ACTIVOS'
		this.tagService.getCatalogoActividades(statusConsultActivity).subscribe(
			(catalogoResult) => {
				this.optionsClasificacion = catalogoResult.map((e) => {
					return { id: e.name, label: e.name };
				});
			},
			(error) => {
				this.toastr.errorToastr("Error al cargar catálogo de Categoría.", "Lo siento,");
			}
		);

		this.tagService.comboUnitPeriod().subscribe((lista: Array<MaestroOpcionDTO>) => {
			console.dir(lista);
			this.comboUnitPeriod = lista.map((e) => {
				return { id: e.maestroOpcionId.toString(), singular: e.opcion.codigo, plural: e.opcion.codigo + "" + (e.opcion.codigo == "MES" ? "ES" : "S") };
			});
			this.optionsPeriod = this.comboUnitPeriod.map((e) => {
				return { id: e.id, label: e.singular };
			});
		});

		let listaCombos = Array<OrderCatalogDTO>();
		listaCombos.push(new OrderCatalogDTO("typeCompliance", 1, 1));
		listaCombos.push(new OrderCatalogDTO("authority", 1, 1));
		listaCombos.push(new OrderCatalogDTO("typeApplication", 1, 1));
		listaCombos.push(new OrderCatalogDTO("typeDay", 1, 1));
		listaCombos.push(new OrderCatalogDTO("group", 1, 1));
		this.tagService
			.getlistCatalogoOrdenados(listaCombos)
			.subscribe((catalogs: any) => {

				catalogs.forEach((element) => {
					if (element.catalog === "authority")
						this.comboAutoridad = element.data.map((e) => {
							return { id: e.code, label: e.code };
						});
					else if (element.catalog === "typeApplication")
						this.comboTipoAplicacion = element.data.map((e) => {
							return { id: e.code, label: e.code };
						});
					else if (element.catalog === "group")
						this.comboGrupo = element.data.map((e) => {
							return { id: e.code, label: e.code };
						});
				});
			})
			.add(() => {
				this.addBlock(2, null);
			});
	}

	onFiltersTable() {
      	const typeSearch = this.formFiltersTypeTable.value.typeFilter.toString() === '1' ? 'AND' : 'OR'; // 1. OR \ 2. AND for search conditions

		if ( !Util.isEmptyFilters ( this.formFiltersTable.value, typeSearch ) ) {
			this.obtenerListaTags();
		}

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

	onChangeDatePicker(d: Moment) {
		console.log(d);
		console.log(this.datePipe.transform(d, 'yyyy-MM-dd HH:mm:ss'));

	}
	onTableRowSee(element) {
		const type = {
			dto: element,
			action: "ver",
			name: "",
		};
		this.eventService.sendChangePage(new EventMessage(null, type, "Compliance.ApprovalComplianceVComponent"));
	}

	limpiarFiltros() {
		this.tableDataFiltered = this.tableData.concat([]);
		this.formFiltersTable.reset();
	}
	AprobarMatrizCumplimiento() {

	}
	RechazarMatrizCumplimiento() {

	}
	GenerarTareas() {

	}
	SeguimientoAprovaciones() {
		this.isSeguimientoAprovaciones = !this.isSeguimientoAprovaciones;
	}
	addBlock(type, msg): void {
		this.eventService.sendApp(new EventMessage(1, new EventBlocked(type, msg)));
	}

	aprobarMatriz() {
		/* this.administratorComplianceService.apruebaMatrizCumplimiento(this.filtrosForm.controls.fAnio.value).subscribe(
			response => {
				this.toastr.successToastr('Se aprobo correctamente la matriz de cumplimiento', '¡Se ha logrado!');
				this.obtenerListaTags(this.filtrosForm.controls.fAnio.value);
			}); */
	}

	setTableData(matriz: TagOutDTO[]) {

		this.tableData = matriz
			.sort((a, b) => moment((a.dateUpdated != null) ? a.dateUpdated : a.dateCreated).toDate().getTime() - moment((b.dateUpdated != null) ? b.dateUpdated : b.dateCreated).toDate().getTime())
			.map((e: TagOutDTO, index) => {
				let dateUpdated = ((e.dateUpdated != null) ? e.dateUpdated : e.dateCreated);
				return {
					'order': index + 1,
					'idTag': e.idTag,
					'tag': e.tag,
					'classificationActivity': e.classificationActivity,
					'activity': e.activity ? e.activity.name : '',
					'typeCompliance': e.typeCompliance.code,
					'period_unit': this.formatPeriodo_entrega(e.period, (e.unitPeriod && e.unitPeriod.code) ? e.unitPeriod.code : ''),
					'countCompliance': e.countCompliance,
					'authority': (e.authority && e.authority.code) ? e.authority.code : '',
					'applicationType': e.applicationType.code,
					'group': e.group ? e.group.code : '',
					'userUpdated': (e.userUpdated) ? e.userUpdated : e.userCreated,
					'dateUpdated': dateUpdated,
					'status': (e.active) ? 'Activo' : 'Inactivo'
				};
			});
		this.tableDataFiltered = [].concat(this.tableData);
	}

	formatPeriodo_entrega(period, code) {
		period > 1 ? this.plural = "S" : this.plural = "";
		if (code == "MES" && period > 1) this.plural = "ES"
		return period + ' ' + code + this.plural;
	}

	getTasks() {
		if (this.filtrosForm.controls.fTipoCumplimiento.value > 0 && this.filtrosForm.controls.fActividad.value > 0) {
			this.administratorComplianceService.getTasks(
				this.filtrosForm.controls.fAnio.value,
				this.filtrosForm.controls.fTipoCumplimiento.value,
				this.filtrosForm.controls.fActividad.value).subscribe(
					(data: MatrizCumplimientoDTO) => {
						this.setTableData(data.matriz);
						this.administradores = new MatTableDataSource<any>(data.cumplimientoIntegrantes);
						this.addBlock(2, null);
					}
				);
		}
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
		this.anios.push(new Combo(currentYear.toString(), currentYear.toString()));
		this.anios.push(new Combo(nextYear.toString(), nextYear.toString()));
	}

	assamblerRequest ( ) : HttpParams {
		return new HttpParams ( )
			.set ( "type", this.formFiltersTypeTable.value.typeFilter.toString() === '1' ? 'AND' : 'OR' )
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
			.set ( "minDateUpdated", this.formFiltersTable.controls['minDate__dateUpdated'].value == null ? "" : this.formFiltersTable.controls['minDate__dateUpdated'].value)
			.set ( "maxDateUpdated", this.formFiltersTable.controls['maxDate__dateUpdated'].value == null ? "" : this.formFiltersTable.controls['maxDate__dateUpdated'].value)
	}


}
