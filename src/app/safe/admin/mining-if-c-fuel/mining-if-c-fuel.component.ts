/* tslint:disable:indent */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import moment from 'moment';
import { IdLabel } from 'src/app/core/models/IdLabel';
import { requiredFileType } from 'src/app/core/helpers/requiredFileType';
import {FuelCostService} from '../../services/fuel-cost.service';
import {EconomicProposalDTO} from '../../models/economic-proposal-dto';
import {MasterFuelCostDTO} from '../../models/master-fuel-cost-dto';
import {EventMessage} from '../../../core/models/EventMessage';
import {EventBlocked} from '../../../core/models/EventBlocked';
import {ToastrManager} from 'ng6-toastr-notifications';
import {EventService} from '../../../core/services/event.service';
import {FuelCostDTO} from '../../models/fuel-cost-dto';
import {YearMountDTO} from '../../models/year-mount-dto';
import {MasterCatalogService} from '../../services/master-catalog.service';
import {MaestroOpcionDTO} from '../../../compliance/models/maestro-opcion-dto';

@Component({
	selector: 'app-mining-if-c-fuel',
	templateUrl: './mining-if-c-fuel.component.html',
	styleUrls: ['./mining-if-c-fuel.component.scss']
})
export class MiningIFCFuelComponent implements OnInit {
	formQuery: FormGroup;
	formEditTableA: FormGroup;
	formEditTableB: FormGroup;
	formEditTableC: FormGroup;
	formTags: FormGroup;
	fileUploadForm: FormGroup;
	comboFuente: IdLabel[] = [];
	m3: FuelCostDTO;
	/*
	tableAData = [
		{ order: 1, dateOp: 'mar-20', concept:'Día Natural', m3:'78,675,060.00', gjoule:'78,675,060.00',ctounit:'78,675,060.00',totalsiva:'78,675,060.00'},
	];*/
	tableAData = [];
	tableAColumnsLabels = [
		{ key: 'order', label: '#' },
		{ key: 'dateOp', label: 'Fecha de Operación Comercial' },
		{ key: 'concepto', label: 'Concepto' },
		{ key: 'm3', label: 'M3' },
		{ key: 'gjoule', label: 'Gjoule' },
		{ key: 'ctoUnit', label: 'CTO.UNIT $/Gjoule' },
		{ key: 'mxn', label: '$ MXN' }
	];
	tableAColumnsDisplay: string[] = [
		'dateOp',
		'concepto',
		'm3',
		'gjoule',
		'ctoUnit',
		'mxn',
		'sys_edit'
	];
	tableRowXpage = [5, 10, 20, 50, 100, 250, 500];
	/*
	tableBData = [
		{ order: 1, dateOp: 'mar-20', concept:'Día Natural', gjoule:'78,675,060.00',dls:'',dlsgjoule:'',mn:''},
	];*/
	tableBData = [];
	tableBColumnsLabels = [
		{ key: 'order', label: '#' },
		{ key: 'dateOp', label: 'Fecha de Operación Comercial' },
		{ key: 'concepto', label: 'Concepto' },
		{ key: 'gjoule', label: 'Gjoule' },
		{ key: 'usd', label: 'USD' },
		{ key: 'usdGjoule', label: 'USD/Gjoule' },
		{ key: 'mxn', label: '$ MXN' },
	];
	tableBColumnsDisplay: string[] = [
		'dateOp',
		'concepto',
		'gjoule',
		'usd',
		'usdGjoule',
		'mxn',
		'sys_edit'
	];
	/*
	tableCData = [
		{ order: 1, dateOp: 'mar-20', settings:'',month:'',invoiced:'',tight:'',mn:''},
	];*/
	tableCData: Array<FuelCostDTO> = [];
	tableCColumnsLabels = [
		{ key: 'order', label: '#' },
		{ key: 'dateOp', label: 'Fecha de Operación Comercial' },
		{ key: 'ajustes', label: 'Ajustes' },
		{ key: 'mes', label: 'Mes' },
		{ key: 'facturado', label: 'Facturado' },
		{ key: 'ajustado', label: 'Ajustado' },
		{ key: 'mxn', label: '$ MXN' },
	];
	tableCColumnsDisplay: string[] = [
		'dateOp',
		'ajustes',
		'mes',
		'facturado',
		'ajustado',
		'mxn',
		'sys_edit',
		'sys_delete'
	];
	/*
	tableDData = [
		{order:1,fechaOp:'mar-20',fuenteImport:'2da Corrida MM',usuario:'Manuel Herrera',fechaMod:'01/04/2020 01:40:00 pm',estatus:'exitosa'},
		{order:2,fechaOp:'mar-20',fuenteImport:'2da Corrida MM',usuario:'Sistema'       ,fechaMod:'01/04/2020 12:40:00 pm',estatus:'exitosa'},
		{order:3,fechaOp:'mar-20',fuenteImport:'1ra Corrida MM',usuario:'Ivette Colin'  ,fechaMod:'01/04/2020 12:40:00 pm',estatus:'exitosa'},
		{order:4,fechaOp:'mar-20',fuenteImport:'1ra Corrida MM',usuario:'Sistema'       ,fechaMod:'01/04/2020 11:40:00 pm',estatus:'exitosa'},
		{order:5,fechaOp:'mar-20',fuenteImport:'1ra Corrida MM',usuario:'Sistema'       ,fechaMod:'01/04/2020 11:40:00 pm',estatus:'exitosa'}
	];*/
	tableDData = [];

