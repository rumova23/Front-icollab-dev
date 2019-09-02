import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { environment } from  'src/environments/environment';
import { MonitoringPhase3Service }   from '../../services/monitoringPhase3.service';
import { EventService } from 'src/app/core/services/event.service';

import { ActivatedRoute } from '@angular/router';

import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { interval, Subscription, Observable, timer } from 'rxjs';
import { Chart } from 'chart.js';
import { GlobalService } from 'src/app/core/globals/global.service';

import { SecurityService } from 'src/app/core/services/security.service';
import { Validate } from 'src/app/core/helpers/util.validator.';
import { SocketService } from 'src/app/core/services/socket.service';
import { EventSocket } from 'src/app/core/models/EventSocket';




import * as M3 from './config';
import { DateAdapter } from 'angular-calendar';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { ThemeService } from 'src/app/core/globals/theme';

@Component({
  selector: 'app-monitoringPhase3',
  templateUrl: './monitoringPhase3.component.html',
  styleUrls: ['./monitoringPhase3.component.css'],
})
export class MonitoringPhase3Component implements OnInit, OnDestroy {
  private subscriptions : Subscription[] = [];
  private everySecond   : Observable<number>;
  private timeRequest   : Observable<number>;
  
  dev_view_lstTags = [];
  isdemo      = false;
  calltags    = [];
  chart_01    : Chart;
  chart_modal : Chart;
  chart_rt    : Chart;
  chart_rpm   : Chart;
  chart_mw    : Chart;
  chart_rt_t1 : Chart;

  dataset_main = [];
  yAxes_main   = [];

  dataset_modal = [];
  yAxes_modal   = [];


  wifi        = false;

  showModal_lst_tags = false;

  showModal   = false;
  titleModal  = "";
  
  showDropdownchart_01 = false;
  myinterval = null;
  time_on_request : number = 3;//4000;
  data_per_graph_main = 10;
  type_graph_main = 'line';
  dynamic_scale = 'static';


  cadaIntervalo : number = 1000;//4000;
  fechaActual   : any;




    
	
