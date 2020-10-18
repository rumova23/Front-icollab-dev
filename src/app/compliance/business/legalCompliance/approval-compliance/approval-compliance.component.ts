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

@Component({
	selector: "app-approval-compliance",
	templateUrl: "./approval-compliance.component.html",
	styles: [],
})
export class ApprovalComplianceComponent implements OnInit {

	administradores;
	isSupervisor = false;

	tableData;
	tableDataFiltered;
	plural = "";
	tiposCumplimientos: Array<any>;
	actividades: Array<any>;
	anios: Array<any>;
	tablaColumnsLabels: ColumnLabel[] = [
		{ key: "order", label: "#" },
		{ key: "tag", label: "Tag" },
		{ key: "cumplimiento", label: "Nombre del Cumplimiento" },
		{ key: "tGeneradas", label: "Tareas Generadas" },
		{ key: "categoria", label: "Categoría" },
		{ key: "tCumplimiento", label: "Tipo de Cumplimiento" },
		{ key: "pEntrega", label: "Periodo de Entrega" },
		{ key: "autoridad", label: "Autoridad" },
		{ key: "tAplicacion", label: "Tipo de Aplicación" },
		{ key: "grupo", label: "Grupo" },
		{ key: "uModificacion", label: "Usuario Última Modificación" },
		{ key: "fModificacion", label: "Fecha y Hora Última Modificacion", dateFormat: "dd/MM/yyyy HH:mm" },
		{ key: "estatus", label: "estatus" },
	];
	tableColumnsDisplay: string[] = [
		"order",
		"tag",
		"cumplimiento",
		"tGeneradas",
		"categoria",
		"tCumplimiento",
		"pEntrega",
		"autoridad",
		"tAplicacion",
		"grupo",
		"uModificacion",
		"fModificacion",
		"estatus",
		"sys_see",
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
		private tagService: TagService) { }

	ngOnInit() {

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

		this.formMatrizCumplimiento = this.formBuilder.group({
			fMatrizCumplimiento: [null, Validators.required],
		});

		const currentYear = (new Date()).getFullYear();
		this.filtrosForm.controls.fAnio.setValue(currentYear);

		this.initAutoComplete();

		this.tiposCumplimientos = [];
		this.actividades = [];
		this.anios = [];
//		this.initCombos();

	}

	initAutoComplete() {
/* 		this.filteredAutoTag = this.tableData.map((d) => d.tag).filter((el, index, arr) => arr.indexOf(el) === index);
		this.filteredAutoName = this.tableData.map((d) => d.cumplimiento).filter((el, index, arr) => arr.indexOf(el) === index);
		this.filteredUserUpdated = this.tableData.map((d) => d.uModificacion).filter((el, index, arr) => arr.indexOf(el) === index);
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
 */	}

	onFiltersTable() {
		let v = this.formFiltersTable.value;
		console.log(v);
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
					'nombre': e.classificationActivity,
					'clasificacion': e.activity ? e.activity.name : '',
					'cumplimiento_legal': e.typeCompliance.code,
					'periodo_entrega': this.formatPeriodo_entrega(e.period, (e.unitPeriod && e.unitPeriod.code) ? e.unitPeriod.code : ''),
					'countTasks': e.countCompliance,
					'autoridad': (e.authority && e.authority.code) ? e.authority.code : '',
					'tipo_aplicacion': e.applicationType.code,
					'grupo': e.group ? e.group.code : '',
					'userUpdated': (e.userUpdated) ? e.userUpdated : e.userCreated,
					'dateUpdated': dateUpdated,
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


}
