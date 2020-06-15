import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Moment } from 'moment';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation-dialog.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { requiredFileType } from 'src/app/core/helpers/requiredFileType';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { EventBlocked } from 'src/app/core/models/EventBlocked';
import { EventService } from 'src/app/core/services/event.service';
import * as moment from 'moment';
import { IdLabel } from 'src/app/core/models/IdLabel';
import { MatSelectChange } from '@angular/material';
import { PpaMonitoringFormatService } from '../../services/ppa-monitoring-format.service';
import { MaestroOpcionDTO } from '../../../compliance/models/maestro-opcion-dto';
import { map } from 'rxjs/operators';
import * as Highcharts from 'highcharts';

@Component({
	selector: 'app-safe-energy-meters',
	templateUrl: './safe-energy-meters.component.html',
	styleUrls: ['./safe-energy-meters.component.scss']
})
export class SafeEnergyMetersComponent implements OnInit {
	// LA PROPIEDAD 'ORDER' ES NECESARIA EN EL DATA SI SE DESEA QUE SEA ORDENABLE ESTA COLUMNA
	// por eso se descarto dejar el incremental en el html
	tableData = [
		{ order: 1, fechaOp: 'mar-20', fuenteImport: '2da Corrida MM', usuario: 'Manuel Herrera', fechaMod: '01/04/2020 01:40:00 pm', estatus: 'exitosa' },
		{ order: 2, fechaOp: 'mar-20', fuenteImport: '2da Corrida MM', usuario: 'Sistema', fechaMod: '01/04/2020 12:40:00 pm', estatus: 'exitosa' },
		{ order: 3, fechaOp: 'mar-20', fuenteImport: '1ra Corrida MM', usuario: 'Ivette Colin', fechaMod: '01/04/2020 12:40:00 pm', estatus: 'exitosa' },
		{ order: 4, fechaOp: 'mar-20', fuenteImport: '1ra Corrida MM', usuario: 'Sistema', fechaMod: '01/04/2020 11:40:00 pm', estatus: 'exitosa' },
		{ order: 5, fechaOp: 'mar-20', fuenteImport: '1ra Corrida MM', usuario: 'Sistema', fechaMod: '01/04/2020 11:40:00 pm', estatus: 'exitosa' }
	];
	tablaColumnsLabels = [
		{ key: 'order', label: '#' },
		{ key: 'fechaOp', label: 'Fecha de Operación Comercial' },
		{ key: 'fuenteImport', label: 'Fuente de Importación' },
		{ key: 'usuario', label: 'Usuario' },
		{ key: 'fechaMod', label: 'Fecha y Hora Ultima Modificación' },
		{ key: 'estatus', label: 'Estatus de la Importación' }
	];
	tableColumnsDisplay: string[] = [
		'order',
		'fechaOp',
		'fuenteImport',
		'usuario',
		'fechaMod',
		'estatus',
		'sys_delete'
	];
	tableRow_x_page = [5, 10, 20, 50, 100, 250, 500];

	selectOptionsFuente: IdLabel[] = [
		{ id: "1", label: 'FileZilla FTP' },
		{ id: "2", label: 'PAYSERVER DB' },
		{ id: "3", label: 'PI SERVER DB' },
		{ id: "4", label: 'Manual' }
	];
	selectOptionsVariables: IdLabel[] = [
		{ id: "1", label: 'variable 1' },
		{ id: "2", label: 'variable 2' },
		{ id: "3", label: 'variable 3' },
		{ id: "4", label: 'variable 4' }
	];

	fileUploadForm: FormGroup;
	formvariables: FormGroup;
	isManualLoad = false;

	etapa001: number;

	valid = false;
	file: any;
	fileName: any;
	progress;

