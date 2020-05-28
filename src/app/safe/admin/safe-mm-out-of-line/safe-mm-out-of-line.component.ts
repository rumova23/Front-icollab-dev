import { Component, OnInit } from '@angular/core';
import { Moment } from 'moment';
import { ToastrManager } from 'ng6-toastr-notifications';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation-dialog.service';

@Component({
	selector: 'app-safe-mm-out-of-line',
	templateUrl: './safe-mm-out-of-line.component.html',
	styleUrls: ['./safe-mm-out-of-line.component.scss']
})
export class SafeMmOutOfLineComponent implements OnInit {
	
	// LA PROPIEDAD 'ORDER' ES NECESARIA EN EL DATA SI SE DESEA QUE SEA ORDENABLE ESTA COLUMNA
	// por eso se descarto dejar el incremental en el html
	tableData = [
		{order:1,fechaOp:'mar-20',proceso:'2da Corrida MM',usuario:'Manuel Herrera',fechaMod:'01/04/2020 01:40:00 pm',estatus:'exitosa'},
		{order:2,fechaOp:'mar-20',proceso:'2da Corrida MM',usuario:'Sistema'       ,fechaMod:'01/04/2020 12:40:00 pm',estatus:'exitosa'},
		{order:3,fechaOp:'mar-20',proceso:'1ra Corrida MM',usuario:'Ivette Colin'  ,fechaMod:'01/04/2020 12:40:00 pm',estatus:'exitosa'},
		{order:4,fechaOp:'mar-20',proceso:'1ra Corrida MM',usuario:'Sistema'       ,fechaMod:'01/04/2020 11:40:00 pm',estatus:'exitosa'},
		{order:5,fechaOp:'mar-20',proceso:'1ra Corrida MM',usuario:'Sistema'       ,fechaMod:'01/04/2020 11:40:00 pm',estatus:'exitosa'}
	];
	tablaColumnsLabels=[
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
	tableRow_x_page = [5,10];

	constructor(
		public globalService: GlobalService,
		public toastr: ToastrManager,
		private confirmationDialogService: ConfirmationDialogService,
	) { }

	ngOnInit() {
	}
	chosenMonthHandler(d:Moment){
		const month = d.month() + 1;
		const year  = d.year();
		const date  = d.format('MM/yyyy');
		this.toastr.successToastr(date, 'Seleccionaste');
	}
	clickBtn1raCorrida(){
		this.toastr.successToastr('1ra Corrida', 'Seleccionaste');
	}
	clickBtn2daCorrida(){
		this.toastr.successToastr('2da Corrida', 'Seleccionaste');
	}
	tableRowDelete(element){
		this.confirmationDialogService.confirm(
			'Confirmación',
			'¿Está seguro de eliminar el Registro?'
		)
		.then((confirmed) => {
			if ( confirmed ) {
				this.toastr.successToastr('table Row Delete', 'Seleccionaste');
				console.log(element);
			}
		})
		.catch(() => {});
	}
	clickBtnDownloadMM(){
		this.toastr.successToastr('Descarga de Modelo Matematico Fuera de Línea', 'Seleccionaste');
	}

}
