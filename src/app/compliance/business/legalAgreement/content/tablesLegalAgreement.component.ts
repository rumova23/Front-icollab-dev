import { Component, OnInit, ViewChild, Input } from '@angular/core';
// import { MdbTableService } from 'node_modules/angular-bootstrap-md';
import { MatTableDataSource, MatSort } from '@angular/material';
import { DatosPie } from 'src/app/core/models/datosPie';
import { DatosCumplimiento } from 'src/app/core/models/datosCumplimiento';
import { SemanasPorMes } from 'src/app/compliance/models/SemanasPorMes';
import { DiagramaGant } from 'src/app/compliance/models/DiagramaGant';
import { TagPlanta } from 'src/app/compliance/models/TagPlanta';
import { Compliance } from 'src/app/compliance/models/Compliance';
import { DatosGraficaGant } from 'src/app/compliance/models/datosGraficaGant';
import {CatalogType} from '../../../models/CatalogType';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';

import { GanttEditorComponent, GanttEditorOptions } from 'ng-gantt';
import {ComplianceDTO} from '../../../models/compliance-dto';


@Component({
  selector: 'app-tablesLegalAgreement ',
  templateUrl: './tablesLegalAgreement.component.html',
  styleUrls: ['./tablesLegalAgreement.component.scss']
})
export class TablesLegalAgreementComponent implements OnInit {

	@ViewChild('editor') editor: GanttEditorComponent;
	public editorOptions: GanttEditorOptions;
	public data: any;

  constructor(
      private eventService: EventService
  ) { }

  @ViewChild(MatSort) sort: MatSort;

  @Input() columnas: string[];
  @Input() registros: MatTableDataSource<ComplianceDTO>;

  @Input() columnasGant: string[];
  @Input() semanasPorMes: Array<SemanasPorMes>;
  @Input() registrosGant: MatTableDataSource<DatosGraficaGant>;
  @Input() datosPie: DatosPie;
  @Input() datosCumplimiento: DatosCumplimiento;
  @Input() elementData:any;

  mostarGraficas = false;
  verGraficaGant = false;
  verTags = true;

  plantas: Array<TagPlanta>;

  // INICIA GRAFICA DE PIE
  chartTypePie = 'pie';
  chartDataPie: Array<any> = [300, 50, 100, 40];
  public chartLabelsPie: Array<any> = ['Abierto', 'Cerrado', 'Abierto fuera de tiempo', 'Cerrado fuera de tiempo'];
  public chartColorsPie: Array<any> = [{
      hoverBorderColor: ['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)'],
      hoverBorderWidth: 0,
      backgroundColor: ['rgb(72, 182, 25)', 'rgb(243, 243, 29)', 'rgb(251, 163, 0)', 'rgb(223, 16, 16)'],
      hoverBackgroundColor: ['rgb(72, 182, 25)', 'rgb(243, 243, 29)', 'rgb(251, 163, 0)', 'rgb(223, 16, 16)']
  }];
  public chartOptionsPie: any = {
    responsive: true
  };
  // TERMINA GRAFICA DE PIE

  // INICIA GRAFICA DE BARRAS
  public chartType = 'horizontalBar';
  public chartDatasets: Array<any> = [
      {data: [65], label: '% Nivel de cumplimiento'},
      {data: [100], label: '% Cumplimiento total'}
  ];
  public chartLabels: Array<any> = [' % Cumplimiento Pagos '];
  public chartColors: Array<any> = [
    {
      // Rojo
      backgroundColor: 'rgba(252,10,10,1)',
      borderColor: 'rgba(220,220,220,1)',
      borderWidth: 1,
      pointBackgroundColor: 'rgba(220,220,220,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(220,220,220,1)'
    }, { // Verde
      backgroundColor: 'rgba(47,204,0,1)',
      borderColor: 'rgba(47,204,0,1)',
      borderWidth: 1,
      pointBackgroundColor: 'rgba(47,204,0,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(47,204,0,1)'
    }
  ];

