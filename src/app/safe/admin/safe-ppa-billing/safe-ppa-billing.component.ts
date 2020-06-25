import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation-dialog.service';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { EventService } from 'src/app/core/services/event.service';
import * as moment from 'moment';
import { IdLabel } from 'src/app/core/models/IdLabel';
@Component({
	selector: 'app-safe-ppa-billing',
	templateUrl: './safe-ppa-billing.component.html',
	styleUrls: ['./safe-ppa-billing.component.scss']
})
export class SafePpaBillingComponent implements OnInit {
	formFilter:FormGroup;
	tableBillingData = [
		{
			order : '1',fechaOp : 'may.-20',fechaEmision : '06/06/2020',fechaEntrega : '06/07/2020',fechaCancelacion : '06/07/2020',concepto : 'PCFC',tipoFactura : 'Operación Comercial',facturaNcNd : 'Factura',folio : 'F300',uUID : 'RETTD-097999-OUI',totalSinIVA : '100',moneda : 'USD',estatus : '',usuario : '',fechaHoraUltimaModificacion : '',generarPrefactura : '',timbrar : '',cancelar : '',
		},
		{
			order : '2',fechaOp : 'may.-20',fechaEmision : '06/06/2020',fechaEntrega : '06/07/2020',fechaCancelacion : '06/07/2020',concepto : 'PCC',tipoFactura : 'Ajuste INPP',facturaNcNd : 'Nota de crédito',folio : 'NC200',uUID : 'RETTD-097999-OUI',totalSinIVA : '100',moneda : 'MXN',estatus : '',usuario : '',fechaHoraUltimaModificacion : '',generarPrefactura : '',timbrar : '',cancelar : '',
		},
		{
			order : '3',
			fechaOp : 'may.-20',
			fechaEmision : '06/06/2020',
			fechaEntrega : '06/07/2020',
			fechaCancelacion : '06/07/2020',
			concepto : 'PCVOM',
			tipoFactura : 'Ajuste Conciliacion',
			facturaNcNd : 'Nota de debito',
			folio : 'ND987',
			uUID : 'RETTD-097999-OUI',
			totalSinIVA : '100',
			moneda : 'MXN',
			estatus : '',
			usuario : '',
			fechaHoraUltimaModificacion : '',
			generarPrefactura : '',
			timbrar : '',
			cancelar : '',
		}
	];


	tableBillingColumnsLabels = [
		{ key: 'order'                        ,label:'#'},
		{ key: 'fechaOp'                      ,label:'Fecha de Operación Comercial'},
		{ key: 'fechaEmision'                 ,label:'Fecha de Emisión'},
		{ key: 'fechaEntrega'                 ,label:'Fecha de Entrega'},
		{ key: 'fechaCancelacion'             ,label:'Fecha de Cancelacion'},
		{ key: 'concepto'                     ,label:'Concepto'},
		{ key: 'tipoFactura'                  ,label:'Tipo de Factura'},
		{ key: 'facturaNcNd'                  ,label:'Factura/NC/ND'},
		{ key: 'folio'                        ,label:'FOLIO'},
		{ key: 'uUID'                         ,label:'UUID'},
		{ key: 'totalSinIVA'                  ,label:'Total Sin IVA'},
		{ key: 'moneda'                       ,label:'Moneda'},
		{ key: 'estatus'                      ,label:'ESTATUS'},
		{ key: 'usuario'                      ,label:'Usuario'},
		{ key: 'fechaHoraUltimaModificacion'  ,label:'Fecha Y hora de Ultima Modificacion'},
		{ key: 'generarPrefactura'            ,label:'Generar prefactura'},
		{ key: 'timbrar'                      ,label:'Timbrar'},
		{ key: 'cancelar'                     ,label:'Cancelar'}
	];
	tableBillingColumnsDisplay: string[] = [
		'order',
		'fechaOp',
		'fechaEmision',
		'fechaEntrega',
		'fechaCancelacion',
		'concepto',
		'tipoFactura',
		'facturaNcNd',
		'folio',
		'uUID',
		'totalSinIVA',
		'moneda',
		'estatus',
		'usuario',
		'fechaHoraUltimaModificacion',
		'generarPrefactura',
		'timbrar',
		'cancelar',
		'sys_generateInvoice',
		'sys_stamp',
		'sys_cancel',
		'sys_see',
		'sys_edit'
	];
	tableRow_x_page = [5,10,20,50, 100, 250, 500];

	optionsSearchCondition:IdLabel[] = [{id:1,label:'Todos'},{id:2,label:'Al menos uno'}];
	optionsConcepto:IdLabel[] = [];
	optionsTipoFactura:IdLabel[] = [];
	optionsFacturaNcNd:IdLabel[] = [];
	optionsMoneda:IdLabel[] = [];
	optionsEstatus:IdLabel[] = [];
	constructor(
		private formBuilder: FormBuilder,
		private confirmationDialogService: ConfirmationDialogService,
		public globalService: GlobalService,
		public toastr: ToastrManager,
		public eventService: EventService,
	) { }

	ngOnInit() {
		this.formFilter = this.formBuilder.group({
			ffechaOp: new FormControl(moment(), Validators.required),
			ffechaEmisionDe:['',null],
			ffechaEmisionAl:['',null],
			ffechaEntregaDe:['',null],
			ffechaEntregaAl:['',null],
			ffechaCancelacionDe:['',null],
			ffechaCancelacionAl:['',null],
			fconcepto:['',null],
			ftipoFactura:['',null],
			ffacturaNcNd:['',null],
			ffolio:['',null],
			fuUID:['',null],
			ftotalSinIVA:['',null],
			fmoneda:['',null],
			festatus:['',null],
			fusuario:['',null],
			ffechaHoraUltimaModificacionDe:['',null],
			ffechaHoraUltimaModificacionAl:['',null],
			fSearchCondition: ['', null]
		});
	}
	
	onSubmitFilter(v){
		console.log(v);
	}
	onTableRowEdit(v){
		console.log(v);
	}
	onTableRowSee(v){
		console.log(v);
	}
	onTableRowGenerateInvoice(v){
		console.log(v);
	}
	onTableRowStamp(v){
		console.log(v);
	}
	onTableRowCancel(v){
		console.log(v);
	}
}
