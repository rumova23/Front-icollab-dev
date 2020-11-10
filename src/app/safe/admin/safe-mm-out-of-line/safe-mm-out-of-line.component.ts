import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Moment } from 'moment';
import { ToastrManager } from 'ng6-toastr-notifications';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation-dialog.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { EventService } from 'src/app/core/services/event.service';
import { PpaMonitoringFormatService } from '../../services/ppa-monitoring-format.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { EventBlocked } from 'src/app/core/models/EventBlocked';
import { MaestroOpcionDTO } from '../../../compliance/models/maestro-opcion-dto';
import { IdLabel } from 'src/app/core/models/IdLabel';
import Highcharts from 'highcharts';

@Component({
	selector: 'app-safe-mm-out-of-line',
	templateUrl: './safe-mm-out-of-line.component.html',
	styleUrls: ['./safe-mm-out-of-line.component.scss']
})
export class SafeMmOutOfLineComponent implements OnInit {
	@ViewChild('chartLineMs') chartLineMs: ElementRef;
	chartLine: any;
	formQuery: FormGroup;
	formvariables: FormGroup;
	// LA PROPIEDAD 'ORDER' ES NECESARIA EN EL DATA SI SE DESEA QUE SEA ORDENABLE ESTA COLUMNA
	// por eso se descarto dejar el incremental en el html
	tableData = [
		{ order: 1, fechaOp: 'mar-20', proceso: '2da Corrida MM', usuario: 'Manuel Herrera', fechaMod: '01/04/2020 01:40:00 pm', estatus: 'exitosa' },
		{ order: 2, fechaOp: 'mar-20', proceso: '2da Corrida MM', usuario: 'Sistema', fechaMod: '01/04/2020 12:40:00 pm', estatus: 'exitosa' },
		{ order: 3, fechaOp: 'mar-20', proceso: '1ra Corrida MM', usuario: 'Ivette Colin', fechaMod: '01/04/2020 12:40:00 pm', estatus: 'exitosa' },
		{ order: 4, fechaOp: 'mar-20', proceso: '1ra Corrida MM', usuario: 'Sistema', fechaMod: '01/04/2020 11:40:00 pm', estatus: 'exitosa' },
		{ order: 5, fechaOp: 'mar-20', proceso: '1ra Corrida MM', usuario: 'Sistema', fechaMod: '01/04/2020 11:40:00 pm', estatus: 'exitosa' }
	];
	tablaColumnsLabels = [
		{ key: 'order', label: '#' },
		{ key: 'fechaOp', label: 'Fecha de Operación Comercial' },
		{ key: 'proceso', label: 'Proceso' },
		{ key: 'usuario', label: 'Usuario' },
		{ key: 'fechaMod', label: 'Fecha y Hora Ultima Modificación' },
		{ key: 'estatus', label: 'Estatus del Proceso' }
	];
	tableColumnsDisplay: string[] = [
		'order',
		'fechaOp',
		'proceso',
		'usuario',
		'fechaMod',
		'estatus',
		'sys_delete'
	];
	tableRow_x_page = [5, 10];

	etapa001: number;
	selectOptionsVariables: IdLabel[] = [];
	idYAxis = [];
	maxDate: Date;
	public opt: any = {
		credits: {
			enabled: false
		},
		time: {
			timezone: 'America/Mexico_City',
			useUTC: false
		},
		chart: {
			zoomType: 'xy',
			type: 'spline',
			height: 600,
		},
		title: {
			text: 'Variables de Medidores de Energía',

		},
		exporting: {
			tableCaption: "",
			
			csv: {
			//	dateFormat: '%Y-%m-%d',
				decimalPoint: '.',
				itemDelimiter:",",
			}
		},
		xAxis: {
			gridLineWidth: 1,
			type: 'datetime'
		},
		yAxis: [],

		plotOptions: {
			series: {
				fillOpacity: 0.2
			}
		},

		tooltip: {
			shared: true
		},
		legend: {
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'bottom',
			y: -20,
			x: -10,
			floating: true,
			draggable: true,
			zIndex: 20,
			title: {
				text: 'Tags'
			},
			backgroundColor:
				Highcharts.defaultOptions.legend.backgroundColor || // theme
				'rgba(255,255,255,0.25)'
		},
		series: [],
		responsive: {
			rules: [{
				condition: {
					maxWidth: 500
				},
				chartOptions: {
					legend: {
						floating: false,
						layout: 'horizontal',
						align: 'center',
						verticalAlign: 'bottom',
						x: 0,
						y: 0
					},
					yAxis: [{
						labels: {
							align: 'right',
							x: 0,
							y: -6
						},
						showLastLabel: false
					}, {
						labels: {
							align: 'left',
							x: 0,
							y: -6
						},
						showLastLabel: false
					}, {
						visible: false
					}]
				}
			}]
		}
	};
	constructor(
		public globalService: GlobalService,
		public toastr: ToastrManager,
		private formBuilder: FormBuilder,
		private confirmationDialogService: ConfirmationDialogService,
		public eventService: EventService,
		private ppaMonitoringFormatService: PpaMonitoringFormatService
	) { }

	ngOnInit() {
		this.maxDate = new Date(new Date().getFullYear(), (new Date().getMonth() - 1));
		this.formQuery = this.formBuilder.group({
			date: new FormControl(moment(), Validators.required)
		});
		this.formvariables = this.formBuilder.group({
			selectVariables: new FormControl('', Validators.required),
		});
		this.loadTags();
	}
	
