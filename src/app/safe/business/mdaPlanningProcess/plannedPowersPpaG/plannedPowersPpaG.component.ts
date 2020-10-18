import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';


/*var ELEMENT_DATA00: any[] = [
  {'Potencia Planeada PPA': 1, 'Potencia Planeada Máxima Real Demostrada': 'Hydrogen'},
  {'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': 'Helium'},
  {'Potencia Planeada PPA': 3, 'Potencia Planeada Máxima Real Demostrada': 'Lithium'},
  {'Potencia Planeada PPA': 4, 'Potencia Planeada Máxima Real Demostrada': 'Beryllium'},
  {'Potencia Planeada PPA': 5, 'Potencia Planeada Máxima Real Demostrada': 'Boron'},
  {'Potencia Planeada PPA': 6, 'Potencia Planeada Máxima Real Demostrada': 'Carbon'},
  {'Potencia Planeada PPA': 7, 'Potencia Planeada Máxima Real Demostrada': 'Nitrogen'},
  {'Potencia Planeada PPA': 8, 'Potencia Planeada Máxima Real Demostrada': 'Oxygen'},
  {'Potencia Planeada PPA': 9, 'Potencia Planeada Máxima Real Demostrada': 'Fluorine'},
  {'Potencia Planeada PPA': 10, 'Potencia Planeada Máxima Real Demostrada': 'Neon'}
];*/
const ELEMENT_DATA: any[] = [
  {
    date:'Viernes 10 mayo 2019',
    powers:[
      {'Hora':'1', 'Temperatura':'','Presión':'','Humedad':''},
      {'Hora':'2', 'Temperatura':'','Presión':'','Humedad':''},
      {'Hora':'3', 'Temperatura':'','Presión':'','Humedad':''},
      {'Hora':'4', 'Temperatura':'','Presión':'','Humedad':''},
      {'Hora':'5', 'Temperatura':'','Presión':'','Humedad':''},
      {'Hora':'6', 'Temperatura':'','Presión':'','Humedad':''},
      {'Hora':'7', 'Temperatura':'','Presión':'','Humedad':''},
      {'Hora':'8', 'Temperatura':'','Presión':'','Humedad':''},
      {'Hora':'9', 'Temperatura':'','Presión':'','Humedad':''},
      {'Hora':'10', 'Temperatura':'','Presión':'','Humedad':''},
      {'Hora':'11', 'Temperatura':'','Presión':'','Humedad':''},
      {'Hora':'12', 'Temperatura':'','Presión':'','Humedad':''},
      {'Hora':'13', 'Temperatura':'','Presión':'','Humedad':''},
      {'Hora':'14', 'Temperatura':'','Presión':'','Humedad':''},
      {'Hora':'15', 'Temperatura':'','Presión':'','Humedad':''},
      {'Hora':'16', 'Temperatura':'','Presión':'','Humedad':''},
      {'Hora':'17', 'Temperatura':'','Presión':'','Humedad':''},
      {'Hora':'18', 'Temperatura':'','Presión':'','Humedad':''},
      {'Hora':'19', 'Temperatura':'','Presión':'','Humedad':''},
      {'Hora':'20', 'Temperatura':'','Presión':'','Humedad':''},
      {'Hora':'21', 'Temperatura':'','Presión':'','Humedad':''},
      {'Hora':'22', 'Temperatura':'','Presión':'','Humedad':''},
      {'Hora':'23', 'Temperatura':'','Presión':'','Humedad':''},
      {'Hora':'24', 'Temperatura':'','Presión':'','Humedad':''},

    ],
    link:''
  }
];

@Component({
  selector: 'app-plannedPowersPpaG',
  templateUrl: './plannedPowersPpaG.component.html',
  styleUrls: ['./plannedPowersPpaG.component.scss']
})
export class PlannedPowersPPAGComponent implements OnInit {
  //displayedColumns: string[] = ['Potencia Planeada PPA', 'Potencia Planeada Máxima Real Demostrada'];
  //displayedHeader:  string[] = ['Viernes 10 mayo 2019']
  //columnsToDisplay: string[] = this.displayedColumns.slice();
  //colspan = 2;
  title = "Potencias Planeadas del PPA por hora y por día y Potencia Planeada Máxima Real Demostrada";

  data             : any[]    = [];
  displayedColumns : any[]    = [];
  columnsToDisplay : string[] = [];
  displayedHeader  : string[] = [];
  colspanHeader    : number   = 0;
  dataSource;
  columnsTocheck   : any[]    = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor() { }

  ngOnInit() {
    for (const days of ELEMENT_DATA) {
      let i = 0;
      this.displayedHeader.push(days.date);
      for (const power of days.powers) {
        if(typeof this.data[i] === 'undefined'){
          this.data[i] = {};
        }
        this.colspanHeader = 0;
        for (const key in power) {
          this.colspanHeader += 1;
          if (power.hasOwnProperty(key)) {
            let newKey           = days.date+'-'+key;
            this.data[i][newKey] = power[key];
            
            if ( ! this.columnsToDisplay.find(function(element) {
              return element == newKey;
            })){
              let rObj2      = {};
              rObj2['key']   = newKey;
              rObj2['label'] = key;
              let rObj3      = {};
              rObj3['key']   = '-'+newKey;
              rObj3['label'] = '-'+key;

              this.displayedColumns.push(rObj2);
              this.columnsTocheck.push( rObj3['key'] );
              this.columnsToDisplay.push(newKey);
            }
          }
        }
        i += 1;
      }
    }

    //console.log(this.data);
    //console.log(this.columnsTocheck);
    //console.log(this.columnsToDisplay);

    this.dataSource = new MatTableDataSource<any>(this.data);
    //this.columnsToDisplay.push('Potencia Planeada PPA', 'Potencia Planeada Máxima Real Demostrada');
    //this.dataSource.paginator = this.paginator;
  }

}
