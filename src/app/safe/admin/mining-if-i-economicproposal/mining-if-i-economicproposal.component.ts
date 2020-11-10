/* tslint:disable:indent */
import { Component, OnInit } from '@angular/core';
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
import {EconomicProposalService} from '../../services/economic-proposal.service';
import {EconomicProposalDTO} from '../../models/economic-proposal-dto';

@Component({
  selector: 'app-mining-if-i-economicproposal',
  templateUrl: './mining-if-i-economicproposal.component.html',
  styleUrls: ['./mining-if-i-economicproposal.component.scss']
})
export class MiningIFIEconomicproposalComponent implements OnInit {
	// LA PROPIEDAD 'ORDER' ES NECESARIA EN EL DATA SI SE DESEA QUE SEA ORDENABLE ESTA COLUMNA
	// por eso se descarto dejar el incremental en el html
	tableData = [
		{order: 1, fechaOp: 'mar-20', fuenteImport: '2da Corrida MM', usuario: 'Manuel Herrera', fechaMod: '01/04/2020 01:40:00 pm', estatus: 'exitosa'},
		{order: 2, fechaOp: 'mar-20', fuenteImport: '2da Corrida MM', usuario: 'Sistema'       , fechaMod: '01/04/2020 12:40:00 pm', estatus: 'exitosa'},
		{order: 3, fechaOp: 'mar-20', fuenteImport: '1ra Corrida MM', usuario: 'Ivette Colin'  , fechaMod: '01/04/2020 12:40:00 pm', estatus: 'exitosa'},
		{order: 4, fechaOp: 'mar-20', fuenteImport: '1ra Corrida MM', usuario: 'Sistema'       , fechaMod: '01/04/2020 11:40:00 pm', estatus: 'exitosa'},
		{order: 5, fechaOp: 'mar-20', fuenteImport: '1ra Corrida MM', usuario: 'Sistema'       , fechaMod: '01/04/2020 11:40:00 pm', estatus: 'exitosa'}
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
	tableData01: Array<EconomicProposalDTO> = [];
	tabla01ColumnsLabels = [
		{ key: 'numeroMesCod', label: '# de Mes desde COD'},
		{ key: 'cfcAm', label: 'CFC am'},
		{ key: 'cfomMtm', label: 'CFOM mtm'},
		{ key: 'cfomDm', label: 'CFOM dm'},
		{ key: 'cfomMom', label: 'CFOM mom'},
		{ key: 'cvoM', label: 'CVO m'},
		{ key: 'ccaM', label: 'CCA m'},
		{ key: 'pdgM', label: 'PDGm'},
		{ key: 'pi', label: 'PI'}
	];
	table01ColumnsDisplay: string[] = [
		'numeroMesCod',
		'cfcAm',
		'cfomMtm',
		'cfomDm',
		'cfomMom',
		'cvoM',
		'ccaM',
		'pdgM',
		'pi',
		'sys_edit'
	];

	selectOptionsVariables: IdLabel[] = [
		{id: '1', label: 'CFC am'},
		{id: '2', label: 'CFOM mtm'},
	];


	formQuery: FormGroup;
	formEconomic: FormGroup;
	formvariables: FormGroup;
	fileUploadForm: FormGroup;
	isManualLoad = false;


	valid = false;
	file: any;
	fileName: any;
	progress;

	constructor(
		public formBuilder: FormBuilder,
		public confirmationDialogService: ConfirmationDialogService,
		public globalService: GlobalService,
		public toastr: ToastrManager,
		public eventService: EventService,
		public economicProposalService: EconomicProposalService
	) { }

	ngOnInit() {
		this.formQuery = this.formBuilder.group({
			date: new FormControl(moment(), Validators.required)
		});
		this.formvariables = this.formBuilder.group({
			selectVariables: new FormControl('', Validators.required),
		});
		this.fileUploadForm = this.formBuilder.group({
			file: new FormControl(null, [Validators.required, requiredFileType('xlsx')]),
		});
		this.formEconomic = this.formBuilder.group({
			economicProposalId: [],
			proyecto: [],
			numeroMesCod: [],
			mesAnio: [],
			cfcAm: [],
			cfomMtm: [],
			cfomDm: [],
			cfomMom: [],
			cvoM: [],
			ccaM: [],
			pdgM: [],
			pi: []
		});
	}
	onChangeDatePicker(d: Moment) {
		const month = d.month() + 1;
		const year = d.year();
		const date = d.format('MM/yyyy');
	}
	onChangeSelectVariables(e) {
		console.log(e);

	}

	clickBtnChart() {
	}
	clickBtnDownloadChart() {
	}
	clickBtnDowloadImport() {
	}
	onBtnConsultar() {
		const mydate = this.formQuery.get('date').value;
		const month = mydate.month() + 1;
		const year = mydate.year();
		this.economicProposalService.obtenEconomicProposal(
			year,
			month
		).subscribe (
			(data: Array<EconomicProposalDTO>) => {
				console.dir(data);
				this.tableData01 = data;

				this.addBlock(2, '');
			},
			errorData => {
				this.addBlock(2, '');
				if (errorData.error.message.indexOf('Notificacion 001') !== -1) {
					this.toastr.warningToastr(errorData.error.message, 'Advertencia!');
				} else {
					this.toastr.errorToastr(errorData.error.message, 'Error!');
				}
			});
	}
	onBtnUploadFile() {
		const mydate = this.formQuery.get('date').value;
		const month = mydate.month() + 1;
		const year = mydate.year();
	}
	onBtnFinish() {
	}
	downloadFile() {}
	tableRowDelete(element) {
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
	table01RowEdit(element) {
		this.formEconomic.patchValue(element);
	}
	formQuerySubmit(v) {
		console.log(v);
	}
	formEconomicSubmit(v) {
		this.economicProposalService.saveEconomicProposal(
			v
		).subscribe (
			(data: EconomicProposalDTO) => {
				console.dir(data);
				this.toastr.successToastr('Actualizacion correcta', 'Exito!');
				this.addBlock(2, '');
			},
			errorData => {
				this.addBlock(2, '');
				if (errorData.error.message.indexOf('Notificacion 001') !== -1) {
					this.toastr.warningToastr(errorData.error.message, 'Advertencia!');
				} else {
					this.toastr.errorToastr(errorData.error.message, 'Error!');
				}
			});

	}
	onBtnCancelFormEconomic() {

	}
	 addBlock(type, msg): void {
		this.eventService.sendApp(new EventMessage(1,
			new EventBlocked(type, msg)));
	}
}
