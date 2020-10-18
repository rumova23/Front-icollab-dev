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
    date:'01/07/2019',
    powers:[
      {'Hora':'1', 'Potencia Planeada PPA': 1, 'Potencia Planeada Máxima Real Demostrada': '10'},
      {'Hora':'2', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '11'},
      {'Hora':'3', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'4', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'5', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'6', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'7', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'8', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'9', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'10', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'11', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'12', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'13', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'14', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'15', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'16', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'17', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'18', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'19', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'20', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'24', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'23', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'24', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
    ],
    link:''
  },
  {
    date:'02/07/2019',
    powers:[
      {'Hora':'1', 'Potencia Planeada PPA': 1, 'Potencia Planeada Máxima Real Demostrada': '10'},
      {'Hora':'2', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '11'},
      {'Hora':'3', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'4', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'5', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'6', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'7', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'8', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'9', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'10', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'11', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'12', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'13', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'14', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'15', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'16', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'17', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'18', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'19', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'20', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'24', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'23', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'24', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'}
    ]
  },
  {
    date:'03/07/2019',
    powers:[
      {'Hora':'1', 'Potencia Planeada PPA': 1, 'Potencia Planeada Máxima Real Demostrada': '10'},
      {'Hora':'2', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '11'},
      {'Hora':'3', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'4', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'5', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'6', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'7', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'8', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'9', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'10', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'11', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'12', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'13', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'14', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'15', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'16', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'17', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'18', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'19', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'20', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'24', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'23', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'},
      {'Hora':'24', 'Potencia Planeada PPA': 2, 'Potencia Planeada Máxima Real Demostrada': '5'}
    ]
  }
];

@Component({
  selector: 'app-plannedPowersPpaD',
  templateUrl: './plannedPowersPpaD.component.html',
  styleUrls: ['./plannedPowersPpaD.component.scss']
})
export class PlannedPowersPPADComponent implements OnInit {
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