  chart_config_1 = {
    type: 'line'
    ,data: {
      labels: new Array(this.data_per_graph_main)
      //labels: ["miguel","Erika"]
      ,datasets: []
    }
    ,options: {
      responsive: true,
//      aspectRatio:3,
      maintainAspectRatio: false,
      legend: {display: false,labels:{fontColor: 'red',fontSize:26}}
      ,scales: {
        xAxes: [{
          display: false,
          ticks:{
            fontColor:"orange"
          }
        }]
        ,yAxes: [{
            type: 'linear', 
            display: false,
            position: 'left',
            id: 'my887896',
            ticks:{
              min: 0,
              max: 1,
              beginAtZero: false  
            },
          }
        ],
      }
    }
  };
  chart_modal_config = {
    type: 'horizontalBar'
    
    ,data: {
      labels: ['RPM']
      ,datasets: [
      ]
    }
    ,options: {
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        rectangle: {
          borderWidth: 2,
        }
      },
      legend: {
        display: false
      }
      ,scales: {
        xAxes: [{
          gridLines:{
            color:"rgba(0,255,0,1)",
          },
          ticks:{
            fontColor:'#fff',
            fontSize:12
          }
        }]
        ,yAxes: [{
        
            gridLines:{
              color:"rgba(0,255,0,1)",
              display: false,
            },
            ticks:{
              fontColor:'#fff',
              fontSize:12
            }
          }
        ],
      }
    }
  };
  
    /* No estan en la vista */

  constructor(
	public globalService        : GlobalService
	,public theme               : ThemeService
    ,private wsPI               : MonitoringPhase3Service
    ,private modalService       : NgbModal
    ,private activatedRoute     : ActivatedRoute
    ,private securityService    : SecurityService
    ,private socketService      : SocketService
    ,private eventService       : EventService
    ) {
		
		
		for (const calltag in M3.lstTags) {
			if (M3.lstTags.hasOwnProperty(calltag)) {
			this.dev_view_lstTags.push(M3.lstTags[calltag]);
			}
		}
		
			
    }

	ngOnInit() {
		//idiomas disponibles
		/*this.translate.addLangs(["es", "en", "ja"]);
		this.translate.setDefaultLang('es');
		this.translate.use('es');//*/

		this.initializeAt0();
		this.chartInit();


		this.subscribeFechaYHora()
		this.subscrubeChangeGraphUpdateTimeRest();
		this.subscribeSocketOnStatus();
		this.subscribeSocket();
	/*
		var data = {
		labels: ["Success", "Error"],
		datasets: [
			{
				data: [50,10],
				backgroundColor: ["red", "#ccc"],
				borderWidth: 0
			}
		]
		};
		
		var myChart = new Chart('mychart', {
			type: 'doughnut',
			data: data,
			options: {
				cutoutPercentage: 80,
				rotation: .8 * Math.PI, 
				circumference: 1.4 * Math.PI,
				maintainAspectRatio: true,
				responsive: true,
				legend: {
					display: false
				},
				animation: {
					animateScale: true,
					animateRotate: true
				},
			},
			plugins: [{
				beforeDraw: function(chart) {
					const width = chart.width;
					const height = chart.height;
					const ctx = chart.ctx;
					ctx.restore();
					const fontSize = (height / 114).toFixed(2);
					ctx.font = fontSize + "em sans-serif";
					ctx.textBaseline = 'middle';
					var total = data.datasets[0].data.reduce(function(previousValue, currentValue, currentIndex, array) {
						return previousValue + currentValue;
					});
					var text = total+"";
					
					//const textX = Math.round((width - this.chart.ctx.measureText(text).width) / 2),
					const textX = Math.round((width - ctx.measureText(text).width) / 2);
					const textY = height/2.5;

					var gradient = ctx.createLinearGradient(0, 0, 80, 0);
					gradient.addColorStop(0,"magenta");
					gradient.addColorStop(0.5, "blue");
					gradient.addColorStop(1.0, "red");
					// Fill with gradient
					ctx.fillStyle = gradient;


					ctx.fillText(text, textX, textY);
					ctx.save();
				}
			}]
		});//*/
	}
	ngOnDestroy(){
		for (const iterator in this.subscriptions) {
			this.subscriptions[iterator].unsubscribe();
		}
		this.unsubscribeSocket();
	}
	initializeAt0(){
		for (const calltag in M3.lstTags) {
			if (M3.lstTags.hasOwnProperty(calltag)) {
			this.calltags[calltag] = 0;
			}
		}
	}
	chartInit(){
		this.chart_01    = new Chart('canvas1'     , this.chart_config_1);
		this.chart_rt    = new Chart('chart_rt'    , M3.chart_config_rt);
		this.chart_rpm   = new Chart('chart_rpm'   , M3.chart_config_rpm);
		this.chart_mw    = new Chart('chart_mw'    , M3.chart_config_mw);
		this.chart_rt_t1 = new Chart('chart_rt_t1' , M3.chart_config_rt_t1);
		//this.chart_modal = new Chart('canvas_modal',this.chart_modal_config);
	}
	subscribeFechaYHora(){
		this.everySecond = timer(0,1000);
		this.subscriptions['everySecond']=this.everySecond.subscribe(()=>{
			this.fechaActual = new Date();
		});
	}
	subscrubeChangeGraphUpdateTimeRest(){
		if(this.subscriptions['timeRequest'] != undefined){
			this.subscriptions['timeRequest'].unsubscribe();
		}
		this.timeRequest = timer(0,this.time_on_request*1000);
		this.subscriptions['timeRequest']=this.timeRequest.subscribe(()=>this.TraerDatosDesdePiWebAPI());
	}
	subscribeSocketOnStatus(){
		this.subscriptions['onChangeSocketConnect'] = this.eventService.onChangeSocketConnect.subscribe({
			next: (event: EventMessage) => {
				if(event.id === 0){
          this.unsubscribeSocket();
          /**
           * iniciar proceso de peticion REST
           */
				}else if(event.id === 1){
          /**
           * terminar proceso de peticion REST
           */
					this.subscribeSocket();
				}
			}
		});
	}
	subscribeSocket(){
		if(this.globalService.socketConnect){
			let channelBackPiIsRun = this.socketService.suscribeChannel("back-pi-isrun");

			this.subscriptions['back-pi-isrun'] = this.socketService.onChannelWatch(channelBackPiIsRun-1)
				.subscribe((data:any)=>{
					console.log("back-pi-isrun::",data);
				});
			this.subscriptions['back-pi-isrun-error'] = this.socketService.onChannelError(channelBackPiIsRun-1)
				.subscribe((errorChannel:any)=>{
					console.log("back-pi-isrun-isrun::",errorChannel);
				});
			if(this.globalService.plant.name === "AGUILA"){
				let channelPiAguila = this.socketService.suscribeChannel("pi-aguila");
				this.subscriptions['pi-aguila-error'] = this.socketService.onChannelError(channelPiAguila - 1)
				.subscribe((errorChannel: any) => {console.log("pi-aguila-error",errorChannel);});

				this.subscriptions['pi-aguila'] = this.socketService.onChannelWatch(channelPiAguila - 1)
				.subscribe((data: any) => {
					console.log("channelPiAguila::",data);
					this.dataAdapter(data);
				});
			}else if(this.globalService.plant.name === "SOL"){
				let channelPiSol = this.socketService.suscribeChannel("pi-sol");
				this.subscriptions['pi-sol-error'] = this.socketService.onChannelError(channelPiSol - 1)
				.subscribe((errorChannel: any) => {console.log("pi-sol-error",errorChannel);});

				this.subscriptions['pi-sol'] = this.socketService.onChannelWatch(channelPiSol - 1)
				.subscribe((data: any) => {
					console.log(data);
					this.dataAdapter(data);
				});
			}
		}
	}
	unsubscribeSocket(){
		[    'pi-aguila','pi-aguila-error'
			,'pi-sol','pi-sol-error'
			,'back-pi-isrun','back-pi-isrun-error'
		].forEach(event=>{
			if(this.subscriptions[event] != undefined && this.subscriptions[event].isStopped==false){
				this.subscriptions[event].unsubscribe();
			}
		});
		this.socketService.removeChannel("pi-aguila");
		this.socketService.removeChannel("pi-sol");
		this.socketService.removeChannel("back-pi-isrun");
	}
	TraerDatosDesdePiWebAPI(){
		/*
		for (const calltag in M3.lstTags) {
			if (M3.lstTags.hasOwnProperty(calltag)) {
				const tagconf  = M3.lstTags[calltag];
				const webID    = (this.globalService.aguila)?tagconf.webId_EAT:tagconf.webId_EST;
				this.peticion(calltag,tagconf,webID);
			}
		}
		//*/
  
	  
		console.log(">>>>>>>  TraerDatosDesdePiWebAPI");
		
		///*
		if( !this.globalService.socketConnect ){
			if(this.globalService.plant.name === "AGUILA"){
				this.wsPI.getTagsAguila().subscribe(data=>{
					this.dataAdapter(JSON.parse(data));
				},err=>{});
			}else if(this.globalService.plant.name === "SOL"){
				this.wsPI.getTagsSol().subscribe(data=>{
					this.dataAdapter(JSON.parse(data));
				},err=>{});
			}
		}
  		//*/
	}
	dataAdapter(data){
		for (const calltag in M3.lstTags) {
		  if (M3.lstTags.hasOwnProperty(calltag)) {
			let mydata = null;
	
			const tagconf  = M3.lstTags[calltag];
			const webID    = (this.globalService.plant.name === "AGUILA")?tagconf.webId_EAT:tagconf.webId_EST;
			//this.peticion(calltag,tagconf,webID);
			
			for(const tag of data.tags.Items){
			  if(tag.WebId == webID){
				mydata = tag;
				break;
			  }
			}
			if(mydata != null){
	
			  let datoprocesado = null;
			  if(tagconf.typadata == 'float')     datoprocesado = parseFloat(mydata.Value.Value);
			  else if(tagconf.typadata == 'int')  datoprocesado = parseInt(mydata.Value.Value);
			  
			  this.calltags[tagconf.calltags]          = datoprocesado;
			  
			  this.addDataset(tagconf,tagconf.calltags,datoprocesado);
			  this.addDatasetRT ( tagconf, tagconf.calltags, this.calltags[tagconf.calltags],['getCTUnoRT','getCTDosRT','getTVRT'],'chart_rt');
			  this.addDatasetRT ( tagconf, tagconf.calltags, this.calltags[tagconf.calltags],['getCTUnoRPM','getCTDosRPM','getTVRPM'],'chart_rpm');
			  this.addDatasetRT ( tagconf, tagconf.calltags, this.calltags[tagconf.calltags],['getCTUnoMW','getCTDosMW','getTVMW'],'chart_mw');
			  this.addDatasetLine ( tagconf, tagconf.calltags, this.calltags[tagconf.calltags],['getCTUnoRT','getCTDosRT','getTVRT'],'chart_rt_t1');
			  
			  if(tagconf.calltags=='getPresionAtmosferica')this.wifi = true;
	
			}else{
			  this.calltags[tagconf.calltags]          = 0;
			  if(tagconf.calltags=='getPresionAtmosferica')this.wifi = false;
			}
	
		  }
		}
	}

  updateChartMain(form){
    this.chart_01.data.labels = new Array(form.value.data_per_graph_main);
    this.time_on_request      = form.value.time_on_request;
    this.data_per_graph_main  = form.value.data_per_graph_main;
    this.dynamic_scale        = form.value.dynamic_scale;
    
    /* Si el "data_per_graph_main" es menor a lo que existe
     * esto eliminara los elementos del inicio que sibren 
     * para pintar la grafica 
     */
    this.chart_01.data.datasets.forEach(function(element) {
      if(form.value.data_per_graph_main < element.data.length){
        element.data = element.data.slice(
           element.data.length - form.value.data_per_graph_main
          ,element.data.length);
      }
    });

    this.change_graph_dynamic_scale();

    this.subscrubeChangeGraphUpdateTimeRest();

    this.chart_01.config.type = form.value.type_graph_main;
    this.chart_01.update();
    this.showDropdownchart_01 = false;
  }
  change_graph_dynamic_scale(){
    for (let index = 0; index < this.chart_01.config.options.scales.yAxes.length; index++) {
      const element = this.chart_01.config.options.scales.yAxes[index];
      const calltag = this.chart_01.config.options.scales.yAxes[index].id;
      if (this.dynamic_scale === 'dynamic') {
        if(M3.lstTags[calltag]){
          this.chart_01.config.options.scales.yAxes[index].ticks.min = undefined;
          this.chart_01.config.options.scales.yAxes[index].ticks.max = undefined;
          this.chart_01.config.options.scales.yAxes[index].ticks.beginAtZero = false;
        }
      }else if(this.dynamic_scale === 'dynamic_with_0'){
        if(M3.lstTags[calltag]){
          this.chart_01.config.options.scales.yAxes[index].ticks.min = undefined;
          this.chart_01.config.options.scales.yAxes[index].ticks.max = undefined;
          this.chart_01.config.options.scales.yAxes[index].ticks.beginAtZero = true;
        }
      }else if(this.dynamic_scale === 'static'){
        if(M3.lstTags[calltag]){
          this.chart_01.config.options.scales.yAxes[index]['ticks']['min'] = M3.lstTags[calltag]['min'];
          this.chart_01.config.options.scales.yAxes[index]['ticks']['max'] = M3.lstTags[calltag]['max'];
          this.chart_01.config.options.scales.yAxes[index].ticks.beginAtZero = false;
        }
      }else if(this.dynamic_scale === 'static_min'){
        if(M3.lstTags[calltag]){
          this.chart_01.config.options.scales.yAxes[index]['ticks']['min'] = M3.lstTags[calltag]['min'];
          this.chart_01.config.options.scales.yAxes[index]['ticks']['max'] = undefined;
          this.chart_01.config.options.scales.yAxes[index].ticks.beginAtZero = false;
        }
      }


      
    }
  }
  togleModalTags(){
    this.showModal_lst_tags = ! this.showModal_lst_tags;
  }
  openModal_01(calltag,title?){
    this.titleModal = title;
    this.showModal = true;
  }
  closeModal_01(){
    this.showModal = false;
  }
  changeTypeChart(){

  }
  emptyChart(){
    this.chart_01.data.datasets.forEach(function(element) {
      element.hidden=true;
    });
    this.chart_01.config.options.scales.yAxes.forEach(function(element) {
      element.display=false;
    });
    this.showDropdownchart_01 = false;
  }
  datasetToggleChartMain(calltag){
    if (this.dataset_main[calltag] !== undefined) {
      this.dataset_main[calltag].hidden = !this.dataset_main[calltag].hidden;
  
      for (let index = 0; index < this.chart_01.config.options.scales.yAxes.length; index++) {
        const element = this.chart_01.config.options.scales.yAxes[index];
        if (element.id == calltag) {
          this.yAxes_main[calltag].display= !this.dataset_main[calltag].hidden;
          this.chart_01.config.options.scales.yAxes[index].display= !this.dataset_main[calltag].hidden;
          this.chart_01.update();
        }
      }
    }
  }
  obtenerValor(po_textoHTML):string{
    if(!this.wsPI.conexiondirectaPI){
      var obj = JSON.parse(po_textoHTML);
      return obj.Value;
    }

    let lc_cadena = po_textoHTML.toString();
    //console.log(lc_cadena);

    let ln_pos1Value = lc_cadena.indexOf(";Value") + 14;
    //console.log("ln_pos1Value=" + ln_pos1Value);
    let ln_pos2Value = lc_cadena.substring(ln_pos1Value).indexOf(",");
    //console.log("ln_pos2Value=" + ln_pos2Value);
    
    let lc_valor = lc_cadena.substring(ln_pos1Value, ln_pos1Value + ln_pos2Value).trim();
    return lc_valor;
  }
  
  addDatasetRT(tagconf,calltag,data,tags,chart){
    /*El método find() devuelve el valor del primer elemento 
    del array que cumple la función de prueba proporcionada. 
    En cualquier otro caso se devuelve undefined. */
    let existDataset = function (tag) {
      return (tag.id === calltag);
    };

    //if(['getCTUnoRT','getCTDosRT','getTVRT'].includes(calltag)){
    if(tags.includes(calltag)){
      let tag = this[chart].data.datasets.find(existDataset);
      if(tag == undefined){
  
        let newColor = (tagconf.color == '#cccccc') ? M3.generateColorHEX(calltag):tagconf.color;
   
        var newDatasetModal = {
          id:calltag,
          label: tagconf.label,
          backgroundColor: newColor,
          borderColor: newColor,
          data: [data],
          fill: false,
          hidden:false
        };
        this[chart].data.datasets.push(newDatasetModal);
      }else{
        (tag.data as number[])=[data];
      }
      this[chart].update();
    }

  }
  addDatasetLine(tagconf,calltag,data,tags,chart){
    /*El método find() devuelve el valor del primer elemento 
    del array que cumple la función de prueba proporcionada. 
    En cualquier otro caso se devuelve undefined. */
    let existDataset = function (tag) {
      return (tag.id === calltag);
    };

    //if(['getCTUnoRT','getCTDosRT','getTVRT'].includes(calltag)){
    if(tags.includes(calltag)){
      let tag = this[chart].data.datasets.find(existDataset);
      if(tag == undefined){
  
        var newColor = (tagconf.color == '#cccccc') ? M3.generateColorHEX(calltag):tagconf.color;
   
        var newDatasetModal = {
          id:calltag,
          label: tagconf.label,
          backgroundColor: newColor,
          borderColor: newColor,
          data: [data],
          fill: false,
          hidden:false
        };
        this[chart].data.datasets.push(newDatasetModal);
      }else{
        (tag.data as number[]).push(data);
        //tag.data.push(data);
        if(tag.data.length >= 11){
          tag.data.shift();
        }
      }
      this[chart].update();
    }

  }
  addDatasetModal(label,calltag,data){
    let existDataset = function (tag) {
      return (tag.id === calltag);
    };

    
    let tag = this.chart_modal.data.datasets.find(existDataset);
    if(tag == undefined){

      var newColor = M3.generateColorHEX(calltag);
 
      var newDatasetModal = {
        id:calltag,
        label: calltag,
        backgroundColor: newColor,
        borderColor: newColor,
        data: [data],
        fill: false,
        hidden:true
      };
      this.chart_modal.data.datasets.push(newDatasetModal);

      this.dataset_modal[calltag] = this.chart_modal.data.datasets[this.chart_modal.data.datasets.length-1];
      this.yAxes_modal[calltag]   = this.chart_modal.config.options.scales.yAxes[this.chart_modal.config.options.scales.yAxes.length-1];
      

    }else{
      (tag.data as number[])=[data];
      //tag.data.push(data);
      /*if(tag.data.length >= this.chart_modal.data.labels.length+1){
        tag.data.shift();
      }//*/
    }
    //console.log("data",this.chart_01.data.datasets);
    //console.log("y ",this.chart_01.config.options.scales.yAxes);
    this.chart_modal.update();
  }
  addDataset(tagconf,calltag,data){
    let existDataset = function (tag) {
      return (tag.id === calltag);
    };
    let hiddenDataset = function(){
      switch(calltag) {
        case "getPotenciaNeta":
        case "getPotenciaCCDV":
        case "getRegimenTermico":
          return false;
        default:
          return true;
      }
    }
    let displayYAxis = function(){
      //return false;
      switch(calltag) {
        case "getPotenciaNeta":
        case "getPotenciaCCDV":
        case "getRegimenTermico":
          return true;
        default:
          return false;
      }
    }
    
    let tag = this.chart_01.data.datasets.find(existDataset);
    if(tag == undefined){
      //let newColor = tagconf.color;
      let newColor = (tagconf.color == '#cccccc') ? M3.generateColorHEX(calltag):tagconf.color;
      var newDataset = {
        id:calltag,
        label: M3.lstTags[calltag].label+'----'+newColor,
        backgroundColor: newColor,
        borderColor: newColor,
        data: [data],
        fill: false,
        yAxisID: calltag,
        //yAxisID: 'my887896',
        hidden:hiddenDataset()
      };
      var newYaxis = {
        id: calltag,
        type: 'linear', 
        display: displayYAxis(),
        position: 'left',
        ticks:{
          fontColor:newColor,
          fontSize:12,
          min: tagconf.min,
          max: tagconf.max,
          beginAtZero: false
        },
        
      };
      
      this.chart_01.data.datasets.push(newDataset);
      this.chart_01.config.options.scales.yAxes.push(newYaxis);

      
      this.dataset_main[calltag] = this.chart_01.data.datasets[this.chart_01.data.datasets.length-1];
      this.yAxes_main[calltag]   = this.chart_01.config.options.scales.yAxes[this.chart_01.config.options.scales.yAxes.length-1];
      
    }else{
      (tag.data as number[]).push(data);
      //tag.data.push(data);
      if(tag.data.length >= this.chart_01.data.labels.length+1){
        tag.data.shift();
      }
    }
    //console.log("data",this.chart_01.data.datasets);
    //console.log("y ",this.chart_01.config.options.scales.yAxes);
    this.chart_01.update();
  }
  peticion(calltag, tagconf, webID){

    if(this.isdemo){
      this.calltags[calltag]          = Math.random() * (500 - 51) + 51;

      this.addDataset     ( tagconf, calltag, this.calltags[calltag] );
      this.addDatasetRT   ( tagconf, calltag, this.calltags[calltag],['getCTUnoRT','getCTDosRT','getTVRT'],'chart_rt');
      this.addDatasetRT   ( tagconf, calltag, this.calltags[calltag],['getCTUnoRPM','getCTDosRPM','getTVRPM'],'chart_rpm');
      this.addDatasetRT   ( tagconf, calltag, this.calltags[calltag],['getCTUnoMW','getCTDosMW','getTVMW'],'chart_mw');
      this.addDatasetLine ( tagconf, calltag, this.calltags[calltag],['getCTUnoRT','getCTDosRT','getTVRT'],'chart_rt_t1');
      /*
      //this.addDatasetModal(label,calltag,this.calltags[calltag]);
      //*/
      return;
    }
    this.wsPI.getTag(webID,(this.globalService.plant.name === "AGUILA")).subscribe(
      data=>{
        let datoprocesado = null;
        if(tagconf.typadata == 'float')     datoprocesado = parseFloat(this.obtenerValor(data));
        else if(tagconf.typadata == 'int')  datoprocesado = parseInt(this.obtenerValor(data));
        
        this.calltags[calltag]          = datoprocesado;
        
        this.addDataset(tagconf,calltag,datoprocesado);
        this.addDatasetRT ( tagconf, calltag, this.calltags[calltag],['getCTUnoRT','getCTDosRT','getTVRT'],'chart_rt');
        this.addDatasetRT ( tagconf, calltag, this.calltags[calltag],['getCTUnoRPM','getCTDosRPM','getTVRPM'],'chart_rpm');
        this.addDatasetRT ( tagconf, calltag, this.calltags[calltag],['getCTUnoMW','getCTDosMW','getTVMW'],'chart_mw');
        this.addDatasetLine ( tagconf, calltag, this.calltags[calltag],['getCTUnoRT','getCTDosRT','getTVRT'],'chart_rt_t1');
        
        if(calltag=='getPresionAtmosferica')this.wifi = true;
      },
      err=>{
        this.calltags[calltag]          = 0;
        if(calltag=='getPresionAtmosferica')this.wifi = false;
      }
    );
  }
  cambiarIdioma(pc_idioma : string) {
    //this.translate.use(pc_idioma);
  }
}