  public chartOptions: any = {
    tooltips: {
      displayColors: true,
      callbacks: { mode: 'x' },
    },
    responsive: true,
    maintainAspectRatio: false,
    legend: { position: 'bottom' },
    /*scales: {
      xAxes: [ { stacked: true } ],
      yAxes: [ { stacked: true } ]
    }*/
  };
// TERMINA GRAFICA DE BARRAS


// GANT
  public chartTypeStacked = 'horizontalBar';
  public chartDatasetsStacked: Array<any> = [
    { label: 'EN TIEMPO',         data: [50, 40, 25, 25, 25] },
    { label: 'PROXIMO A VENCER',  data: [20, 30, 25, 25, 25] },
    { label: 'AL LIMITE',         data: [20, 20, 25, 25, 25] },
    { label: 'VENCIDO',           data: [10, 10, 25, 25, 25] },
  ];
  public chartLabelsStacked: Array<any> = ['N-1: NOTIFICACIONES ', 'N-2: NOTIFICACIONES', 'N-3: NOTIFICACIONES', 'N-4: NOTIFICACIONES', 'N-5: NOTIFICACIONES'];
  public chartColorsStacked: Array<any> = [
    { // Verde
      backgroundColor: 'rgba(47,204,0,1)',
      borderColor: 'rgba(47,204,0,1)',
      borderWidth: 1,
      pointBackgroundColor: 'rgba(47,204,0,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(47,204,0,1)'
    },
    { // Amarillo
      backgroundColor: 'rgba(255,248,56,1)',
      borderColor: 'rgba(255,248,56,1)',
      borderWidth: 1,
      pointBackgroundColor: 'rgba(255,248,56,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,248,56,1)'
    }, {
      // Anaranjado
      backgroundColor: 'rgba(239,110,30,1)',
      borderColor: 'rgba(239,110,30,1)',
      borderWidth: 1,
      pointBackgroundColor: 'rgba(239,110,30,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(239,110,30,1)'
    }, {
      // Rojo
      backgroundColor: 'rgba(252,10,10,1)',
      borderColor: 'rgba(220,220,220,1)',
      borderWidth: 1,
      pointBackgroundColor: 'rgba(220,220,220,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(220,220,220,1)'
    }
  ];
  public chartOptionsStacked: any = {
    tooltips: {
      displayColors: true,
      callbacks: { mode: 'x' },
    },
    responsive: true,
    maintainAspectRatio: false,
		legend: { position: 'bottom' },
    scales: {
      xAxes: [ { stacked: true } ],
      yAxes: [ { stacked: true } ]
    }
  };
  public chartClickedPie(e: any): void {}
  public chartHoveredPie(e: any): void {}