	tableDColumnsLabels = [
		{ key: 'order', label: '#' },
		{ key: 'fechaOp', label: 'Fecha de Operación Comercial' },
		{ key: 'fuenteImport', label: 'Fuente de Importación' },
		{ key: 'usuario', label: 'Usuario' },
		{ key: 'fechaMod', label: 'Fecha y Hora Ultima Modificación' },
		{ key: 'estatus', label: 'Estatus de la Importación' }
	];
	tableDColumnsDisplay: string[] = [
		'order',
		'fechaOp',
		'fuenteImport',
		'usuario',
		'fechaMod',
		'estatus',
		'sys_delete'
	];


	selectOptionsFuente: IdLabel[] = [
		{ id: '1', label: 'Gas' },
		{ id: '2', label: 'Diesel' }
	];
	selectOptionsTags: IdLabel[] = [
		{id: '1', label: 'Tag 1'},
		{id: '2', label: 'Tag 2'},
	];

	valid = false;
	file: any;
	fileName: any;
	progress;
	constructor(
		private formBuilder: FormBuilder,
		private fuelCostService: FuelCostService,
		public toastr: ToastrManager,
		public eventService: EventService,
		private masterCatalogService: MasterCatalogService
	) { }

	ngOnInit() {
		this.initForms();
		this.loadCatalog();
	}
	initForms() {
		this.formQuery = this.formBuilder.group({
			date: new FormControl(moment(), Validators.required),
			source: new FormControl('', Validators.required),
		});
		this.formEditTableA = this.formBuilder.group({
			concepto: new FormControl('', Validators.required),
			m3: new FormControl('', Validators.required),
			gjoule: new FormControl('', Validators.required),
			ctoUnit: new FormControl('', Validators.required),
			mxn: new FormControl('', Validators.required),
		});
		this.formEditTableB = this.formBuilder.group({
			concepto: new FormControl('', Validators.required),
			gjoule: new FormControl('', Validators.required),
			usd: new FormControl('', Validators.required),
			usdGjoule: new FormControl('', Validators.required),
			mxn: new FormControl('', Validators.required),
		});
		this.formEditTableC = this.formBuilder.group({
			ajustes: new FormControl('', Validators.required),
			mes: new FormControl('', Validators.required),
			facturado: new FormControl('', Validators.required),
			ajustado: new FormControl('', Validators.required),
			mxn: new FormControl('', Validators.required),
		});

		this.formTags = this.formBuilder.group({
			tags: new FormControl('', Validators.required),
		});

		this.fileUploadForm = this.formBuilder.group({
			file: new FormControl(null, [Validators.required, requiredFileType('xlsx')]),
		});
	}
	onFormQuery(o) {
		const mydate = this.formQuery.get('date').value;
		const month = mydate.month() + 1;
		const year = mydate.year();
		this.fuelCostService.findTradeDate(year, month).subscribe (
		(data: MasterFuelCostDTO) => {
			this.tableAData = [];
			this.tableAData.push(data.m3);

			this.tableBData = [];
			this.tableBData.push(data.usa);

			this.tableCData = [];
			this.tableCData = data.adjustments;

			this.addBlock(2, '');
		},
		errorData => {
			this.addBlock(2, '');
			this.toastr.errorToastr(errorData.error.message, 'Error!');
		});
	}
	onChangeDatePicker(o) {
		console.log(o);
	}
	onChangeSelectFuente(o) {
		console.log(o);
	}
	onTableARowEdite(o) {
		this.formEditTableA.patchValue(o);
	}
	onTableBRowEdite(o) {
		this.formEditTableB.patchValue(o);
	}
	onTableCRowEdite(o) {
		this.formEditTableC.patchValue(o);
	}
	onTableCRowDelete(o) {
		console.log(o);
	}
	onTableDRowDelete(o) {
		console.log(o);
	}
	onFormEditTableA(o: FuelCostDTO) {
		const mydate = this.formQuery.get('date').value;
		const masterFuelCostDTO: MasterFuelCostDTO = new MasterFuelCostDTO();
		masterFuelCostDTO.sourceId = this.formQuery.get('source').value;
		masterFuelCostDTO.group = 'M3';
		const yearMountDTO: YearMountDTO = new YearMountDTO();
		yearMountDTO.year = mydate.year();
		yearMountDTO.mount = mydate.month() + 1;
		masterFuelCostDTO.yearMountDTO = yearMountDTO;
		masterFuelCostDTO.m3 = o;
		this.fuelCostService.saveFuelCost(masterFuelCostDTO).subscribe (
		(data: MasterFuelCostDTO) => {
			this.toastr.successToastr('Guardado con exito', 'Exito!');
			this.addBlock(2, '');
		},
		errorData => {
			this.addBlock(2, '');
			this.toastr.errorToastr(errorData.error.message, 'Error!');
		},
		() => {
			this.onFormQuery(this.formQuery.value);
		});
	}

