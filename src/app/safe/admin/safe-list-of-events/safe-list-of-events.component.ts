import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { EventBlocked } from 'src/app/core/models/EventBlocked';
import * as moment from 'moment';

@Component({
	selector: 'app-safe-list-of-events',
	templateUrl: './safe-list-of-events.component.html',
	styleUrls: ['./safe-list-of-events.component.scss']
})
export class SafeListOfEventsComponent implements OnInit {
	formQuery:FormGroup;
	dateToMin = new Date();
	//{ order: '', dateOpCom: '', process: '', user: '', dateUpdated: '', status: '' }
	tableData = [
		{
			id:'id',
			order:'1',
			fechaYHoraInicial:'Fecha y Hora Inicial',
			fechaYHoraFinal:'Fecha y Hora Final',
			clasificacionDeEventos:'Clasificacion de Eventos',
			eventos:'Eventos',
			combustible:'Combustible',
			otenciaMW:'Potencia (MW)',
			unidad:'Unidad',
			contratoImpactado:'Contrato Impactado',
			realCCDV:'Real/CCDV',
			bandaDeTolerancia:'Banda de Tolerancia',
			tipoDeMercado:'Tipo de Mercado',
			mWOfertados:'MW Ofertados',
			serviciosConexos:'Servicios Conexos',
			nLicencia:'#Licencia',
			equipo:'Equipo',
			cargaInicialMW:'Carga Inicial (MW)',
			cargaFinalMW:'Carga Final (MW)',
			perdidaPotenciaMW:'(-) Perdida Potencia (MW)',
			ordenDeTrabajo:'Orden de Trabajo',
			descripcionConceptoDeLaLicencia:'Descripcion / Concepto de la Licencia',
			nombreApellidosOperadorPlantaAbrio:'Nombre(s)/Apellidos(s) Operador Planta Abrio',
			nombreApellidosOperadorPlantaCerro:'Nombre(s)/Apellidos(s) Operador Planta Cerro',
			nombreApellidosOperadorCENACEAbrio:'Nombre(s)/Apellidos(s) Operador CENACE Abrio',
			nombreApellidosOperadorCENACECerro:'Nombre(s)/Apellidos(s) Operador CENACE Cerro',
			fuenteDelEvento:'Fuente del Evento',
			estatusDelEvento:'Estatus del Evento',
			estatusDeAprobacion:'Estatus de Aprobacion',
			observacionesComentarios:'Observaciones y/o comentarios',
			usuario:'Usuario',
			fechaYHoraDeUltimaModificacion:'Fecha y Hora d Ultima Modificacion',
			estatus:'Estatus'
		}

	];
	tablaColumnsLabels = [
		{key:'id'                                  ,label:'id'},
		{key:'order'                               ,label:'#'},
		{key:'fechaYHoraInicial'                   ,label:'Fecha y Hora Inicial'},
		{key:'fechaYHoraFinal'                     ,label:'Fecha y Hora Final'},
		{key:'clasificacionDeEventos'              ,label:'Clasificacion de Eventos'},
		{key:'eventos'                             ,label:'Eventos'},
		{key:'combustible'                         ,label:'Combustible'},
		{key:'otenciaMW'                           ,label:'Potencia (MW)'},
		{key:'unidad'                              ,label:'Unidad'},
		{key:'contratoImpactado'                   ,label:'Contrato Impactado'},
		{key:'realCCDV'                            ,label:'Real/CCDV'},
		{key:'bandaDeTolerancia'                   ,label:'Banda de Tolerancia'},
		{key:'tipoDeMercado'                       ,label:'Tipo de Mercado'},
		{key:'mWOfertados'                         ,label:'MW Ofertados'},
		{key:'serviciosConexos'                    ,label:'Servicios Conexos'},
		{key:'nLicencia'                           ,label:'#Licencia'},
		{key:'equipo'                              ,label:'Equipo'},
		{key:'cargaInicialMW'                      ,label:'Carga Inicial (MW)'},
		{key:'cargaFinalMW'                        ,label:'Carga Final (MW)'},
		{key:'perdidaPotenciaMW'                   ,label:'(-) Perdida Potencia (MW)'},
		{key:'ordenDeTrabajo'                      ,label:'Orden de Trabajo'},
		{key:'descripcionConceptoDeLaLicencia'     ,label:'Descripcion / Concepto de la Licencia'},
		{key:'nombreApellidosOperadorPlantaAbrio'  ,label:'Nombre(s)/Apellidos(s) Operador Planta Abrio'},
		{key:'nombreApellidosOperadorPlantaCerro'  ,label:'Nombre(s)/Apellidos(s) Operador Planta Cerro'},
		{key:'nombreApellidosOperadorCENACEAbrio'  ,label:'Nombre(s)/Apellidos(s) Operador CENACE Abrio'},
		{key:'nombreApellidosOperadorCENACECerro'  ,label:'Nombre(s)/Apellidos(s) Operador CENACE Cerro'},
		{key:'fuenteDelEvento'                     ,label:'Fuente del Evento'},
		{key:'estatusDelEvento'                    ,label:'Estatus del Evento'},
		{key:'estatusDeAprobacion'                 ,label:'Estatus de Aprobacion'},
		{key:'observacionesComentarios'            ,label:'Observaciones y/o comentarios'},
		{key:'usuario'                             ,label:'Usuario'},
		{key:'fechaYHoraDeUltimaModificacion'      ,label:'Fecha y Hora de Ultima Modificacion'},
		{key:'estatus'                             ,label:'Estatus'}
	
	];
	tableColumnsDisplay: string[] = [
		'order',
		'fechaYHoraInicial',
		'fechaYHoraFinal',
		'clasificacionDeEventos',
		'eventos',
		'combustible',
		'otenciaMW',
		'unidad',
		'contratoImpactado',
		'realCCDV',
		'bandaDeTolerancia',
		'tipoDeMercado',
		'mWOfertados',
		'serviciosConexos',
		'nLicencia',
		'equipo',
		'cargaInicialMW',
		'cargaFinalMW',
		'perdidaPotenciaMW',
		'ordenDeTrabajo',
		'descripcionConceptoDeLaLicencia',
		'nombreApellidosOperadorPlantaAbrio',
		'nombreApellidosOperadorPlantaCerro',
		'nombreApellidosOperadorCENACEAbrio',
		'nombreApellidosOperadorCENACECerro',
		'fuenteDelEvento',
		'estatusDelEvento',
		'estatusDeAprobacion',
		'observacionesComentarios',
		'usuario',
		'fechaYHoraDeUltimaModificacion',
		'estatus',
		'sys_see',
		'sys_edit',
		'sys_delete'
	];
	tableRowXpage = [5, 10, 20, 50, 100, 250, 500];

