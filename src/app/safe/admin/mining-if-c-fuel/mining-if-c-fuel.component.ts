/* tslint:disable:indent */
import {Component, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import moment from 'moment';
import { IdLabel } from 'src/app/core/models/IdLabel';
import { requiredFileType } from 'src/app/core/helpers/requiredFileType';
import {FuelCostService} from '../../services/fuel-cost.service';
import {EconomicProposalDTO} from '../../models/economic-proposal-dto';
import {MasterFuelCostDTO} from '../../models/master-fuel-cost-dto';
import {EventMessage} from '../../../core/models/EventMessage';
import {EventBlocked} from '../../../core/models/EventBlocked';
import {ToastrManager} from 'ng6-toastr-notifications';
import {EventService} from '../../../core/services/event.service';
import {FuelCostDTO} from '../../models/fuel-cost-dto';
import {YearMountDTO} from '../../models/year-mount-dto';
import {MasterCatalogService} from '../../services/master-catalog.service';
import {MaestroOpcionDTO} from '../../../compliance/models/maestro-opcion-dto';
import {BearerDTO} from '../../models/bearer-dto';
import {ConfirmationDialogService} from '../../../core/services/confirmation-dialog.service';
import {timer} from 'rxjs';
import {FileUploadComponent} from '../../../common/fileUpload/fileUpload.component';

@Component({
	selector: 'app-mining-if-c-fuel',
	templateUrl: './mining-if-c-fuel.component.html',
	styleUrls: ['./mining-if-c-fuel.component.scss']
})
export class MiningIFCFuelComponent implements OnInit {
	// ************* configuracion de soportes *********
	@ViewChild('appFileupload') appFileupload: FileUploadComponent;
	files: Array<BearerDTO> = [];
	disabledSubmit = false;
	actionPage = 'edit';
	newFiles: Array<BearerDTO> = [];
	// ************* Fin de configuracion de soportes *********
	formQuery: FormGroup;
	formEditTableA: FormGroup;
	formEditTableB: FormGroup;
	formEditTableC: FormGroup;
	formTags: FormGroup;
	fileUploadForm: FormGroup;
	comboFuente: IdLabel[] = [];
	m3: FuelCostDTO;
	submitted = false;
	tableAData = [];
	tableAColumnsLabels = [
		{ key: 'order', label: '#' },
		{ key: 'dateOp', label: 'Fecha de Operación Comercial' },
		{ key: 'concepto', label: 'Concepto' },
		{ key: 'm3', label: 'M3' },
		{ key: 'gjoule', label: 'Gjoule' },
		{ key: 'ctoUnit', label: 'CTO.UNIT $/Gjoule' },
		{ key: 'mxn', label: '$ MXN' }
	];
	tableAColumnsDisplay: string[] = [
		'dateOp',
		'concepto',
		'm3',
		'gjoule',
		'ctoUnit',
		'mxn',
		'sys_edit'
	];
	tableRowXpage = [5, 10, 20, 50, 100, 250, 500];
	tableBData = [];
	tableBColumnsLabels = [
		{ key: 'order', label: '#' },
		{ key: 'dateOp', label: 'Fecha de Operación Comercial' },
		{ key: 'concepto', label: 'Concepto' },
		{ key: 'gjoule', label: 'Gjoule' },
		{ key: 'usd', label: 'USD' },
		{ key: 'usdGjoule', label: 'USD/Gjoule' },
		{ key: 'mxn', label: '$ MXN' },
	];
	tableBColumnsDisplay: string[] = [
		'dateOp',
		'concepto',
		'gjoule',
		'usd',
		'usdGjoule',
		'mxn',
		'sys_edit'
	];
	tableCData: Array<FuelCostDTO> = [];
	tableCColumnsLabels = [
		{ key: 'order', label: '#' },
		{ key: 'dateOp', label: 'Fecha de Operación Comercial' },
		{ key: 'ajustes', label: 'Ajustes' },
		{ key: 'mes', label: 'Mes' },
		{ key: 'facturado', label: 'Facturado' },
		{ key: 'ajustado', label: 'Ajustado' },
		{ key: 'mxn', label: '$ MXN' },
	];
	tableCColumnsDisplay: string[] = [
		'dateOp',
		'ajustes',
		'mes',
		'facturado',
		'ajustado',
		'mxn',
		'sys_edit',
		'sys_delete'
	];
	tableDData = [];

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
		{ id: '1', label: 'Gas' },
		{ id: '2', label: 'Diesel' }
	];
	selectOptionsTags: IdLabel[] = [
		{id: '1', label: 'Tag 1'},
		{id: '2', label: 'Tag 2'},
	];

	valid = false;
	file: any;
	fileName: any;
	progress;

	constructor(
		private formBuilder: FormBuilder,
		private fuelCostService: FuelCostService,
		public toastr: ToastrManager,
		public eventService: EventService,
		private masterCatalogService: MasterCatalogService,
		private confirmationDialogService: ConfirmationDialogService
	) { }

	ngOnInit() {
		this.initForms();
		this.loadCatalog();
	}
	initForms() {
		this.formQuery = this.formBuilder.group({
			date: new FormControl(moment(), Validators.required),
			source: new FormControl('', Validators.required),
		});
		this.formEditTableA = this.formBuilder.group({
			concepto: new FormControl('', Validators.required),
			m3: new FormControl('', Validators.required),
			gjoule: new FormControl('', Validators.required),
			ctoUnit: new FormControl('', Validators.required),
			mxn: new FormControl('', Validators.required),
		});
		this.formEditTableB = this.formBuilder.group({
			concepto: new FormControl('', Validators.required),
			gjoule: new FormControl('', Validators.required),
			usd: new FormControl('', Validators.required),
			usdGjoule: new FormControl('', Validators.required),
			mxn: new FormControl('', Validators.required),
		});
		this.formEditTableC = this.formBuilder.group({
			ajustes: new FormControl('', Validators.required),
			mes: new FormControl(moment(), Validators.required),
			facturado: new FormControl('', Validators.required),
			ajustado: new FormControl('', Validators.required),
			mxn: new FormControl('', Validators.required),
		});

		this.formTags = this.formBuilder.group({
			tags: new FormControl('', Validators.required),
		});

		this.fileUploadForm = this.formBuilder.group({
			file: new FormControl(null, [Validators.required, requiredFileType('xlsx')]),
		});
	}
	onFormQuery(o) {
		this.submitted = true;
		if (!this.formQuery.valid) {
			this.toastr.errorToastr('La fecha de operacion y la fuente, son requeridas', 'Error!');
			return;
		}
		const masterFuelCostDTO: MasterFuelCostDTO = new MasterFuelCostDTO();
		masterFuelCostDTO.sourceId = this.formQuery.get('source').value;
		const yearMountDTO: YearMountDTO = new YearMountDTO();
		const mydate = this.formQuery.get('date').value;
		yearMountDTO.year = mydate.year();
		yearMountDTO.mount = mydate.month() + 1;
		masterFuelCostDTO.yearMountDTO = yearMountDTO;
		this.fuelCostService.findTradeDate(masterFuelCostDTO).subscribe (
		(data: MasterFuelCostDTO) => {
			this.tableAData = [];
			this.tableAData.push(data.m3);

			this.tableBData = [];
			this.tableBData.push(data.usa);

			this.tableCData = [];
			this.tableCData = data.adjustments;

			this.obtenSupports(data.masterFuelCostId);
			this.addBlock(2, '');
		},
		errorData => {
			this.addBlock(2, '');
			this.toastr.errorToastr(errorData.error.message, 'Error!');
		});
	}
	obtenSupports(masterFuelCostId: number) {
		this.fuelCostService.obtenSupports(masterFuelCostId).subscribe((data: Array<BearerDTO>)  => {
				this.files = data;
			},
			errorData => {
				this.addBlock(2, '');
				this.toastr.errorToastr(errorData.error.message, 'Error!');
			},
			() => {
			});
	}
	onChangeDatePicker(o) {
		console.log(o);
	}
	onChangeSelectFuente(o) {
		console.log(o);
	}
	onTableARowEdite(o) {
		this.formEditTableA.patchValue(o);
	}
	onTableBRowEdite(o) {
		this.formEditTableB.patchValue(o);
	}
	onTableCRowEdite(o) {
		this.formEditTableC.patchValue(o);
	}
	onTableCRowDelete(o) {
		this.confirmationDialogService.confirm(
			'Confirmación',
			'¿Está seguro de eliminar el Archivo?'
		)
			.then((confirmed) => {
				this.submitted = true;
				if (!this.formQuery.valid) {
					this.toastr.errorToastr('La fecha de operacion y la fuente, son requeridas', 'Error!');
					return;
				}
				const mydate = this.formQuery.get('date').value;
				const masterFuelCostDTO: MasterFuelCostDTO = new MasterFuelCostDTO();
				masterFuelCostDTO.sourceId = this.formQuery.get('source').value;
				const yearMountDTO: YearMountDTO = new YearMountDTO();
				yearMountDTO.year = mydate.year();
				yearMountDTO.mount = mydate.month() + 1;
				masterFuelCostDTO.yearMountDTO = yearMountDTO;
				masterFuelCostDTO.adjustment = o;
				masterFuelCostDTO.group = 'ADJUSTMENT';
				this.fuelCostService.deleteFuelCost(masterFuelCostDTO).subscribe(data  => {
						console.log('echo');
					},
					errorData => {
						this.addBlock(2, '');
						this.toastr.errorToastr(errorData.error.message, 'Error!');
					},
					() => {
						this.onFormQuery(this.formQuery.value);
					});

			})
			.catch(() => {});
		console.log(o);
	}
	onTableDRowDelete(o) {
		console.log(o);
	}
	onFormEditTableA(o: FuelCostDTO) {
		this.submitted = true;
		if (!this.formQuery.valid) {
			this.toastr.errorToastr('La fecha de operacion y la fuente, son requeridas', 'Error!');
			return;
		}
		if (!this.formEditTableA.valid) {
			this.toastr.errorToastr('campos requeridos', 'Error!');
			return;
		}


		const mydate = this.formQuery.get('date').value;
		const masterFuelCostDTO: MasterFuelCostDTO = new MasterFuelCostDTO();
		masterFuelCostDTO.sourceId = this.formQuery.get('source').value;
		masterFuelCostDTO.group = 'M3';
		const yearMountDTO: YearMountDTO = new YearMountDTO();
		yearMountDTO.year = mydate.year();
		yearMountDTO.mount = mydate.month() + 1;
		masterFuelCostDTO.yearMountDTO = yearMountDTO;
		masterFuelCostDTO.m3 = o;
		this.fuelCostService.saveFuelCost(masterFuelCostDTO).subscribe (
		(data: MasterFuelCostDTO) => {
			this.toastr.successToastr('Guardado con exito', 'Exito!');
			this.addBlock(2, '');
		},
		errorData => {
			this.addBlock(2, '');
			this.toastr.errorToastr(errorData.error.message, 'Error!');
		},
		() => {
			this.onFormQuery(this.formQuery.value);
		});
	}

	onFormEditTableB(o) {
		this.submitted = true;
		if (!this.formQuery.valid) {
			this.toastr.errorToastr('La fecha de operacion y la fuente, son requeridas', 'Error!');
			return;
		}
		if (!this.formEditTableB.valid) {
			this.toastr.errorToastr('campos requeridos', 'Error!');
			return;
		}
		const mydate = this.formQuery.get('date').value;
		const masterFuelCostDTO: MasterFuelCostDTO = new MasterFuelCostDTO();
		masterFuelCostDTO.sourceId = this.formQuery.get('source').value;
		masterFuelCostDTO.group = 'USD';
		const yearMountDTO: YearMountDTO = new YearMountDTO();
		yearMountDTO.year = mydate.year();
		yearMountDTO.mount = mydate.month() + 1;
		masterFuelCostDTO.yearMountDTO = yearMountDTO;
		masterFuelCostDTO.usa = o;
		this.fuelCostService.saveFuelCost(masterFuelCostDTO).subscribe (
		(data: MasterFuelCostDTO) => {
			this.toastr.successToastr('Guardado con exito', 'Exito!');
			this.addBlock(2, '');
		},
		errorData => {
			this.addBlock(2, '');
			this.toastr.errorToastr(errorData.error.message, 'Error!');
		},
		() => {
			this.onFormQuery(this.formQuery.value);
		});
	}
	onFormEditTableC(o) {
		this.submitted = true;
		if (!this.formQuery.valid) {
			this.toastr.errorToastr('La fecha de operacion y la fuente, son requeridas', 'Error!');
			return;
		}
		if (!this.formEditTableC.valid) {
			this.toastr.errorToastr('campos requeridos', 'Error!');
			return;
		}
		const mydate = this.formQuery.get('date').value;
		const masterFuelCostDTO: MasterFuelCostDTO = new MasterFuelCostDTO();
		masterFuelCostDTO.sourceId = this.formQuery.get('source').value;
		masterFuelCostDTO.group = 'ADJUSTMENT';
		const yearMountDTO: YearMountDTO = new YearMountDTO();
		yearMountDTO.year = mydate.year();
		yearMountDTO.mount = mydate.month() + 1;
		masterFuelCostDTO.yearMountDTO = yearMountDTO;
		masterFuelCostDTO.adjustment = o;
		this.fuelCostService.saveFuelCost(masterFuelCostDTO).subscribe (
		(data: MasterFuelCostDTO) => {
			this.toastr.successToastr('Guardado con exito', 'Exito!');
			this.addBlock(2, '');
		},
		errorData => {
			this.addBlock(2, '');
			this.toastr.errorToastr(errorData.error.message, 'Error!');
		},
		() => {
			this.onFormQuery(this.formQuery.value);
		});
	}
	onBtnCancelEditTableA() {
		console.log('onBtnCancelEditTableA');
	}
	onBtnCancelEditTableB() {
		console.log('onBtnCancelEditTableB');
	}
	onBtnCancelEditTableC() {
		console.log('onBtnCancelEditTableC');
	}
	onChangeSelectTags(o) {
		console.log(o);
	}
	onBtnChart() {
		console.log('onBtnChart');
	}
	downloadFile() {
		console.log('downloadFile');
	}
	onBtnUploadFile() {
		console.log('onBtnUploadFile');
	}
	onBtnFinish() {
		this.submitted = true;
		if (!this.formQuery.valid) {
			this.toastr.errorToastr('La fecha de operacion y la fuente, son requeridas', 'Error!');
			return;
		}
		const mydate = this.formQuery.get('date').value;
		const masterFuelCostDTO: MasterFuelCostDTO = new MasterFuelCostDTO();
		masterFuelCostDTO.sourceId = this.formQuery.get('source').value;
		const yearMountDTO: YearMountDTO = new YearMountDTO();
		yearMountDTO.year = mydate.year();
		yearMountDTO.mount = mydate.month() + 1;
		masterFuelCostDTO.yearMountDTO = yearMountDTO;

		this.newFiles = [];
		if ( this.files != null) {
			this.files.forEach(file => {
				if (!file.bearerId) {
					this.newFiles.push(file);
				}
			});
		}

		if (this.newFiles.length <= 0 ) {
			this.toastr.errorToastr('Cerrar la fecha comercial: Requiere de al menos un archivo', 'Error!');
			return;
		}
		masterFuelCostDTO.bearers = this.newFiles;

		this.fuelCostService.changeStatus(masterFuelCostDTO).subscribe(data  => {
				console.log('echo');
			},
			errorData => {
				this.addBlock(2, '');
				this.toastr.errorToastr(errorData.error.message, 'Error!');
			},
			() => {
			});

		console.log('onBtnFinish');
	}
	addBlock(type, msg): void {
		this.eventService.sendApp(new EventMessage(1,
			new EventBlocked(type, msg)));
	}

	loadCatalog() {
		const names = ['SOURCE FUEL COST'];
		this.masterCatalogService.listCatalog(names).subscribe(data  => {
			this.loadSelect(this.comboFuente, data['SOURCE FUEL COST']);
		}, error => {});
	}
	loadSelect(selectCombo: Array<any>, catalog: Array<MaestroOpcionDTO>) {
		if (catalog !== null) {
			catalog.forEach((element: MaestroOpcionDTO) => {
				selectCombo.push({id: element.maestroOpcionId, label: element.opcion.codigo, maestroOpcionId: element.maestroOpcionId});
			});
			selectCombo.sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()));
		}
	}

