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
      {'Hora':'1','$ Cargo Fijo':'','$ Cargo Variable':'','$ Gas':'','$ GR/ MW':'','$ Margen x MM':'','$ Otros':'','Total':''},
      {'Hora':'2','$ Cargo Fijo':'','$ Cargo Variable':'','$ Gas':'','$ GR/ MW':'','$ Margen x MM':'','$ Otros':'','Total':''},
      {'Hora':'3','$ Cargo Fijo':'','$ Cargo Variable':'','$ Gas':'','$ GR/ MW':'','$ Margen x MM':'','$ Otros':'','Total':''},
      {'Hora':'4','$ Cargo Fijo':'','$ Cargo Variable':'','$ Gas':'','$ GR/ MW':'','$ Margen x MM':'','$ Otros':'','Total':''},
      {'Hora':'5','$ Cargo Fijo':'','$ Cargo Variable':'','$ Gas':'','$ GR/ MW':'','$ Margen x MM':'','$ Otros':'','Total':''},
      {'Hora':'6','$ Cargo Fijo':'','$ Cargo Variable':'','$ Gas':'','$ GR/ MW':'','$ Margen x MM':'','$ Otros':'','Total':''},
      {'Hora':'7','$ Cargo Fijo':'','$ Cargo Variable':'','$ Gas':'','$ GR/ MW':'','$ Margen x MM':'','$ Otros':'','Total':''},
      {'Hora':'8','$ Cargo Fijo':'','$ Cargo Variable':'','$ Gas':'','$ GR/ MW':'','$ Margen x MM':'','$ Otros':'','Total':''},
      {'Hora':'9','$ Cargo Fijo':'','$ Cargo Variable':'','$ Gas':'','$ GR/ MW':'','$ Margen x MM':'','$ Otros':'','Total':''},
      {'Hora':'10','$ Cargo Fijo':'','$ Cargo Variable':'','$ Gas':'','$ GR/ MW':'','$ Margen x MM':'','$ Otros':'','Total':''},
      {'Hora':'11','$ Cargo Fijo':'','$ Cargo Variable':'','$ Gas':'','$ GR/ MW':'','$ Margen x MM':'','$ Otros':'','Total':''},
      {'Hora':'12','$ Cargo Fijo':'','$ Cargo Variable':'','$ Gas':'','$ GR/ MW':'','$ Margen x MM':'','$ Otros':'','Total':''},
      {'Hora':'13','$ Cargo Fijo':'','$ Cargo Variable':'','$ Gas':'','$ GR/ MW':'','$ Margen x MM':'','$ Otros':'','Total':''},
      {'Hora':'14','$ Cargo Fijo':'','$ Cargo Variable':'','$ Gas':'','$ GR/ MW':'','$ Margen x MM':'','$ Otros':'','Total':''},
      {'Hora':'15','$ Cargo Fijo':'','$ Cargo Variable':'','$ Gas':'','$ GR/ MW':'','$ Margen x MM':'','$ Otros':'','Total':''},
      {'Hora':'16','$ Cargo Fijo':'','$ Cargo Variable':'','$ Gas':'','$ GR/ MW':'','$ Margen x MM':'','$ Otros':'','Total':''},
      {'Hora':'17','$ Cargo Fijo':'','$ Cargo Variable':'','$ Gas':'','$ GR/ MW':'','$ Margen x MM':'','$ Otros':'','Total':''},
      {'Hora':'18','$ Cargo Fijo':'','$ Cargo Variable':'','$ Gas':'','$ GR/ MW':'','$ Margen x MM':'','$ Otros':'','Total':''},
      {'Hora':'19','$ Cargo Fijo':'','$ Cargo Variable':'','$ Gas':'','$ GR/ MW':'','$ Margen x MM':'','$ Otros':'','Total':''},
      {'Hora':'20','$ Cargo Fijo':'','$ Cargo Variable':'','$ Gas':'','$ GR/ MW':'','$ Margen x MM':'','$ Otros':'','Total':''},
      {'Hora':'21','$ Cargo Fijo':'','$ Cargo Variable':'','$ Gas':'','$ GR/ MW':'','$ Margen x MM':'','$ Otros':'','Total':''},
      {'Hora':'22','$ Cargo Fijo':'','$ Cargo Variable':'','$ Gas':'','$ GR/ MW':'','$ Margen x MM':'','$ Otros':'','Total':''},
      {'Hora':'23','$ Cargo Fijo':'','$ Cargo Variable':'','$ Gas':'','$ GR/ MW':'','$ Margen x MM':'','$ Otros':'','Total':''},
      {'Hora':'24','$ Cargo Fijo':'','$ Cargo Variable':'','$ Gas':'','$ GR/ MW':'','$ Margen x MM':'','$ Otros':'','Total':''},

    ],
    link:''
  }
];

@Component({
  selector: 'app-plannedPowersPpaF',
  templateUrl: './plannedPowersPpaF.component.html',
  styleUrls: ['./plannedPowersPpaF.component.scss']
})
export class PlannedPowersPPAFComponent implements OnInit {
  //displayedColumns: string[] = ['Potencia Planeada PPA', 'Potencia Planeada Máxima Real Demostrada'];
  //displayedHeader:  string[] = ['Viernes 10 mayo 2019']
  //columnsToDisplay: string[] = this.displayedColumns.slice();
  //colspan = 2;
  title = "Planeación de variables";

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
