import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import moment from 'moment';
import { IdLabel } from 'src/app/core/models/IdLabel';
import { requiredFileType } from 'src/app/core/helpers/requiredFileType';

@Component({
	selector: 'app-mining-if-c-fuel',
	templateUrl: './mining-if-c-fuel.component.html',
	styleUrls: ['./mining-if-c-fuel.component.scss']
})
export class MiningIFCFuelComponent implements OnInit {
	formQuery:FormGroup;
	formEditTableA:FormGroup;
	formEditTableB:FormGroup;
	formEditTableC:FormGroup;
	formTags: FormGroup;
	fileUploadForm: FormGroup;
	tableAData = [
		{ order: 1, dateOp: 'mar-20', concept:'Día Natural', m3:'78,675,060.00', gjoule:'78,675,060.00',ctounit:'78,675,060.00'},
	];
	tableAColumnsLabels = [
		{ key: 'order', label: '#' },
		{ key: 'dateOp', label: 'Fecha de Operación Comercial' },
		{ key: 'concept', label: 'Concepto' },
		{ key: 'm3', label: 'M3' },
		{ key: 'gjoule', label: 'Gjoule' },
		{ key: 'ctounit', label: 'CTO.UNIT $/Gjoule' },
	];
	tableAColumnsDisplay: string[] = [
		'dateOp',
		'concept',
		'm3',
		'gjoule',
		'ctounit',
		'sys_edit'
	];
	tableRowXpage = [5, 10, 20, 50, 100, 250, 500];
	tableBData = [
		{ order: 1, dateOp: 'mar-20', concept:'Día Natural', gjoule:'78,675,060.00',dls:'',dlsgjoule:'',mn:''},
	];
	tableBColumnsLabels = [
		{ key: 'order', label: '#' },
		{ key: 'dateOp', label: 'Fecha de Operación Comercial' },
		{ key: 'concept', label: 'Concepto' },
		{ key: 'gjoule', label: 'Gjoule' },
		{ key: 'dls', label: 'USD' },
		{ key: 'dlsgjoule', label: 'USD/Gjoule' },
		{ key: 'mn', label: '$ MXN' },
	];
	tableBColumnsDisplay: string[] = [
		'dateOp',
		'concept',
		'gjoule',
		'dls',
		'dlsgjoule',
		'mn',
		'sys_edit'
	];
	tableCData = [
		{ order: 1, dateOp: 'mar-20', settings:'',month:'',invoiced:'',tight:'',mn:''},
	];
	tableCColumnsLabels = [
		{ key: 'order', label: '#' },
		{ key: 'dateOp', label: 'Fecha de Operación Comercial' },
		{ key: 'settings', label: 'Ajustes' },
		{ key: 'month', label: 'Mes' },
		{ key: 'invoiced', label: 'Facturado' },
		{ key: 'tight', label: 'Ajustado' },
		{ key: 'mn', label: '$ MXN' },
	];
	tableCColumnsDisplay: string[] = [
		'dateOp',
		'settings',
		'month',
		'invoiced',
		'tight',
		'mn',
		'sys_edit',
		'sys_delete'
	];
	tableDData = [
		{order:1,fechaOp:'mar-20',fuenteImport:'2da Corrida MM',usuario:'Manuel Herrera',fechaMod:'01/04/2020 01:40:00 pm',estatus:'exitosa'},
		{order:2,fechaOp:'mar-20',fuenteImport:'2da Corrida MM',usuario:'Sistema'       ,fechaMod:'01/04/2020 12:40:00 pm',estatus:'exitosa'},
		{order:3,fechaOp:'mar-20',fuenteImport:'1ra Corrida MM',usuario:'Ivette Colin'  ,fechaMod:'01/04/2020 12:40:00 pm',estatus:'exitosa'},
		{order:4,fechaOp:'mar-20',fuenteImport:'1ra Corrida MM',usuario:'Sistema'       ,fechaMod:'01/04/2020 11:40:00 pm',estatus:'exitosa'},
		{order:5,fechaOp:'mar-20',fuenteImport:'1ra Corrida MM',usuario:'Sistema'       ,fechaMod:'01/04/2020 11:40:00 pm',estatus:'exitosa'}
	];
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
		{ id: "1", label: 'Gas' },
		{ id: "2", label: 'Diesel' }
	];
	
	selectOptionsTags : IdLabel[] = [
		{id:"1",label:'Tag 1'},
		{id:"2",label:'Tag 2'},
	];

	valid = false;
	file: any;
	fileName: any;
	progress;
	
	constructor(
		private formBuilder: FormBuilder,
	) { }

	ngOnInit() {
		this.initForms();
	}
	initForms(){
		this.formQuery = this.formBuilder.group({
			date: new FormControl(moment(), Validators.required),
			source: new FormControl('', Validators.required),
		});
		this.formEditTableA = this.formBuilder.group({
			concept: new FormControl('', Validators.required),
			m3: new FormControl('', Validators.required),
			gjoule: new FormControl('', Validators.required),
			ctounit: new FormControl('', Validators.required),
		});
		this.formEditTableB = this.formBuilder.group({
			concept: new FormControl('', Validators.required),
			gjoule: new FormControl('', Validators.required),
			dls: new FormControl('', Validators.required),
			dlsgjoule: new FormControl('', Validators.required),
			mn: new FormControl('', Validators.required),
		});
		this.formEditTableC = this.formBuilder.group({
			settings: new FormControl('', Validators.required),
			month: new FormControl('', Validators.required),
			invoiced: new FormControl('', Validators.required),
			tight: new FormControl('', Validators.required),
			mn: new FormControl('', Validators.required),
		});

		this.formTags = this.formBuilder.group({
			tags: new FormControl('', Validators.required),
		});	
		
		this.fileUploadForm = this.formBuilder.group({
			file: new FormControl(null, [Validators.required, requiredFileType('xlsx')]),
		});
	}
	onFormQuery(o){
		console.log(o);
	}
	onChangeDatePicker(o){
		console.log(o);
	}
	onChangeSelectFuente(o){
		console.log(o);
	}
	onTableARowEdite(o){
		console.log(o);
	}
	onTableBRowEdite(o){
		console.log(o);
	}
	onTableCRowEdite(o){
		console.log(o);
	}
	onTableCRowDelete(o){
		console.log(o);
	}
	onTableDRowDelete(o){
		console.log(o);
	}
	onFormEditTableA(o){
		console.log(o);
	}
	onFormEditTableB(o){
		console.log(o);
	}
	onFormEditTableC(o){
		console.log(o);
	}
	onBtnCancelEditTableA(){
		console.log("onBtnCancelEditTableA");
	}
	onBtnCancelEditTableB(){
		console.log("onBtnCancelEditTableB");
	}
	onBtnCancelEditTableC(){
		console.log("onBtnCancelEditTableC");
	}
	onChangeSelectTags(o){
		console.log(o);
	}
	onBtnChart(){
		console.log("onBtnChart");
	}
	downloadFile(){
		console.log("downloadFile");
	}
	onBtnUploadFile(){
		console.log("onBtnUploadFile");
	}
	onBtnFinish(){
		console.log("onBtnFinish");
	}
	onBtnTableAdd(){
		console.log("onBtnTableAdd");
		
	}
}