	@ViewChild('chartLineMs') chartLineMs: ElementRef;
	chartLine: any;
	idYAxis=[];
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
			tableCaption: ""
		},
		xAxis: {
			gridLineWidth: 1,
			type: 'datetime'
		},
		yAxis: [  ],
		
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
		private formBuilder: FormBuilder,
		private confirmationDialogService: ConfirmationDialogService,
		public globalService: GlobalService,
		public toastr: ToastrManager,
		public eventService: EventService,
		private ppaMonitoringFormatService: PpaMonitoringFormatService
	) { }

	ngOnInit() {
		if (this.globalService.plant.name.toLowerCase() == 'aguila') {
			this.selectOptionsFuente = [
				{ id: "1", label: 'FileZilla FTP' },
				{ id: "2", label: 'PAYSERVER DB' },
				{ id: "3", label: 'PI SERVER DB' },
				{ id: "4", label: 'Manual' }
			];
		} else {
			this.selectOptionsFuente = [
				{ id: "1", label: 'FileZilla FTP' },
				{ id: "2", label: 'CTUNG DB' },
				{ id: "3", label: 'PI SERVER DB' },
				{ id: "4", label: 'Manual' }
			];
		}
		this.fileUploadForm = this.formBuilder.group({
			file: new FormControl(null, [Validators.required, requiredFileType('xlsx')]),
			typeVarhtml: new FormControl('', Validators.required),
			date: new FormControl(moment(), Validators.required)
		});
		this.formvariables = this.formBuilder.group({
			selectVariables: new FormControl('', Validators.required),
		});
		this.loadTags();
	}
	loadTags() {

		this.ppaMonitoringFormatService.getCatalogoOpcion('Etapa Tag', 'P 001').subscribe(
			(data: MaestroOpcionDTO) => {
				this.etapa001 = data.maestroOpcionId;
				this.ppaMonitoringFormatService.getTags(this.etapa001).subscribe((dataInterno) => {
					this.addBlock(2, '');
					console.log("loadTags");
					console.log(dataInterno);
					console.log("./loadTags");
					this.selectOptionsVariables = dataInterno.map(element=>{return{ id: element.tag, label: element.tag }});
					/*
					dataInterno.forEach(element => {
						this.tagsList.push({ id: element.tag, label: element.tag });
					});
					//*/
				});
			});
	}
	resetScreen() {
		// this.dataSource = new MatTableDataSource<any>([]);
		this.formvariables.get('selectVariables').reset();
		if (this.chartLine !== undefined) {
			this.chartLine.destroy();
			this.chartLine = undefined;
		}
	}
	onChangeSelectFuente(e: MatSelectChange) {
		this.isManualLoad = e.value == '4' ? true : false;
	}
	onChangeDatePicker(d: Moment) {
		const month = d.month() + 1;
		const year = d.year();
		const date = d.format('MM/yyyy');

		this.resetScreen();
	}
	onChangeSelectVariables(e) {
		
	}
	onBtnChart() {
		
		const mydate = this.fileUploadForm.get('date').value;
		const month = mydate.month() + 1;
		const year = mydate.year(); //getFullYear()

		let tags = this.formvariables.get('selectVariables').value;
		let count = 0;
		if(tags == null || tags.length == 0 || mydate == null){
			this.toastr.errorToastr("Todos los campos son necesarios.", 'Lo siento,');
			return 0;
		}

		for (const axis of this.idYAxis) {
			this.chartLine.get(axis).remove();
		}
		if(this.chartLine)this.chartLine.destroy();
		this.chartLine = Highcharts.chart(this.chartLineMs.nativeElement, this.opt);
		this.idYAxis = [];
		let data:any = [
			{nameParameter: "year",valueParameter: year},
			{nameParameter: "mount",valueParameter: month}];
		let indexYAxis=0;
		this.addBlock(1,'Graficando');
		for (const tag of tags) {
			this.ppaMonitoringFormatService.get(tag, data).subscribe((data) => {
				count +=1;
				if(count == tags.length)this.addBlock(2,'');
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
						text: " "+name+' ('+unidad+") ",
						rotation: 0,
						y: -10
					},
				});
				fdss = this.ordenar(fdss);
				this.chartLine.addSeries(
					{
						yAxis: name,
						name: name,
						data: fdss,
					}
				);
				indexYAxis += 1;
				// this.opt.xAxis.categories = lstX;
			},error=>{
				this.toastr.warningToastr(tag + ' no contiene datos en estas fechas', 'Lo siento,');
				console.log("Error: "+tag+" solicitud Fallida");
				count +=1;
				if(count == tags.length)this.addBlock(2,'');
			});
		}
	}
	
	ordenar(arr) {
		const l = arr.length;
		let j, temp;

		for ( let i = 1; i < l; i++ ) {
		  j = i;
		  temp = arr[ i ];
		  while ( j > 0 && arr[ j - 1 ][0] > temp[0] ) {
			arr[ j ] = arr[ j - 1 ];
			j--;
		  }
		  arr[ j ] = temp;
		}

		return arr;
	}
	clickBtnDownloadChart() {
	}
	clickBtnImportFromDate() {
		console.log(this.fileUploadForm.value);
	}
	clickBtnDowloadImport() {
	}

	upload(value) {
		const mydate = this.fileUploadForm.get('date').value;
		const month = mydate.month() + 1;
		const year = mydate.year();
		if (mydate == null) {
			this.toastr.errorToastr('Eliga una fecha.', 'Lo siento,');
			return 0;
		}
		this.addBlock(1, '');
		const reader = new FileReader();
		reader.onloadend = (e) => {
			this.file = reader.result;
			this.file = this.file.replace(/^data:(.*;base64,)?/, '');
			this.file = this.file.trim();
			this.fileName = value.file.name;
			this.ppaMonitoringFormatService.uploadPerfil({
				file: this.file,
				name: this.fileName,
				year: year,
				month: month
			}).subscribe(
				data => {
					this.addBlock(2, '');
					this.toastr.successToastr('El archivo llego con exito', 'Ejecución lanzada con éxito.');
				},
				errorData => {
					this.addBlock(2, '');
					console.dir(errorData);
					this.toastr.errorToastr(errorData.error.message, 'Lo siento,');
				});
		};
		reader.readAsDataURL(value.file);
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
	private addBlock(type, msg): void {
		this.eventService.sendApp(new EventMessage(1,
			new EventBlocked(type, msg)));
	}
}
