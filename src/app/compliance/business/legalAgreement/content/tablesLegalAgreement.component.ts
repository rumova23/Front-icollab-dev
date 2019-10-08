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

@Component({
  selector: 'app-tablesLegalAgreement',
  templateUrl: './tablesLegalAgreement.component.html',
  styleUrls: ['./tablesLegalAgreement.component.scss']
})
export class TablesLegalAgreementComponent implements OnInit {

  constructor(
  ) { }

  @ViewChild(MatSort) sort: MatSort;

  @Input() columnas: string[];
  @Input() registros: MatTableDataSource<Compliance>;

  @Input() columnasGant: string[];
  @Input() semanasPorMes: Array<SemanasPorMes>;
  @Input() registrosGant: MatTableDataSource<DatosGraficaGant>;
  @Input() datosPie: DatosPie;
  @Input() datosCumplimiento: DatosCumplimiento;

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


ngOnInit() {}

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


}
