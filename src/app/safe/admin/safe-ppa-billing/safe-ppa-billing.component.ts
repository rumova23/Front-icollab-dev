import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation-dialog.service';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { EventService } from 'src/app/core/services/event.service';
import * as moment from 'moment';
import { IdLabel } from 'src/app/core/models/IdLabel';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { timer } from 'rxjs';
import { EventBlocked } from 'src/app/core/models/EventBlocked';
@Component({
	selector: 'app-safe-ppa-billing',
	templateUrl: './safe-ppa-billing.component.html',
	styleUrls: ['./safe-ppa-billing.component.scss']
})
export class SafePpaBillingComponent implements OnInit {
	formFilter:FormGroup;
	tableBillingData = [];


	tableBillingColumnsLabels = [
		{ key: 'order'                        ,label:'#'},
		{ key: 'fechaOp'                      ,label:'Fecha de Operación Comercial'},
		{ key: 'fechaEmision'                 ,label:'Fecha de Emisión'},
		{ key: 'fechaEntrega'                 ,label:'Fecha de Entrega'},
		{ key: 'fechaCancelacion'             ,label:'Fecha de Cancelacion'},
		{ key: 'concepto'                     ,label:'Concepto'},
		{ key: 'typeDocument'                 ,label:'Tipo de Documento'},
		{ key: 'document'                     ,label:'Documento'},
		{ key: 'folio'                        ,label:'FOLIO'},
		{ key: 'uUID'                         ,label:'UUID'},
		{ key: 'subtotal'                     ,label:'Subtotal'},
		{ key: 'iva'                          ,label:'IVA'},
		{ key: 'total'                        ,label:'Total'},
		{ key: 'moneda'                       ,label:'Moneda'},
		{ key: 'estatus'                      ,label:'ESTATUS'},
		{ key: 'usuario'                      ,label:'Usuario'},
		{ key: 'fechaHoraUltimaModificacion'  ,label:'Fecha Y hora de Ultima Modificacion'  ,dateFormat:'dd/MM/yyyy'},
		{ key: 'generarPrefactura'            ,label:'Generar prefactura'                   ,typeLink:{matIcon:'touch_app'}},
		{ key: 'timbrar'                      ,label:'Timbrar'                              ,typeLink:{matIcon:'touch_app'}},
		{ key: 'cancelar'                     ,label:'Cancelar'                             ,typeLink:{matIcon:'touch_app'}},
	];
	tableBillingColumnsDisplay: string[] = [
		'order',
		'fechaOp',
		'fechaEmision',
		'fechaEntrega',
		'fechaCancelacion',
		'concepto',
		'typeDocument',
		'document',
		'folio',
		'uUID',
		'subtotal',
		'iva',
		'total',
		'moneda',
		'estatus',
		'usuario',
		'fechaHoraUltimaModificacion',
		'generarPrefactura',
		'timbrar',
		'cancelar',
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
	optionsDocuments:IdLabel[] = [];
	optionsTypeDocument:IdLabel[] = [];
	constructor(
		private formBuilder: FormBuilder,
		private confirmationDialogService: ConfirmationDialogService,
		public globalService: GlobalService,
		public toastr: ToastrManager,
		public eventService: EventService,
	) { }

	ngOnInit() {
		this.addBlock(1, '');
		timer(2000).subscribe(()=>{
			this.tableBillingData = [
				{
					order : '1',fechaOp : 'may.-20',fechaEmision : '06/06/2020',fechaEntrega : '06/07/2020',fechaCancelacion : '06/07/2020',concepto : 'PCFC',typeDocument : 'Operación Comercial',folio : 'F300',uUID : 'RETTD-097999-OUI',subtotal : '100',iva:'',total:'',moneda : 'USD',estatus : '',usuario : '',fechaHoraUltimaModificacion : new Date('2020/02/02'),document:''
				},
				{
					order : '2',fechaOp : 'may.-20',fechaEmision : '06/06/2020',fechaEntrega : '06/07/2020',fechaCancelacion : '06/07/2020',concepto : 'PCC',typeDocument : 'Ajuste INPP',folio : 'NC200',uUID : 'RETTD-097999-OUI',subtotal : '100',iva:'',total:'',moneda : 'MXN',estatus : '',usuario : '',fechaHoraUltimaModificacion : new Date('2020/03/03'),document:''
				},
				{
					order : '3',
					fechaOp : 'may.-20',
					fechaEmision : '06/06/2020',
					fechaEntrega : '06/07/2020',
					fechaCancelacion : '06/07/2020',
					concepto : 'PCVOM',
					typeDocument : 'Ajuste Conciliacion',
					folio : 'ND987',
					uUID : 'RETTD-097999-OUI',
					subtotal : '100',
					iva:'',
					total:'',
					moneda : 'MXN',
					estatus : '',
					usuario : '',
					fechaHoraUltimaModificacion : new Date('2020/01/01'),
					document:''
				}
			];
			this.addBlock(2, '');
		});
		this.formFilter = this.formBuilder.group({
			ffechaOp: new FormControl(moment(), Validators.required),
			ffechaEmisionDe:['',null],
			ffechaEmisionAl:['',null],
			ffechaEntregaDe:['',null],
			ffechaEntregaAl:['',null],
			ffechaCancelacionDe:['',null],
			ffechaCancelacionAl:['',null],
			fconcepto:['',null],
			ftypeDocument:['',null],
			ffacturaNcNd:['',null],
			fdocument:['',null],
			ffolio:['',null],
			fuUID:['',null],
			fsubtotal:['',null],
			fiva:['',null],
			ftotal:['',null],
			fmoneda:['',null],
			festatus:['',null],
			fusuario:['',null],
			ffechaHoraUltimaModificacionDe:['',null],
			ffechaHoraUltimaModificacionAl:['',null],
			fSearchCondition: ['', null]
		});
	}
	onaddBilling(){
		let type = {
			id: null,
			action: 'nuevo',
			name: ""
		};
		this.eventService.sendChangePage(
            new EventMessage(null, type, 'Safe.SafePpaBillingAbcComponent')
        );
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
	onTableRowLink(v){
		console.log(v);
	}

	addBlock(type, msg): void {
		this.eventService.sendApp(new EventMessage(1,
			new EventBlocked(type, msg)));
	}
}
