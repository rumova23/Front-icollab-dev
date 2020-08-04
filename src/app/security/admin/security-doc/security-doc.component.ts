import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Moment } from 'moment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IdLabel } from 'src/app/core/models/IdLabel';
import * as moment from 'moment';
import { SelectionModel } from '@angular/cdk/collections';
import { timer } from 'rxjs';
import { code } from './code';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-security-doc',
	templateUrl: './security-doc.component.html',
	styleUrls: ['./security-doc.component.scss']
})
export class SecurityDocComponent implements OnInit {
	codes = code;
	listOptionsAutocomplete = ['One', 'Two', 'Three','Three','Threes','María'];
	form : FormGroup;
	tableDataDemo = [];
	tablaColumnsLabels=[
		{ key: 'order'        , label: '#' },
		{ key: 'date'         , label: 'Fecha' , dateFormat:'dd/MM/yyyy HH:mm:ss'}
	];
	tableColumnsDisplay: string[] = [
		'sys_checkbox',
		'order',
		//'id',
		'date',
		'name',
		'weight',
		'symbol',
		'sys_see',
		'sys_edit',
		'sys_delete'
	];
	tableRow_x_page = [10,15,20];

	selectOptionsFuente : IdLabel[] = [
		{id:"1",label:'FileZilla FTP'},
		{id:"2",label:'PAYSERVER DB'},
		{id:"3",label:'PI SERVER DB'},
		{id:"4",label:'Manual'}
	];
	selectOptionsFuenteMultiselect : IdLabel[] = [
		{id:"1",label:'FileZilla FTP'},
		{id:"2",label:'PAYSERVER DB',disabled:false},
		{id:"3",label:'PI SERVER DB',disabled:true},
		{id:"4",label:'Manual'}
	];
	selection : SelectionModel<any> = new SelectionModel<any>(true, []);
	inputNumberMin = 0;
	inputNumberMax = 100000;
	constructor(
		public toastr: ToastrManager,
		private formBuilder: FormBuilder,
		private datePipe: DatePipe
	) { }

	ngOnInit() {
		this.setTableData();
		this.selection.changed.subscribe(event=> {
			let algo = this.selection.selected;
		});
		this.form = this.formBuilder.group({
			name: [{ value: '', disabled: false }, Validators.required],
			aotucomplete: [{ value: '', disabled: false }, Validators.required],
			dateYearAndMonth:[{ value: null, disabled: false }],
			datePicker:[{ value: null, disabled: false }],
			inputNumber:[{ value: null, disabled: false },[Validators.required,Validators.min(this.inputNumberMin),Validators.max(this.inputNumberMax)]],
			select: [{ value: '', disabled: false }, Validators.required]
		});
	}
	setTableData(){
		timer(2000).subscribe(()=>{
			this.tableDataDemo = [
				{order: 1, id:1,   name: 'Hydrogen'   ,weight: 1.0079   ,symbol: 'H'   ,date:new Date('2020/01/01')},
				{order: 2, id:2,   name: 'Helium'     ,weight: 4.0026   ,symbol: 'He'  ,date:new Date('2020/01/02'),backgroundColor:'gold'},
				{order: 3, id:3,   name: 'Lithium'    ,weight: 6.941    ,symbol: 'Li'  ,date:new Date('2020/01/03')},
				{order: 4, id:4,   name: 'Beryllium'  ,weight: 9.0122   ,symbol: 'Be'  ,date:new Date('2020/01/04')},
				{order: 5, id:5,   name: 'Boron'      ,weight: 10.811   ,symbol: 'B'   ,date:new Date('2020/01/05')},
				{order: 6, id:6,   name: 'Carbon'     ,weight: 12.0107  ,symbol: 'C'   ,date:new Date('2020/01/06')},
				{order: 7, id:7,   name: 'Nitrogen'   ,weight: 14.0067  ,symbol: 'N'   ,date:new Date('2020/01/07')},
				{order: 8, id:8,   name: 'Oxygen'     ,weight: 15.9994  ,symbol: 'O'   ,date:new Date('2020/01/08')},
				{order: 9, id:9,   name: 'Fluorine'   ,weight: 18.9984  ,symbol: 'F'   ,date:new Date('2020/01/09')},
				{order: 10, id:10, name: 'Neon'       ,weight: 20.1797  ,symbol: 'Ne'  ,date:new Date('2020/02/10')},
				{order: 11, id:11, name: 'Sodium'     ,weight: 22.9897  ,symbol: 'Na'  ,date:new Date('2020/01/11')},
				{order: 12, id:12, name: 'Magnesium'  ,weight: 24.305   ,symbol: 'Mg'  ,date:new Date('2020/01/12')},
				{order: 13, id:13, name: 'Aluminum'   ,weight: 26.9815  ,symbol: 'Al'  ,date:new Date('2020/01/13')},
				{order: 14, id:14, name: 'Silicon'    ,weight: 28.0855  ,symbol: 'Si'  ,date:new Date('2020/01/14')},
				{order: 15, id:15, name: 'Phosphorus' ,weight: 30.9738  ,symbol: 'P'   ,date:new Date('2020/01/15')},
				{order: 16, id:16, name: 'Sulfur'     ,weight: 32.065   ,symbol: 'S'   ,date:new Date('2020/01/16')},
				{order: 17, id:17, name: 'Chlorine'   ,weight: 35.453   ,symbol: 'Cl'  ,date:new Date('2020/01/17')},
				{order: 18, id:18, name: 'Argon'      ,weight: 39.948   ,symbol: 'Ar'  ,date:new Date('2020/01/18')},
				{order: 19, id:19, name: 'Potassium'  ,weight: 39.0983  ,symbol: 'K'   ,date:new Date('2020/01/19')},
				{order: 20, id:20, name: 'Calcium'    ,weight: 40.078   ,symbol: 'Ca'  ,date:new Date('2020/01/20')}
			];
			
			this.selection.select(this.tableDataDemo[2],this.tableDataDemo[3]);
		});
	}
	
	clickBtn() {
		this.toastr.successToastr('Evento click', '¡Se ha logrado!');
	}
	onDatepickeryearAndMonth(d: Moment) {
		this.toastr.successToastr(d.format('MM/yyyy'), '¡Se ha logrado!');
	}
	onDatePicker(d :Date){
		let a = this.datePipe.transform(d, 'dd/MM/yyyy')
		this.toastr.successToastr(a, '¡Se ha logrado!');
	}
	onChangeSelectFuente(e){
		this.toastr.successToastr('Evento change', '¡Fuente seleccionada!');
	}
	
	tableRowDelete(element){
		console.log(element);
	}
	tableRowSee(element){
		console.log(element);
	}
	tableRowEdit(element){
		console.log(element);
	}
}
