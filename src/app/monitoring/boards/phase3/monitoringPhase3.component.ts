import { Component, OnInit, Input } from '@angular/core';
import { environment } from  'src/environments/environment';
import { MonitoringPhase3Service }   from '../../services/monitoringPhase3.service';

import { ActivatedRoute } from '@angular/router';

import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { interval } from 'rxjs';
import { Chart } from 'chart.js';
import { GlobalService } from 'src/app/core/globals/global.service';

import { SecurityService } from 'src/app/core/services/security.service';
import { Validate } from 'src/app/core/helpers/util.validator.';
import { SocketService } from 'src/app/core/services/socket.service';
import { EventSocket } from 'src/app/core/models/EventSocket';



import * as M3 from './config';
import { DateAdapter } from 'angular-calendar';

@Component({
  selector: 'app-monitoringPhase3',
  templateUrl: './monitoringPhase3.component.html',
  styleUrls: ['./monitoringPhase3.component.css'],
})
export class MonitoringPhase3Component implements OnInit {
    
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
  mysubscribeinterval = null;
  time_on_request : number = 3;//4000;
  data_per_graph_main = 10;
  type_graph_main = 'line';
  dynamic_scale = 'static';


  cadaIntervalo : number = 1000;//4000;
  fechaActual   : any;




    
	
  chart_1_config = {
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
    private wsPI               : MonitoringPhase3Service
    ,private modalService       : NgbModal
    ,private activatedRoute     : ActivatedRoute
    ,public globalService       : GlobalService
    ,private securityService: SecurityService
    ,private socketService: SocketService
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

    this.chartInit();
    this.initializeAt0();

    let lo_tiempoFechaYHora = interval(1000);
    lo_tiempoFechaYHora.subscribe(t => this.fechaYHora());
    

    
    this.change_graph_update_time_rest();
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
  chartInit(){
    this.chart_01    = new Chart('canvas1'     ,this.chart_1_config);
    //this.chart_modal = new Chart('canvas_modal',this.chart_modal_config);
    this.chart_rt    = new Chart('chart_rt'    , M3.chart_rt_config);
    this.chart_rpm   = new Chart('chart_rpm'   , M3.chart_rpm_config);
    this.chart_mw    = new Chart('chart_mw'    , M3.chart_mw_config);
    this.chart_rt_t1 = new Chart('chart_rt_t1' , M3.chart_rt_t1_config);
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

    this.change_graph_update_time_rest();

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
  change_graph_update_time_rest(){
    if(this.mysubscribeinterval != null){
      this.mysubscribeinterval.unsubscribe();
      this.mysubscribeinterval.closed= true;
      this.mysubscribeinterval.remove(this.mysubscribeinterval);
    }else{
      this.TraerDatosDesdePiWebAPI();  
    }

    this.myinterval = interval(this.time_on_request*1000);
    this.mysubscribeinterval = this.myinterval.subscribe(() => this.TraerDatosDesdePiWebAPI());
  }
  fechaYHora(){
    this.fechaActual = new Date();
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
  initializeAt0(){
    for (const calltag in M3.lstTags) {
      if (M3.lstTags.hasOwnProperty(calltag)) {
        const tagconf          = M3.lstTags[calltag];
        this.calltags[calltag] = 0;
      }
    }
  }
  socketConection(){
    //if(!this.conected){
    if(!this.globalService.socketConnect){
      const token = this.securityService.getToken();
      if (Validate(token)) {
        this.socketService.initSocket(token);

        //Status
        this.socketService.onEvent(EventSocket.CONNECT)
        .subscribe(() => {
          //this.conected = true;
          this.globalService.socketConnect = true;
          console.log( "Socket Conectado" ,this.globalService.socketConnect);
          


        });
        this.socketService.onEvent(EventSocket.DISCONNECT)
        .subscribe(() => {
          //this.conected = false;
          this.globalService.socketConnect = false;
          console.log("Socket desconectado");
          //this.toastr.errorToastr("Socket desconectado",'Lo siento,');
        });
        this.socketService.onError()
          .subscribe((error: any) => {
            //this.conected = false;
            this.globalService.socketConnect = false;
            console.log("ERROR",error);
            //this.toastr.errorToastr("Socket error conexión",'Lo siento,');
        });
        this.socketService.login()
          .subscribe((errorLogin: any) => {
            if (errorLogin) {
              console.log(errorLogin);
              //this.conected = false;
              this.globalService.socketConnect = false;
              //this.toastr.errorToastr(errorLogin,'Lo siento,');
            } else {
              
            


              let channelPiAguila = this.socketService.suscribeChannel("pi-aguila");
              this.socketService.onChannelWatch(channelPiAguila - 1)
              .subscribe((data: any) => {
                if(this.globalService.aguila){
                  console.log(data);
                  this.dataAdapter(data);
                }

              });

              
              let channelPiSol = this.socketService.suscribeChannel("pi-sol");
              this.socketService.onChannelWatch(channelPiSol - 1)
              .subscribe((data: any) => {
                if(!this.globalService.aguila){
                  console.log(data);
                  this.dataAdapter(data);
               
                }

              });



              
            }
          });
      }else {
        //this.toastr.errorToastr("Token inválido",'Lo siento,');
         console.log('Token inválido');
      }
    }else{
      //Solicitar tags
      ///*
    }
  }
  dataAdapter(data){
    
    for (const calltag in M3.lstTags) {
      if (M3.lstTags.hasOwnProperty(calltag)) {
        let mydata = null;

        const tagconf  = M3.lstTags[calltag];
        const webID    = (this.globalService.aguila)?tagconf.webId_EAT:tagconf.webId_EST;
        //this.peticion(calltag,tagconf,webID);
        
        for(const tag of data.tags){
          if(tag.webId == webID){
            mydata = tag;
            break;
          }
        }
        if(mydata != null){

          let datoprocesado = null;
          if(tagconf.typadata == 'float')     datoprocesado = parseFloat(mydata.value);
          else if(tagconf.typadata == 'int')  datoprocesado = parseInt(mydata.value);
          
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
    this.wsPI.getTag(webID,this.globalService.aguila).subscribe(
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
    
    this.socketConection();


    
    console.log(">>>>>>>  TraerDatosDesdePiWebAPI");
    if(this.globalService.aguila){
      this.wsPI.getTagsAguila().subscribe(data=>{
        if(!this.globalService.socketConnect){
          this.dataAdapter(JSON.parse(data));
        }
      },err=>{});
    }else{
      this.wsPI.getTagsSol().subscribe(data=>{
        if(!this.globalService.socketConnect){
          this.dataAdapter(JSON.parse(data));
        }
      },err=>{});
    }



  }
  cambiarIdioma(pc_idioma : string) {
    //this.translate.use(pc_idioma);
  }
}
