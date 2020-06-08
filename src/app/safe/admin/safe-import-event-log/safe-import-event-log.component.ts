import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation-dialog.service';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { EventService } from 'src/app/core/services/event.service';
import * as moment from 'moment';
import { requiredFileType } from 'src/app/core/helpers/requiredFileType';
import { Moment } from 'moment';

@Component({
	selector: 'app-safe-import-event-log',
	templateUrl: './safe-import-event-log.component.html',
	styleUrls: ['./safe-import-event-log.component.scss']
})
export class SafeImportEventLogComponent implements OnInit {
	tableData = [
		{ order: 1, fechaOp: 'mar-20', fuenteImport: 'Manual', usuario: 'Manuel Herrera', fechaMod: '01/04/2020 01:40:00 pm', estatus: 'exitosa' },
		{ order: 2, fechaOp: 'mar-20', fuenteImport: 'Manual', usuario: 'Sistema', fechaMod: '01/04/2020 12:40:00 pm', estatus: 'exitosa' },
		{ order: 3, fechaOp: 'mar-20', fuenteImport: 'Manual', usuario: 'Ivette Colin', fechaMod: '01/04/2020 12:40:00 pm', estatus: 'exitosa' },
		{ order: 4, fechaOp: 'mar-20', fuenteImport: 'Manual', usuario: 'Sistema', fechaMod: '01/04/2020 11:40:00 pm', estatus: 'Fallida' },
		{ order: 5, fechaOp: 'mar-20', fuenteImport: 'Manual', usuario: 'Sistema', fechaMod: '01/04/2020 11:40:00 pm', estatus: 'Fallida' }
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
	tableRow_x_page = [5,10,20,50, 100, 250, 500];
	
	fileUploadForm : FormGroup;

	progress;
	constructor(
		private formBuilder: FormBuilder,
		private confirmationDialogService: ConfirmationDialogService,
		public globalService: GlobalService,
		public toastr: ToastrManager,
		public eventService: EventService) { }

	ngOnInit() {
		this.fileUploadForm = this.formBuilder.group({
			file: new FormControl(null, [Validators.required, requiredFileType('zip')]),
			date: new FormControl(moment(), Validators.required)
		});	
	}
	
	onChangeDatePicker(d: Moment) {
		const month = d.month() + 1;
		const year = d.year();
		const date = d.format('MM/yyyy');
	}
	onTableRowDelete(element){
		this.confirmationDialogService.confirm(
			'Confirmación',
			'¿Está seguro de eliminar el Registro?'
		)
		.then((confirmed) => {
			if ( confirmed ) {
				console.log(element);
			}
		})
		.catch(() => {});
	}
	clickBtnDownload(){
	}
	
	upload(value) {

		let typeVarhtml = this.fileUploadForm.controls.typeVarhtml.value || '';
		let date:Moment = this.fileUploadForm.controls.date.value;
		if (typeVarhtml == null || date == null) {
			this.toastr.errorToastr('Todos los campos son necesarios.', 'Lo siento,');
			return 0;
		}

		if (this.fileUploadForm.controls.typeVarhtml.value === '4') {
			const message = 'Procesando el mes: ' + (date.month() + 1) + ' del año: ' +  date.format('yyyy') + '. Upload Zip Manualmente; espere por favor.';
			this.toastr.successToastr(message, '.... Procesando');
		} else {
			// this.toastr.errorToastr('No es Proceso Manual.', 'Lo siento,');
			return 0;
		}
		//this.addBlock(1,'');
		//this.valid = false;
		const reader = new FileReader();
		reader.onloadend = (e) => {
			/*
			this.file = reader.result;
			this.file = this.file.replace(/^data:(.*;base64,)?/, '');
			this.file = this.file.trim();
			this.fileName = value.file.name;
			
			this.ppaMonitoringFormatService.entradaManual( new Date(this.date.value).getFullYear(),
			 new Date(this.date.value).getMonth() + 1, {
				file: this.file,
				name: this.fileName,
				idTypeImport: 4,
				nameImport: 'no aplica'
			}).subscribe(
				data => {
					this.addBlock(2,'');
					console.log(data);
					this.toastr.successToastr('El archivo llego con exito', 'Ejecución lanzada con éxito.');
				},
				errorData => {
					this.addBlock(2,'');
					console.dir(errorData);
					this.toastr.errorToastr(errorData.error.message, 'Lo siento,');
				});
				//*/
		}
		reader.readAsDataURL(value.file);
	}
}
