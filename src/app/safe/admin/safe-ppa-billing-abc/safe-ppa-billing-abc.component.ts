import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConfirmationDialogService } from 'src/app/core/services/confirmation-dialog.service';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { EventService } from 'src/app/core/services/event.service';
import moment from 'moment';
import { IdLabel } from 'src/app/core/models/IdLabel';

@Component({
	selector: 'app-safe-ppa-billing-abc',
	templateUrl: './safe-ppa-billing-abc.component.html',
	styleUrls: ['./safe-ppa-billing-abc.component.scss']
})
export class SafePpaBillingAbcComponent implements OnInit {
	hours   : IdLabel[] =  new Array(24).fill(0).map((_valor, indice) => ({id: (indice < 10 ? '0' : '') + indice, label: (indice < 10 ? '0' : '') + indice}));
	minutes : IdLabel[] =  new Array(60).fill(0).map((_valor, indice) => ({id: (indice < 10 ? '0' : '') + indice, label: (indice < 10 ? '0' : '') + indice}));

	form:FormGroup;
	formTimedateissue:FormGroup;
	formTimeDateCertification:FormGroup;
	formServices:FormGroup;
	formUuid:FormGroup;
	formUuid2:FormGroup;
	lstDocuments : IdLabel[] = [
		{id:"1",label:'Factura'},
		{id:"2",label:'Nota de Crédito'},
		{id:"3",label:'Nota de Débito'}
	];
	lstStatus : IdLabel[] = [
		{id:"1",label:'Option'},
	];
	lstTypeDocuments : IdLabel[] = [
		{id:"1",label:'Option'},
	];
	lstConcept : IdLabel[] = [
		{id:"1",label:'Option'},
	];
	lstClients : IdLabel[] = [
		{id:"1",label:'CFE'},
	];
	lstCoin : IdLabel[] = [
		{id:"1",label:'Option'},
	];
	lstUseCFDI : IdLabel[] = [
		{id:"1",label:'Option'},
	];
	lstPaymentMethod : IdLabel[] = [
		{id:"1",label:'Option'},
	];
	lstWayToPay : IdLabel[] = [
		{id:"1",label:'Option'},
	];
	lstTypeRelationship : IdLabel[] = [
		{id:"1",label:'Option'},
	];
	lstRelatedDocumentType : IdLabel[] = [
		{id:"1",label:'Option'},
	];
	lstServices : IdLabel[] = [
		{id:"1",label:'Option'},
	];

	tableRelated = [
		{
			order : '3',
			documentType:'',
			invoice:'',
			uuid:'',
		}
	];
	
	tableRelatedColumnsLabels = [
		{ key: 'order'                ,label:'#'},
		{ key: 'documentType'         ,label:'Tipo de Documento'},
		{ key: 'invoice'              ,label:'Folio'},
		{ key: 'uuid'                 ,label:'UUID'}
	];
	tableRelatedColumnsDisplay: string[] = [
		'order',
		'documentType',
		'invoice',
		'uuid',
		'sys_edit',
		'sys_delete'
	];
	tableServices = [
		{
			order: '',
			service: '',
			quantity: '',
			unitPrice: '',
			discount: '',
			discountV: '',
			amount: '',
			iva: '',
			ivaV: '',
			observations: '',
		}
	];
	tableServicesColumnsLabels = [
		{ key: 'order'         ,label:'#'},
		{ key: 'service'       ,label:'Servicio'},
		{ key: 'quantity'      ,label:'Cantidad'},
		{ key: 'unitPrice'     ,label:'Precio Unitario'},
		{ key: 'discount'      ,label:'% Descuento'},
		{ key: 'discountV'     ,label:'$ Descuento'},
		{ key: 'amount'        ,label:'Importe'},
		{ key: 'iva'           ,label:'IVA %'},
		{ key: 'ivaV'          ,label:'IVA $'},
		{ key: 'observations'  ,label:'Observaciones'},
	];
	tableServicesColumnsDisplay: string[] = [
		'order',
		'service',
		'quantity',
		'unitPrice',
		'discount',
		'discountV',
		'amount',
		'iva',
		'ivaV',
		'observations',
		'sys_edit',
		'sys_delete'
	];
	tableRowXpage = [5,10,20,50, 100, 250, 500];

	constructor(
		private formBuilder: FormBuilder,
		private confirmationDialogService: ConfirmationDialogService,
		public globalService: GlobalService,
		public toastr: ToastrManager,
		public eventService: EventService,
	) { }

	ngOnInit() {
		this.formTimedateissue = this.formBuilder.group({
			ha: [{ value: null, disabled: false }, Validators.required],
			ma: [{ value: null, disabled: false }, Validators.required],
		});
		this.formTimeDateCertification = this.formBuilder.group({
			ha: [{ value: null, disabled: false }, Validators.required],
			ma: [{ value: null, disabled: false }, Validators.required],
		});
		this.formServices = this.formBuilder.group({
			fservice: [null,null],
			fquantity: [null,null],
			funitPrice: [null,null],
			fdiscount: [null,null],
			fdiscountV: [null,null],
			fiva: [null,null],
			famount: [null,null],
			fObservations: [null,null],
		});
		this.formUuid = this.formBuilder.group({
			fDocumentType: [null,null],
			fInvoice: [null,null],
			fuuid: [null,null],
		});
		this.formUuid2 = this.formBuilder.group({
			fUserCreo: [null,null],
			fUserTimbro: [null,null],
			fUserCancelo: [null,null],
			fdateCancellation: [null,null],
		});
		this.form = this.formBuilder.group({
			ffechaOp: [null,null],
			fdocument:[null,null],
			fbillingncnd:[null,null],
			fInvoice:[null,null],
			fdateissue:[null,null],
			fdateCertification:[null,null],
			fuuid:[null,null],
			fstatus:[null,null],
			ftypesdocuments:[null,null],
			fconcept:[null,null],

			fclient:[null,null],
			fcoin:[null,null],
			fexchangerate:[null,null],
			fusecfdi:[null,null],
			fPaymentmethod:[null,null],
			fWaytopay:[null,null],
			fBill:[null,null],
			fSATconfirmation:[null,null],
			fTypeRelationship:[null,null],
			fPaymentConditions:[null,null],
			fObservations:[null,null],

			ffechaOpCommercialTerms:[null,null],
			ffechaDeliveryCommercialTerms:[null,null],
			ffechaPaymentCommercialTerms:[null,null],

			fDiscount:[null,null],
			fSubtotal:[null,null],
			fRetention:[null,null],
			fiva:[null,null],
			tTotal:[null,null],
		});
	}
	onSubmit(v){
		console.log(v);
	}
	changeDocument(v){
		console.log(v);
		
	}
	onTableRelatedRowEdit(e){
		console.log(e);
	}
	onTableRelatedRowDelete(e){
		console.log(e);
	}
	onTableServicesRowEdit(e){
		console.log(e);
	}
	onTableServicesRowDelete(e){
		console.log(e);
	}
	onFormUuidAdd(){
		console.log("onFormUuidAdd");
	}
	onFormUuidCancel(){
		console.log("onFormUuidCancel");
	}
	onFormServiceAdd(){
		console.log("onFormServiceAdd");
	}
	onFormServiceCancel(){
		console.log("onFormServiceCancel");
	}
}
