import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Moment } from 'moment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IdLabel } from 'src/app/core/models/IdLabel';
import * as moment from 'moment';
import { SelectionModel } from '@angular/cdk/collections';
import { timer } from 'rxjs';
import { code } from './code';
import { DatePipe } from '@angular/common';
import * as Highcharts from "highcharts";

@Component({
	selector: 'app-security-doc',
	templateUrl: './security-doc.component.html',
	styleUrls: ['./security-doc.component.scss']
})
export class SecurityDocComponent implements OnInit {
	codes = code;
	listOptionsAutocomplete = ['One', 'Two', 'Three', 'Three', 'Threes', 'María'];
	form: FormGroup;
	tableDataDemo = [];
	tablaColumnsLabels = [
		{ key: 'order', label: '#' },
		{ key: 'date', label: 'Fecha', dateFormat: 'dd/MM/yyyy HH:mm:ss' }
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
	tableRow_x_page = [10, 15, 20];

	selectOptionsFuente: IdLabel[] = [
		{ id: "1", label: 'FileZilla FTP' },
		{ id: "2", label: 'PAYSERVER DB' },
		{ id: "3", label: 'PI SERVER DB' },
		{ id: "4", label: 'Manual' }
	];
	selectOptionsFuenteMultiselect: IdLabel[] = [
		{ id: "1", label: 'FileZilla FTP' },
		{ id: "2", label: 'PAYSERVER DB', disabled: false },
		{ id: "3", label: 'PI SERVER DB', disabled: true },
		{ id: "4", label: 'Manual' }
	];
	selection: SelectionModel<any> = new SelectionModel<any>(true, []);
	inputNumberMin = 0;
	inputNumberMax = 100000;
	constructor(
		public toastr: ToastrManager,
		private formBuilder: FormBuilder,
		private datePipe: DatePipe
	) { }

	ngOnInit() {
		this.setTableData();
		this.selection.changed.subscribe(event => {
			let algo = this.selection.selected;
		});
		this.form = this.formBuilder.group({
			name: [{ value: '', disabled: false }, Validators.required],
			aotucomplete: [{ value: '', disabled: false }, Validators.required],
			dateYearAndMonth: [{ value: null, disabled: false }],
			datePicker: [{ value: null, disabled: false }],
			inputNumber: [{ value: null, disabled: false }, [Validators.required, Validators.min(this.inputNumberMin), Validators.max(this.inputNumberMax)]],
			select: [{ value: '', disabled: false }, Validators.required]
		});
		this.chartCreate();
	}
	setTableData() {
		timer(2000).subscribe(() => {
			this.tableDataDemo = [
				{ order: 1, id: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', date: new Date('2020/01/01') },
				{ order: 2, id: 2, name: 'Helium', weight: 4.0026, symbol: 'He', date: new Date('2020/01/02'), backgroundColor: 'gold' },
				{ order: 3, id: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', date: new Date('2020/01/03') },
				{ order: 4, id: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', date: new Date('2020/01/04') },
				{ order: 5, id: 5, name: 'Boron', weight: 10.811, symbol: 'B', date: new Date('2020/01/05') },
				{ order: 6, id: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', date: new Date('2020/01/06') },
				{ order: 7, id: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', date: new Date('2020/01/07') },
				{ order: 8, id: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', date: new Date('2020/01/08') },
				{ order: 9, id: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', date: new Date('2020/01/09') },
				{ order: 10, id: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', date: new Date('2020/02/10') },
				{ order: 11, id: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na', date: new Date('2020/01/11') },
				{ order: 12, id: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg', date: new Date('2020/01/12') },
				{ order: 13, id: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al', date: new Date('2020/01/13') },
				{ order: 14, id: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si', date: new Date('2020/01/14') },
				{ order: 15, id: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P', date: new Date('2020/01/15') },
				{ order: 16, id: 16, name: 'Sulfur', weight: 32.065, symbol: 'S', date: new Date('2020/01/16') },
				{ order: 17, id: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl', date: new Date('2020/01/17') },
				{ order: 18, id: 18, name: 'Argon', weight: 39.948, symbol: 'Ar', date: new Date('2020/01/18') },
				{ order: 19, id: 19, name: 'Potassium', weight: 39.0983, symbol: 'K', date: new Date('2020/01/19') },
				{ order: 20, id: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca', date: new Date('2020/01/20') }
			];

			this.selection.select(this.tableDataDemo[2], this.tableDataDemo[3]);
		});
	}

	clickBtn() {
		this.toastr.successToastr('Evento click', '¡Se ha logrado!');
	}
	onDatepickeryearAndMonth(d: Moment) {
		this.toastr.successToastr(d.format('MM/yyyy'), '¡Se ha logrado!');
	}
	onDatePicker(d: Date) {
		let a = this.datePipe.transform(d, 'dd/MM/yyyy')
		this.toastr.successToastr(a, '¡Se ha logrado!');
	}
	onChangeSelectFuente(e) {
		this.toastr.successToastr('Evento change', '¡Fuente seleccionada!');
	}

	tableRowDelete(element) {
		console.log(element);
	}
	tableRowSee(element) {
		console.log(element);
	}
	tableRowEdit(element) {
		console.log(element);
	}
	errorToastr() {
		this.toastr.errorToastr('errorToastr', 'errorToastr');
	}
	infoToastr() {
		this.toastr.infoToastr('errorToastr', 'infoToastr');
	}
	successToastr() {
		this.toastr.successToastr('successToastr', 'successToastr');
	}
	warningToastr() {
		this.toastr.warningToastr('warningToastr', 'warningToastr');
	}
	customToastr() {
		this.toastr.customToastr('customToastr', 'customToastr');
	}
	@ViewChild("LineChart2") LineChart2: ElementRef;
	chartLine2C = null;
	chartCreate() {
		//https://jsfiddle.net/jwpxte12/53/
		let today2 = new Date(),
			day = 1000 * 60 * 60 * 24,
			// Utility functions
			dateFormat = Highcharts.dateFormat,
			defined = Highcharts.defined,
			isObject = Highcharts.isObject,
			reduce = Highcharts.reduce;

		// Set to 00:00:00:000 today2
		today2.setUTCHours(0);
		today2.setUTCMinutes(0);
		today2.setUTCSeconds(0);
		today2.setUTCMilliseconds(0);
		let today = today2.getTime();

		let opt: any = {

			chart: {
				events: {
					load: function () {
						var chart = this;
						console.log("label::",chart);
						chart.xAxis[0].labelGroup.element.childNodes.forEach(function (label) {
							
							if (label.innerHTML === 'S') {
								label.style.fill = 'red';
							}
						})
					}
				}
			},
			series: [{
				name: 'Offices',
				data: [{
					name: 'New offices',
					id: 'new_offices',
					owner: 'Peter'
				}, {
					name: 'Prepare office building',
					id: 'prepare_building',
					parent: 'new_offices',
					start: today - (2 * day),
					end: today + (6 * day),
					completed: {
						amount: 0.2
					},
					owner: 'Linda'
				}, {
					name: 'Inspect building',
					id: 'inspect_building',
					dependency: 'prepare_building',
					parent: 'new_offices',
					start: today + 6 * day,
					end: today + 8 * day,
					owner: 'Ivy'
				}, {
					name: 'Passed inspection',
					id: 'passed_inspection',
					dependency: 'inspect_building',
					parent: 'new_offices',
					start: today + 9.5 * day,
					milestone: true,
					owner: 'Peter'
				}, {
					name: 'Relocate',
					id: 'relocate',
					dependency: 'passed_inspection',
					parent: 'new_offices',
					owner: 'Josh'
				}, {
					name: 'Relocate staff',
					id: 'relocate_staff',
					parent: 'relocate',
					start: today + 10 * day,
					end: today + 11 * day,
					owner: 'Mark'
				}, {
					name: 'Relocate test facility',
					dependency: 'relocate_staff',
					parent: 'relocate',
					start: today + 11 * day,
					end: today + 13 * day,
					owner: 'Anne'
				}, {
					name: 'Relocate cantina',
					dependency: 'relocate_staff',
					parent: 'relocate',
					start: today + 11 * day,
					end: today + 14 * day
				}]
			}, {
				name: 'Product',
				data: [{
					name: 'New product launch',
					id: 'new_product',
					owner: 'Peter'
				}, {
					name: 'Development',
					id: 'development',
					parent: 'new_product',
					start: today - day,
					end: today + (11 * day),
					completed: {
						amount: 0.6,
						fill: '#e80'
					},
					owner: 'Susan'
				}, {
					name: 'Beta',
					id: 'beta',
					dependency: 'development',
					parent: 'new_product',
					start: today + 12.5 * day,
					milestone: true,
					owner: 'Peter'
				}, {
					name: 'Final development',
					id: 'finalize',
					dependency: 'beta',
					parent: 'new_product',
					start: today + 13 * day,
					end: today + 17 * day
				}, {
					name: 'Launch',
					dependency: 'finalize',
					parent: 'new_product',
					start: today + 17.5 * day,
					milestone: true,
					owner: 'Peter'
				}]
			}],
			tooltip: {
				pointFormatter: function () {
					var point = this,
						format = '%e. %b',
						options = point.options,
						completed = options.completed,
						amount = isObject(completed) ? completed.amount : completed,
						status = ((amount || 0) * 100) + '%',
						lines;

					lines = [{
						value: point.name,
						style: 'font-weight: bold;'
					}, {
						title: 'Start',
						value: dateFormat(format, point.start)
					}, {
						visible: !options.milestone,
						title: 'End',
						value: dateFormat(format, point.end)
					}, {
						title: 'Completed',
						value: status
					}, {
						title: 'Owner',
						value: options.owner || 'unassigned'
					}];

					return reduce(lines, function (str, line) {
						var s = '',
							style = (
								defined(line.style) ? line.style : 'font-size: 0.8em;'
							);
						if (line.visible !== false) {
							s = (
								'<span style="' + style + '">' +
								(defined(line.title) ? line.title + ': ' : '') +
								(defined(line.value) ? line.value : '') +
								'</span><br/>'
							);
						}
						return str + s;
					}, '');
				}
			},
			title: {
				text: 'Gantt Project Management'
			},
			xAxis: [
				{
					/*
					breaks: [{
						from: today + 1 * day,
						to: today + 2 * day,
						breakSize: 0
					}],//*/
					currentDateIndicator: true,
					min: today - 3 * day,
					max: today + 18 * day,
					labels: {
						format: '{value:%d}' // day of the week
						,align:'center'
	
					},
					grid: { // default setting
						enabled: true
					},
					//tickInterval: 1000 * 60 * 60 * 24, // Day
				}, {
					labels: {
						format: '{value:%m}'
					},
					//tickInterval: 1000 * 60 * 60 * 24 * 7 // week
				}
			]
		};

		this.chartLine2C = Highcharts.ganttChart(this.LineChart2.nativeElement, opt);
	}
}
