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
import { forEach } from '@angular/router/src/utils/collection';



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
	idYAxis = [];
	
	colors = [
		"#000000",
		"#0000ff",
		"#8a2be2",
		"#a52a2a",
		"#deb887",
		"#5f9ea0",
		"#7fff00",
		"#d2691e",
		"#ff7f50",
		"#6495ed",
		"#dc143c",
		"#00ffff",
		"#00008b",
		"#008b8b",
		"#b8860b",
		"#a9a9a9",
		"#006400",
		"#a9a9a9",
		"#bdb76b",
		"#8b008b",
		"#556b2f",
		"#ff8c00",
		"#9932cc",
		"#8b0000",
		"#e9967a",
		"#8fbc8f",
		"#483d8b",
		"#2f4f4f",
		"#2f4f4f",
		"#00ced1",
		"#9400d3",
		"#ff1493",
		"#00bfff",
		"#696969",
		"#696969",
		"#1e90ff",
		"#b22222",
		"#228b22",
		"#ff00ff",
		"#daa520",
		"#ffd700",
		"#808080",
		"#008000",
		"#adff2f",
		"#808080",
		"#ff69b4",
		"#cd5c5c",
		"#4b0082",
		"#f0e68c",
		"#7cfc00",
		"#fffacd",
		"#add8e6",
		"#f08080",
		"#e0ffff",
		"#fafad2",
		"#d3d3d3",
		"#90ee90",
		"#d3d3d3",
		"#ffb6c1",
		"#ffa07a",
		"#20b2aa",
		"#87cefa",
		"#778899",
		"#778899",
		"#b0c4de",
		"#00ff00",
		"#32cd32",
		"#ff00ff",
		"#800000",
		"#66cdaa",
		"#0000cd",
		"#ba55d3",
		"#9370db",
		"#3cb371",
		"#7b68ee",
		"#00fa9a",
		"#48d1cc",
		"#c71585",
		"#191970",
		"#ffe4e1",
		"#ffe4b5",
		"#ffdead",
		"#000080",
		"#808000",
		"#6b8e23",
		"#ffa500",
		"#ff4500",
		"#da70d6",
		"#eee8aa",
		"#98fb98",
		"#afeeee",
		"#db7093",
		"#ffefd5",
		"#ffdab9",
		"#cd853f",
		"#ffc0cb",
		"#dda0dd",
		"#b0e0e6",
		"#800080",
		"#663399",
		"#bc8f8f",
		"#4169e1",
		"#8b4513",
		"#f4a460",
		"#2e8b57",
		"#a0522d",
		"#c0c0c0",
		"#87ceeb",
		"#6a5acd",
		"#708090",
		"#708090",
		"#00ff7f",
		"#4682b4",
		"#d2b48c",
		"#008080",
		"#d8bfd8",
		"#ff6347",
		"#40e0d0",
		"#ee82ee",
		"#f5deb3",
		"#ffff00",
		"#9acd32"
	];
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
					let ordenado = [];
					dataInterno.forEach(element=>{
						if("EAT-P1AEN-001" == element.tag) ordenado[0]=element;
						if("EAT-P1ARE-001" == element.tag) ordenado[1]=element;
						if("EAT-P1RQ1-001" == element.tag) ordenado[2]=element;
						if("EAT-P1RQ2-001" == element.tag) ordenado[3]=element;
						if("EAT-P1RQ3-001" == element.tag) ordenado[4]=element;
						if("EAT-P1RQ4-001" == element.tag) ordenado[5]=element;
						if("EAT-R1AEN-001" == element.tag) ordenado[6]=element;
						if("EAT-R1ARE-001" == element.tag) ordenado[7]=element;
						if("EAT-R1RQ1-001" == element.tag) ordenado[8]=element;
						if("EAT-R1RQ2-001" == element.tag) ordenado[9]=element;
						if("EAT-R1RQ3-001" == element.tag) ordenado[10]=element;
						if("EAT-R1RQ4-001" == element.tag) ordenado[11]=element;
						if("EAT-P2AEN-001" == element.tag) ordenado[12]=element;
						if("EAT-P2ARE-001" == element.tag) ordenado[13]=element;
						if("EAT-P2RQ1-001" == element.tag) ordenado[14]=element;
						if("EAT-P2RQ2-001" == element.tag) ordenado[15]=element;
						if("EAT-P2RQ3-001" == element.tag) ordenado[16]=element;
						if("EAT-P2RQ4-001" == element.tag) ordenado[17]=element;
						if("EAT-R2AEN-001" == element.tag) ordenado[18]=element;
						if("EAT-R2ARE-001" == element.tag) ordenado[19]=element;
						if("EAT-R2RQ1-001" == element.tag) ordenado[20]=element;
						if("EAT-R2RQ2-001" == element.tag) ordenado[21]=element;
						if("EAT-R2RQ3-001" == element.tag) ordenado[22]=element;
						if("EAT-R2RQ4-001" == element.tag) ordenado[23]=element;
					});
					this.selectOptionsVariables = ordenado.map(element => { return { id: element.tag, label: element.tag } });
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
		let opt: any = {
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
		let tags = this.formvariables.get('selectVariables').value;
		let count = 0;
		if (tags == null || tags.length == 0 || mydate == null) {
			this.toastr.errorToastr("Todos los campos son necesarios.", 'Lo siento,');
			return 0;
		}

		for (const axis of this.idYAxis) {
			//this.chartLine.get(axis).remove();
		}
		if (this.chartLine) this.chartLine.destroy();
		
		this.idYAxis = [];
		let data: any = [
			{ nameParameter: "year", valueParameter: year },
			{ nameParameter: "mount", valueParameter: month }];
		let indexYAxis = 0;
		this.addBlock(1, 'Graficando');
		for (const tag of tags) {
			this.ppaMonitoringFormatService.get(tag, data).subscribe((data) => {
				
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
				opt.yAxis.push({ // Primary yAxis
					id: name,
					labels: {
						style: {
							color: this.colors[indexYAxis]
						} 
					},
					title: {
						enabled: false,
						style: {
							color: this.colors[indexYAxis]
						},
						align: 'high',
						offset: 0,
						text: " " + name + ' (' + unidad + ") ",
						rotation: 0,
						y: -10
					},
					showEmpty: false,
					max:null,
					min:null,
					startOnTick: false

				});
	
				
				fdss = this.ordenar(fdss);
				opt.series.push(
					{
						name: name,
						yAxis: name,
						data: fdss,
						color: this.colors[indexYAxis]
					}
				);
		
				
				indexYAxis += 1;
				// this.opt.xAxis.categories = lstX;
				count += 1;
				if (count == tags.length){ 
					this.chartLine = Highcharts.chart(this.chartLineMs.nativeElement, opt);
					this.addBlock(2, '');
				}
			}, error => {
				this.toastr.warningToastr(tag + ' no contiene datos en estas fechas', 'Lo siento,');
				console.log("Error: " + tag + " solicitud Fallida");
				count += 1;
				if (count == tags.length) this.addBlock(2, '');
			});
		}
	}

	ordenar(arr) {
		const l = arr.length;
		let j, temp;

		for (let i = 1; i < l; i++) {
			j = i;
			temp = arr[i];
			while (j > 0 && arr[j - 1][0] > temp[0]) {
				arr[j] = arr[j - 1];
				j--;
			}
			arr[j] = temp;
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