	constructor(
		private formBuilder: FormBuilder,
		public toastr: ToastrManager,
		public eventService: EventService
	) { }

	ngOnInit() {
		this.formQuery = this.formBuilder.group({
			from:[{ value: moment(), disabled: false }, Validators.required],
			to:[{ value: moment(), disabled: false }, Validators.required],
		});
	}
	onDateFromChange(){
		this.dateToMin = new Date(this.formQuery.get('from').value);
	}
	onFormQuerySubmit(o){
		console.log(moment(this.formQuery.get('from').value));
		
		console.log(o);
		
	}
	onbtnAddEvent(){
		console.log("onbtnAddEvent");
		const type = {
            dto: null,
            action: 'nuevo',
			name: '',
			element:{tester:"tester"}
        };
        this.eventService.sendChangePage(
            new EventMessage(null, type, 'Safe.SafeRegistrationOfEventsComponent')
        );
	}
	
	onTableRowSee(element){
		const type = {
            dto: null,
            action: 'ver',
			name: '',
			element
		};
        this.eventService.sendChangePage(
            new EventMessage(null, type, 'Safe.SafeRegistrationOfEventsComponent')
        );
	}
	onTableRowEdit(element){
		const type = {
            dto: null,
            action: 'editar',
			name: '',
			element
		};
        this.eventService.sendChangePage(
            new EventMessage(null, type, 'Safe.SafeRegistrationOfEventsComponent')
        );
	}
	onTableRowDelete(element){
		console.log(element);
		
	}
	addBlock(type, msg): void {
		this.eventService.sendApp(new EventMessage(1,
			new EventBlocked(type, msg)));
	}
}
