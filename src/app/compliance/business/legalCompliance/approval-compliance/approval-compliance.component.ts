import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GlobalService } from "src/app/core/globals/global.service";
import { IdLabel } from "src/app/core/models/IdLabel";
import { ColumnLabel } from "src/app/core/models/ColumnLabel";
import { Tag } from "../../../models/Tag";
import { categoria } from "../../perfil/responsibilities/responsibilities.component";
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


@Component({
	selector: "app-approval-compliance",
	templateUrl: "./approval-compliance.component.html",
	styles: [],
})
export class ApprovalComplianceComponent implements OnInit {
	tableData = [
		{
			order: "1",
			tag: "Tag",
			cumplimiento: "cumplimiento",
			tGeneradas: "tGeneradas",
			categoria: "categoria",
			tCumplimiento: "tCumplimiento",
			pEntrega: "pEntrega",
			autoridad: "autoridad",
			tAplicacion: "tAplicacion",
			grupo: "grupo",
			uModificacion: "tester",
			fModificacion: new Date(),
			estatus: "estatus",
		},
	];
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

	formFiltersTable: FormGroup;
	formFiltersType: FormGroup;
	formDeliveryPeriod: FormGroup;
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
	comboEstatus: IdLabel[] = [{id:'Activo',label:'Activo'},{id:'Inactivo',label:'Inactivo'}];

	formDeliveryPeriodSubmited = false;

	isSeguimientoAprovaciones = false;
	tableDataSeguimientoAprovaciones = [
		{
			order:'1'
			,Usuario:'Usuario'
			,Observaciones:'Observaciones'
			,Estatus:'Estatus'
			,date:new Date()
		}
	];
	
	tableDataSeguimientoAprovacionesColumnsLabels: ColumnLabel[] = [
		{ key: "order", label: "#" },
		{ key: "date", label: "Fecha De Última Modificación" , dateFormat: "dd/MM/yyyy HH:mm" }
	]
	tableDataSeguimientoAprovacionesColumnsDisplay: string[] = [
		"order",
		"Usuario",
		"Observaciones",
		"Estatus",
		"date"
	];
	constructor(public globalService: GlobalService, private formBuilder: FormBuilder, public eventService: EventService
		,private datePipe     : DatePipe, private toastr: ToastrManager, private tagService: TagService) { }

	ngOnInit() {
		this.addBlock(1, null);
		timer(1000).subscribe(() => this.addBlock(2, null));
		this.formFiltersType = this.formBuilder.group({
			typeFilter: [2, Validators.required],
		});

		this.formFiltersTable = this.formBuilder.group({
			tag: [null],
			nombre: [null],
			clasificacion: [null],
			periodo_entrega: [null],
			autoridad: [null],
			tipo_aplicacion: [null],
			grupo: [null],
			estatus: [null],
			userUpdated: [null],
			minDate__dateUpdated: [null],
			maxDate__dateUpdated: [null],
		});

		this.formDeliveryPeriod = this.formBuilder.group({
			n: [null, Validators.required],
			t: [null, Validators.required],
		});
		this.formMatrizCumplimiento = this.formBuilder.group({
			fMatrizCumplimiento: [null, Validators.required],
		});
		this.initAutoComplete();
	}

	initAutoComplete() {
		this.filteredAutoTag = this.tableData.map((d) => d.tag).filter((el, index, arr) => arr.indexOf(el) === index);
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
				/*this.resuelveDS(catalogs, this.comboAutoridad, 'authority');
					this.resuelveDS(poRespuesta, this.comboTipoCumplimiento, 'typeCompliance');
					this.resuelveDS(poRespuesta, this.comboTipoAplicacion, 'typeApplication');
					this.resuelveDS(poRespuesta, this.comboTipoDias, 'typeDay');
					this.resuelveDS(poRespuesta, this.comboGrupo, 'group');//*/
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
		let v = this.formFiltersTable.value;
		console.log(v);
	}

	isnumeric(v) {
		if (isNaN(Number(v)) || 0 === Number(v)) {
			// para no permitir letras, que en firefox si permite insertarlas
			v = null;
			this.formDeliveryPeriod.controls.n.setValue(null);
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
		this.onchangePeriod();
	}

	onchangePeriod() {
		this.formDeliveryPeriodSubmited = true;
		let t = this.formDeliveryPeriod.value.t !== null ? " " + this.optionsPeriod.filter((e) => e.id == this.formDeliveryPeriod.value.t)[0].label : "";
		let n = this.formDeliveryPeriod.value.n !== null ? this.formDeliveryPeriod.value.n : "";
		let s = n + t;

		if (this.formDeliveryPeriod.value.n == null && this.formDeliveryPeriod.value.t == null) {
			s = null;
			this.formDeliveryPeriodSubmited = false;
			this.formDeliveryPeriod.reset();
		}
		this.formFiltersTable.controls.periodo_entrega.setValue(s);
	}
	onBlurPeriod() {
		if (this.formDeliveryPeriod.value.n == null && this.formDeliveryPeriod.value.t == null) {
			this.formDeliveryPeriod.reset();
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
		this.formFiltersTable.reset();
		this.formDeliveryPeriod.reset();
		this.formDeliveryPeriodSubmited = false;
	}
	AprobarMatrizCumplimiento(){

	}
	RechazarMatrizCumplimiento(){

	}
	GenerarTareas(){

	}
	SeguimientoAprovaciones(){
		this.isSeguimientoAprovaciones=!this.isSeguimientoAprovaciones;
	}
	addBlock(type, msg): void {
		this.eventService.sendApp(new EventMessage(1, new EventBlocked(type, msg)));
	}
}