  public chartClicked(e: any): void {}
  public chartHovered(e: any): void {}
  public chartClickedStacked(e: any): void { }
  public chartHoveredStacked(e: any): void { }
// GANT


ngOnInit() {
}
disparador(){
  
  this.editorOptions = new GanttEditorOptions();
  this.data = this.initDataGantt();
  this.editorOptions = {
    vFormat: 'day'
  }
  console.log(this.elementData);
  
}
disparador2(){
  
  this.data = this.initialData();
  this.editorOptions = {
    vFormat: 'day'
  }
  console.log(this.elementData);
  
}
  initDataGantt(){
    let list = [];
    this.elementData.forEach(element => {
      element.forEach(tag => {
        
        list.push({
          
          'pID': tag.complianceId,
          'pName': tag.tag,
          'pStart': tag.fechaProgramadaInicio,
          'pEnd': tag.fechaProgramadaFinal,
          'pClass': 'gtaskblue',
          'pLink': '',
          'pMile': 0,
          'pRes': '',
          'pComp': 60,
          'pGroup': 0,
          'pParent': 0,
          'pOpen': 1,
          'pDepend': '',
          'pCaption': '',
          'pNotes': ''
        });
        if(tag.fechaRealFin == null && new Date(tag.fechaProgramadaFinal) < new Date(Date.now()) ){
            list.push({
              
              'pID': tag.complianceId+99,
              'pName': tag.tag,
              'pStart': tag.fechaProgramadaInicio,
              'pEnd': Date.now(),
              'pClass': 'gtaskred',
              'pLink': '',
              'pMile': 0,
              'pRes': '',
              'pComp': 60,
              'pGroup': 0,
              'pParent': 0,
              'pOpen': 1,
              'pDepend': '',
              'pCaption': '',
              'pNotes': ''
            });
        } 
      });
    });
    return list;
  }
  initialData() {
      return [{
      'pID': 1,
      'pName': 'Define Chart API',
      'pStart': '',
      'pEnd': '',
      'pClass': 'ggroupblack',
      'pLink': '',
      'pMile': 0,
      'pRes': 'Brian',
      'pComp': 0,
      'pGroup': 1,
      'pParent': 0,
      'pOpen': 1,
      'pDepend': '',
      'pCaption': '',
      'pNotes': 'Some Notes text'
      },
      {
      'pID': 11,
      'pName': 'Chart Object',
      'pStart': '2017-02-20',
      'pEnd': '2017-02-20',
      'pClass': 'gmilestone',
      'pLink': '',
      'pMile': 1,
      'pRes': 'Shlomy',
      'pComp': 100,
      'pGroup': 0,
      'pParent': 1,
      'pOpen': 1,
      'pDepend': '',
      'pCaption': '',
      'pNotes': ''
      },
      {
      'pID': 12,
      'pName': 'Task Objects',
      'pStart': '',
      'pEnd': '',
      'pClass': 'ggroupblack',
      'pLink': '',
      'pMile': 0,
      'pRes': 'Shlomy',
      'pComp': 40,
      'pGroup': 1,
      'pParent': 1,
      'pOpen': 1,
      'pDepend': '',
      'pCaption': '',
      'pNotes': ''
      },
      {
      'pID': 121,
      'pName': 'Constructor Proc #1234 of February 2017',
      'pStart': '2017-02-21',
      'pEnd': '2017-03-09',
      'pClass': 'gtaskblue',
      'pLink': '',
      'pMile': 0,
      'pRes': 'Brian T.',
      'pComp': 60,
      'pGroup': 0,
      'pParent': 12,
      'pOpen': 1,
      'pDepend': '',
      'pCaption': '',
      'pNotes': ''
      },
      {
      'pID': 122,
      'pName': 'Task Variables',
      'pStart': '2017-03-06',
      'pEnd': '2017-03-11',
      'pClass': 'gtaskred',
      'pLink': '',
      'pMile': 0,
      'pRes': 'Brian',
      'pComp': 60,
      'pGroup': 0,
      'pParent': 12,
      'pOpen': 1,
      'pDepend': 121,
      'pCaption': '',
      'pNotes': ''
      },
      {
      'pID': 123,
      'pName': 'Task by Minute/Hour',
      'pStart': '2017-03-09',
      'pEnd': '2017-03-14 12: 00',
      'pClass': 'gtaskyellow',
      'pLink': '',
      'pMile': 0,
      'pRes': 'Ilan',
      'pComp': 60,
      'pGroup': 0,
      'pParent': 12,
      'pOpen': 1,
      'pDepend': '',
      'pCaption': '',
      'pNotes': ''
      },
      {
      'pID': 124,
      'pName': 'Task Functions',
      'pStart': '2017-03-09',
      'pEnd': '2017-03-29',
      'pClass': 'gtaskred',
      'pLink': '',
      'pMile': 0,
      'pRes': 'Anyone',
      'pComp': 60,
      'pGroup': 0,
      'pParent': 12,
      'pOpen': 1,
      'pDepend': '123SS',
      'pCaption': 'This is a caption',
      'pNotes': null
      },
      {
      'pID': 2,
      'pName': 'Create HTML Shell',
      'pStart': '2017-03-24',
      'pEnd': '2017-03-24',
      'pClass': 'gtaskyellow',
      'pLink': '',
      'pMile': 0,
      'pRes': 'Brian',
      'pComp': 20,
      'pGroup': 0,
      'pParent': 0,
      'pOpen': 1,
      'pDepend': 122,
      'pCaption': '',
      'pNotes': ''
      },
      {
      'pID': 3,
      'pName': 'Code Javascript',
      'pStart': '',
      'pEnd': '',
      'pClass': 'ggroupblack',
      'pLink': '',
      'pMile': 0,
      'pRes': 'Brian',
      'pComp': 0,
      'pGroup': 1,
      'pParent': 0,
      'pOpen': 1,
      'pDepend': '',
      'pCaption': '',
      'pNotes': ''
      },
      {
      'pID': 31,
      'pName': 'Define Variables',
      'pStart': '2017-02-25',
      'pEnd': '2017-03-17',
      'pClass': 'gtaskpurple',
      'pLink': '',
      'pMile': 0,
      'pRes': 'Brian',
      'pComp': 30,
      'pGroup': 0,
      'pParent': 3,
      'pOpen': 1,
      'pDepend': '',
      'pCaption': '',
      'pNotes': ''
      },
      {
      'pID': 32,
      'pName': 'Calculate Chart Size',
      'pStart': '2017-03-15',
      'pEnd': '2017-03-24',
      'pClass': 'gtaskgreen',
      'pLink': '',
      'pMile': 0,
      'pRes': 'Shlomy',
      'pComp': 40,
      'pGroup': 0,
      'pParent': 3,
      'pOpen': 1,
      'pDepend': '',
      'pCaption': '',
      'pNotes': ''
      },
      {
      'pID': 33,
      'pName': 'Draw Task Items',
      'pStart': '',
      'pEnd': '',
      'pClass': 'ggroupblack',
      'pLink': '',
      'pMile': 0,
      'pRes': 'Someone',
      'pComp': 40,
      'pGroup': 2,
      'pParent': 3,
      'pOpen': 1,
      'pDepend': '',
      'pCaption': '',
      'pNotes': ''
      },
      {
      'pID': 332,
      'pName': 'Task Label Table',
      'pStart': '2017-03-06',
      'pEnd': '2017-03-09',
      'pClass': 'gtaskblue',
      'pLink': '',
      'pMile': 0,
      'pRes': 'Brian',
      'pComp': 60,
      'pGroup': 0,
      'pParent': 33,
      'pOpen': 1,
      'pDepend': '',
      'pCaption': '',
      'pNotes': ''
      },
      {
      'pID': 333,
      'pName': 'Task Scrolling Grid',
      'pStart': '2017-03-11',
      'pEnd': '2017-03-20',
      'pClass': 'gtaskblue',
      'pLink': '',
      'pMile': 0,
      'pRes': 'Brian',
      'pComp': 0,
      'pGroup': 0,
      'pParent': 33,
      'pOpen': 1,
      'pDepend': '332',
      'pCaption': '',
      'pNotes': ''
      },
      {
      'pID': 34,
      'pName': 'Draw Task Bars',
      'pStart': '',
      'pEnd': '',
      'pClass': 'ggroupblack',
      'pLink': '',
      'pMile': 0,
      'pRes': 'Anybody',
      'pComp': 60,
      'pGroup': 1,
      'pParent': 3,
      'pOpen': 0,
      'pDepend': '',
      'pCaption': '',
      'pNotes': ''
      },
      {
      'pID': 341,
      'pName': 'Loop each Task',
      'pStart': '2017-03-26',
      'pEnd': '2017-04-11',
      'pClass': 'gtaskred',
      'pLink': '',
      'pMile': 0,
      'pRes': 'Brian',
      'pComp': 60,
      'pGroup': 0,
      'pParent': 34,
      'pOpen': 1,
      'pDepend': '',
      'pCaption': '',
      'pNotes': ''
      },
      {
      'pID': 342,
      'pName': 'Calculate Start/Stop',
      'pStart': '2017-04-12',
      'pEnd': '2017-05-18',
      'pClass': 'gtaskpink',
      'pLink': '',
      'pMile': 0,
      'pRes': 'Brian',
      'pComp': 60,
      'pGroup': 0,
      'pParent': 34,
      'pOpen': 1,
      'pDepend': '',
      'pCaption': '',
      'pNotes': ''
      },
      {
      'pID': 343,
      'pName': 'Draw Task Div',
      'pStart': '2017-05-13',
      'pEnd': '2017-05-17',
      'pClass': 'gtaskred',
      'pLink': '',
      'pMile': 0,
      'pRes': 'Brian',
      'pComp': 60,
      'pGroup': 0,
      'pParent': 34,
      'pOpen': 1,
      'pDepend': '',
      'pCaption': '',
      'pNotes': ''
      },
      {
      'pID': 344,
      'pName': 'Draw Completion Div',
      'pStart': '2017-05-17',
      'pEnd': '2017-06-04',
      'pClass': 'gtaskred',
      'pLink': '',
      'pMile': 0,
      'pRes': 'Brian',
      'pComp': 60,
      'pGroup': 0,
      'pParent': 34,
      'pOpen': 1,
      'pDepend': '342,343',
      'pCaption': '',
      'pNotes': ''
      },
      {
      'pID': 35,
      'pName': 'Make Updates',
      'pStart': '2017-07-17',
      'pEnd': '2017-09-04',
      'pClass': 'gtaskpurple',
      'pLink': '',
      'pMile': 0,
      'pRes': 'Brian',
      'pComp': 30,
      'pGroup': 0,
      'pParent': 3,
      'pOpen': 1,
      'pDepend': '333',
      'pCaption': '',
      'pNotes': ''
      }];
  }
  obtenerListaTags() {
    this.registros.sort = this.sort;
  }