	loadTags() {

		this.ppaMonitoringFormatService.getCatalogoOpcion('Etapa Tag', 'MM-001').subscribe(
			(data: MaestroOpcionDTO) => {
				this.etapa001 = data.maestroOpcionId;
				this.ppaMonitoringFormatService.getTags(this.etapa001).subscribe((dataInterno) => {
					
					this.addBlock(2, '');
					console.log("loadTags");
					console.log(dataInterno);
					console.log("./loadTags");
					this.selectOptionsVariables = dataInterno.map(element => { return { id: element.tag, label: element.tag } });
					/*
					dataInterno.forEach(element => {
						this.tagsList.push({ id: element.tag, label: element.tag });
					});
					//*/
				});
			});
	}
	chosenMonthHandler(d: Moment) {
		const month = d.month() + 1;
		const year = d.year();
		const date = d.format('MM/yyyy');
	}
	clickBtn1raCorrida() {
		this.aplicarModeloPrimerTiempo();
	}
	clickBtn2daCorrida() {
	}
	tableRowDelete(element) {
		this.confirmationDialogService.confirm(
			'Confirmación',
			'¿Está seguro de eliminar el Registro?'
		)
			.then((confirmed) => {
				if (confirmed) {
					console.log(element);
				}
			})
			.catch(() => { });
	}
	clickBtnDownloadMM() {
	}


	aplicarModeloPrimerTiempo() {
		const mydate = this.formQuery.get('date').value;
		const month = mydate.month() + 1;
		const year = mydate.year(); //getFullYear()
		if (mydate == null) {
			this.toastr.errorToastr('Eliga una fecha.', 'Faltan Datos¡');
			return 0;
		}
		this.addBlock(1, '');
		this.ppaMonitoringFormatService.procesaModeloTiempo(
			year, month
		).subscribe(
			data => {
				this.addBlock(2, '');
				this.toastr.successToastr('Deteccion de Norma en proceso: ' + mydate.format('yyyy/MM'), '¡Procesando!');
			},
			errorData => {
				this.addBlock(2, '');
				console.dir(errorData);
				this.toastr.errorToastr(errorData.error.message, 'Lo siento,');
			});
	}


	
	onBtnChart() {

		const mydate = this.formQuery.get('date').value;
		const month = mydate.month() + 1;
		const year = mydate.year(); //getFullYear()

		let tags = this.formvariables.get('selectVariables').value;
		let count = 0;
		if (tags == null || tags.length == 0 || mydate == null) {
			this.toastr.errorToastr("Todos los campos son necesarios.", 'Lo siento,');
			return 0;
		}

		for (const axis of this.idYAxis) {
			this.chartLine.get(axis).remove();
		}
		if (this.chartLine) this.chartLine.destroy();
		this.chartLine = Highcharts.chart(this.chartLineMs.nativeElement, this.opt);
		this.idYAxis = [];
		let data: any = [
			{ nameParameter: "year", valueParameter: year },
			{ nameParameter: "mount", valueParameter: month }];
		let indexYAxis = 0;
		this.addBlock(1, 'Graficando');
		for (const tag of tags) {
			this.ppaMonitoringFormatService.get(tag, data).subscribe((data) => {
				//debugger
				//{timeini: "00:00", timeEnd: "00:05", value: 6511.82, status: "00:05"}
				count += 1;
				if (count == tags.length) this.addBlock(2, '');
				if (data == null) {
					this.toastr.warningToastr(tag + ' no contiene datos en estas fechas', 'Lo siento,');
					return false;
				}
				let fdss = [];
				let name;
				for (const dia of data) {
					name = dia.tag;
					dia.fechaTag; // "2020/2/15"
					for (const dato of dia.valores) {
						dato.timeEnd;
						dato.timeini;
						dato.status; // " 08:20"
						fdss.push([new Date(dia.fechaTag + ' ' + dato.timeini + ':00').getTime(), dato.value]);
					}
				}
				let unidad = '';
				if (tag.includes('TBS') || tag.includes('TAM')) {
					unidad = '°C';
				}
				if (tag.includes('SGM') || tag.includes('IGM')) {
					unidad = 'kj/kg';
				}
				if (tag.includes('SGV') || tag.includes('IGV')) {
					unidad = 'kj/m3';
				}
				if (tag.includes('HRE')) {
					unidad = '%';
				}
				if (tag.includes('PBA')) {
					unidad = 'BAR';
				}
				this.idYAxis.push(name);
				this.chartLine.addAxis({ // Primary yAxis
					id: name,
					labels: {
						format: '{value}',
						style: {
							color: Highcharts.getOptions().colors[indexYAxis]
						}
					},
					title: {
						enabled: false,
						style: {
							color: Highcharts.getOptions().colors[indexYAxis]
						},
						align: 'high',
						offset: 0,
						text: " " + name + ' (' + unidad + ") ",
						rotation: 0,
						y: -10
					},
				});
				//fdss = this.ordenar(fdss);
				this.chartLine.addSeries(
					{
						yAxis: name,
						name: name,
						data: fdss,
					}
				);
				indexYAxis += 1;
				// this.opt.xAxis.categories = lstX;
			}, error => {
				this.toastr.warningToastr(tag + ' no contiene datos en estas fechas', 'Lo siento,');
				console.log("Error: " + tag + " solicitud Fallida");
				count += 1;
				if (count == tags.length) this.addBlock(2, '');
			});
		}
	}
	
	clickBtnDownloadChart() {
	}
	onChangeSelectVariables(e) {
	}
	addBlock(type, msg): void {
		this.eventService.sendApp(new EventMessage(1,
			new EventBlocked(type, msg)));
	}

}