// ********************************************* soportes ********************************
	btnDeleteFile(file: BearerDTO) {
		this.confirmationDialogService.confirm(
			'Confirmación',
			'¿Está seguro de eliminar el Archivo?'
		)
			.then((confirmed) => {
				if ( confirmed ) {
					this.files = this.files.filter(
						e => e !== file
					);
				}
				if (file.bearerId != null) {
					this.fuelCostService.deleteFile(file).subscribe(data  => {
							console.log('echo');
						},
						errorData => {
							this.addBlock(2, '');
							this.toastr.errorToastr(errorData.error.message, 'Error!');
						},
						() => {
						});
				}
			})
			.catch(() => {});
	}

	btnUploadFile() {
		if ( this.fileUploadForm.controls.file.value == null ) {
			return 0;
		}
		this.addBlock(1, 'Guardando archivo...');
		const value = this.fileUploadForm.value;
		const reader = new FileReader();
		reader.onloadend = (e) => {
			const fileBearer: BearerDTO = new BearerDTO();
			this.file = reader.result;
			this.file = this.file.replace(/^data:(.*;base64,)?/, '');
			this.file = this.file.trim();
			fileBearer.bearerData = this.file;
			fileBearer.bearerName = value.file.name;
			const splitName: string[] = fileBearer.bearerName.split('.');
			fileBearer.bearerContentType = this.getContentType(splitName[1]);
			this.files.push(fileBearer);
		}
		reader.readAsDataURL(value.file);

		timer(1000).subscribe(() => this.addBlock(2, ''));
		this.fileUploadForm.controls.file.setValue(null);
		this.appFileupload.clean();
	}
	getContentType(extencion) {
		let contentType = '';
		switch (extencion) {
			case'aac':
				contentType =  'audio/aac';
				break;
			case'abw':
				contentType =  'application/x-abiword';
				break;
			case'arc':
				contentType =  'application/octet-stream';
				break;
			case'avi':
				contentType =  'video/x-msvideo';
				break;
			case'azw':
				contentType =  'application/vnd.amazon.ebook';
				break;
			case'bin':
				contentType =  'application/octet-stream';
				break;
			case'bz':
				contentType =  'application/x-bzip';
				break;
			case'bz2':
				contentType =  'application/x-bzip2';
				break;
			case'csh':
				contentType =  'application/x-csh';
				break;
			case'css':
				contentType =  'text/css';
				break;
			case'csv':
				contentType =  'text/csv';
				break;
			case'doc':
				contentType =  'application/msword';
				break;
			case'epub':
				contentType =  'application/epub+zip';
				break;
			case'gif':
				contentType =  'image/gif';
				break;
			case'htm':
			case'html':
				contentType =  'text/html';
				break;
			case'ico':
				contentType =  'image/x-icon';
				break;
			case'ics':
				contentType =  'text/calendar';
				break;
			case'jar':
				contentType =  'application/java-archive';
				break;
			case'jpeg':
			case'jpg':
				contentType =  'image/jpeg';
				break;
			case'js':
				contentType =  'application/javascript';
				break;
			case'json':
				contentType =  'application/json';
				break;
			case'mid':
				contentType =  'audio/midi';
				break;
			case'mpeg':
				contentType =  'video/mpeg';
				break;
			case'mpkg':
				contentType =  'application/vnd.apple.installer+xml';
				break;
			case'odp':
				contentType =  'application/vnd.oasis.opendocument.presentation';
				break;
			case'ods':
				contentType =  'application/vnd.oasis.opendocument.spreadsheet';
				break;
			case'odt':
				contentType =  'application/vnd.oasis.opendocument.text';
				break;
			case'oga':
				contentType =  'audio/ogg';
				break;
			case'ogv':
				contentType =  'video/ogg';
				break;
			case'':
				contentType =  '';
				break;
			case'ogx':
				contentType =  '';
				break;
			case'':
				contentType =  'application/ogg';
				break;
			case'pdf':
				contentType =  'application/pdf';
				break;
			case'ppt':
				contentType =  'application/vnd.ms-powerpoint';
				break;
			case'rar':
				contentType =  'application/x-rar-compressed';
				break;
			case'rtf':
				contentType =  'application/rtf';
				break;
			case'sh':
				contentType =  'application/x-sh';
				break;
			case'svg':
				contentType =  'image/svg+xml';
				break;
			case'':
				contentType =  'swf';
				break;
			case'':
				contentType =  'application/x-shockwave-flash';
				break;
			case'tar':
				contentType =  'application/x-tar';
				break;
			case'tif':
			case'tiff':
				contentType =  'image/tiff';
				break;
			case'ttf':
				contentType =  'font/ttf';
				break;
			case'vsd':
				contentType =  'application/vnd.visio';
				break;
			case'wav':
				contentType =  'audio/x-wav';
				break;
			case'weba':
				contentType =  'audio/webm';
				break;
			case'webm':
				contentType =  'video/webm';
				break;
			case'webp':
				contentType =  'image/webp';
				break;
			case'woff':
				contentType =  'font/woff';
				break;
			case'woff2':
				contentType =  'font/woff2';
				break;
			case'xhtml':
				contentType =  'application/xhtml+xml';
				break;
			case'xls':
				contentType =  'application/vnd.ms-excel';
				break;
			case'xml':
				contentType =  'application/xml';
				break;
			case'xul':
				contentType =  'application/vnd.mozilla.xul+xml';
				break;
			case'zip':
				contentType =  'application/zip';
				break;
			case'gp':
				contentType =  'video/3gpp';
				break;
			case'3g2':
				contentType =  'video/3gpp2';
				break;
			case'7z':
				contentType =  'application/x-7z-compressed';
		}

		return contentType;
	}
	// ********************************************* fin de Soportes ********************************
}