	onFormEditTableB(o) {
		const mydate = this.formQuery.get('date').value;
		const masterFuelCostDTO: MasterFuelCostDTO = new MasterFuelCostDTO();
		masterFuelCostDTO.sourceId = this.formQuery.get('source').value;
		masterFuelCostDTO.group = 'USD';
		const yearMountDTO: YearMountDTO = new YearMountDTO();
		yearMountDTO.year = mydate.year();
		yearMountDTO.mount = mydate.month() + 1;
		masterFuelCostDTO.yearMountDTO = yearMountDTO;
		masterFuelCostDTO.usa = o;
		this.fuelCostService.saveFuelCost(masterFuelCostDTO).subscribe (
		(data: MasterFuelCostDTO) => {
			this.toastr.successToastr('Guardado con exito', 'Exito!');
			this.addBlock(2, '');
		},
		errorData => {
			this.addBlock(2, '');
			this.toastr.errorToastr(errorData.error.message, 'Error!');
		},
		() => {
			this.onFormQuery(this.formQuery.value);
		});
	}
	onFormEditTableC(o) {
		const mydate = this.formQuery.get('date').value;
		const masterFuelCostDTO: MasterFuelCostDTO = new MasterFuelCostDTO();
		masterFuelCostDTO.sourceId = this.formQuery.get('source').value;
		masterFuelCostDTO.group = 'ADJUSTMENT';
		const yearMountDTO: YearMountDTO = new YearMountDTO();
		yearMountDTO.year = mydate.year();
		yearMountDTO.mount = mydate.month() + 1;
		masterFuelCostDTO.yearMountDTO = yearMountDTO;
		masterFuelCostDTO.adjustment = o;
		this.fuelCostService.saveFuelCost(masterFuelCostDTO).subscribe (
		(data: MasterFuelCostDTO) => {
			this.toastr.successToastr('Guardado con exito', 'Exito!');
			this.addBlock(2, '');
		},
		errorData => {
			this.addBlock(2, '');
			this.toastr.errorToastr(errorData.error.message, 'Error!');
		},
		() => {
			this.onFormQuery(this.formQuery.value);
		});
	}
	onBtnCancelEditTableA() {
		console.log('onBtnCancelEditTableA');
	}
	onBtnCancelEditTableB() {
		console.log('onBtnCancelEditTableB');
	}
	onBtnCancelEditTableC() {
		console.log('onBtnCancelEditTableC');
	}
	onChangeSelectTags(o) {
		console.log(o);
	}
	onBtnChart() {
		console.log('onBtnChart');
	}
	downloadFile() {
		console.log('downloadFile');
	}
	onBtnUploadFile() {
		console.log('onBtnUploadFile');
	}
	onBtnFinish() {
		console.log('onBtnFinish');
	}
	addBlock(type, msg): void {
		this.eventService.sendApp(new EventMessage(1,
			new EventBlocked(type, msg)));
	}

	loadCatalog() {
		const names = ['SOURCE FUEL COST'];
		this.masterCatalogService.listCatalog(names).subscribe(data  => {
			this.loadSelect(this.comboFuente, data['SOURCE FUEL COST']);
		}, error => {});
	}
	loadSelect(selectCombo: Array<any>, catalog: Array<MaestroOpcionDTO>) {
		if (catalog !== null) {
			catalog.forEach((element: MaestroOpcionDTO) => {
				selectCombo.push({id: element.maestroOpcionId, label: element.opcion.codigo, maestroOpcionId: element.maestroOpcionId});
			});
			selectCombo.sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()));
		}
	}
}
