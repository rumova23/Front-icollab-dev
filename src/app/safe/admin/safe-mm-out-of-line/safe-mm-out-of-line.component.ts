import { Component, OnInit } from '@angular/core';
import { Moment } from 'moment';
import { ToastrManager } from 'ng6-toastr-notifications';
import { GlobalService } from 'src/app/core/globals/global.service';

@Component({
	selector: 'app-safe-mm-out-of-line',
	templateUrl: './safe-mm-out-of-line.component.html',
	styleUrls: ['./safe-mm-out-of-line.component.scss']
})
export class SafeMmOutOfLineComponent implements OnInit {
	tableData = [
		{order:1,fechaOp:'mar-20',proceso:'2da Corrida MM',usuario:'Manuel Herrera',fechaMod:'01/04/2020 01:40:00 pm',estatus:'exitosa'}
	];
	tablaColumnsLabels=[
		{ key: 'fechaOp', label: 'fechaOp' }
	];
	tableColumnsDisplay: string[] = [
		'fechaOp',
		'sys_delete'
	];
	constructor(
		public globalService: GlobalService,
		public toastr: ToastrManager
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
		this.toastr.successToastr('table Row Delete', 'Seleccionaste');
		console.log(element);
	}

}