  generarGraficas() {
    if ( this.mostarGraficas ) {
      this.mostarGraficas = false;
    } else {
      this.mostarGraficas = true;
    }

    this.chartDataPie = [this.datosPie.abierto, this.datosPie.cerrado, this.datosPie.abiertoFueraDeTiempo, this.datosPie.cerradoFueraDeTiempo];

    this.chartDatasets = [
        {data: [this.datosCumplimiento.nivelCumplimiento], label: '% Nivel de cumplimiento'},
        {data: [this.datosCumplimiento.cumplimientoTotal], label: '% Cumplimiento total'}
      ];


  }

  mostrarTagGant() {
    if ( this.verGraficaGant) {
      this.verGraficaGant = false;
    } else {
      this.verGraficaGant = true;
    }

    if (this.verTags) {
      this.verTags = false;
    } else {
    this.verTags = true;
    }

    this.mostarGraficas = false;
    this.chartDataPie = [this.datosPie.abierto, this.datosPie.cerrado, this.datosPie.abiertoFueraDeTiempo, this.datosPie.cerradoFueraDeTiempo];
    this.chartDataPie.push(this.datosPie.abierto);
    this.chartDataPie.push(this.datosPie.cerrado);
    this.chartDataPie.push(this.datosPie.abiertoFueraDeTiempo);
    this.chartDataPie.push(this.datosPie.cerradoFueraDeTiempo);

  }

  action(option: number, id: any) {
    let type: CatalogType = {};
    switch (option) {
      case 1:
        type = {id: id, action: 'nuevo',
          name: null}
        break;
      case 2:
        type = {id: id, action: 'ver',
          name: null}
        break;
      case 3:
        type = {id: id, action: 'editar',
          name: null}
        break;
    }
    this.eventService.sendChangePage(new EventMessage(14, type,'Compliance.Personal Competente.TaskEditComponent.14'));
  }
}
