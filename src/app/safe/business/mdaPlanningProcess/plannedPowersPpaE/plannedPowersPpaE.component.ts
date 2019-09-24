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
    date:'_',
    powers:[
      {'Hora':'1', 'ID_SUB_INT': 1},
      {'Hora':'2', 'ID_SUB_INT': 1},
      {'Hora':'3', 'ID_SUB_INT': 1},
      {'Hora':'4', 'ID_SUB_INT': 1},
      {'Hora':'5', 'ID_SUB_INT': 1},
      {'Hora':'6', 'ID_SUB_INT': 1},
      {'Hora':'7', 'ID_SUB_INT': 1},
      {'Hora':'8', 'ID_SUB_INT': 1},
      {'Hora':'9', 'ID_SUB_INT': 1},
      {'Hora':'10', 'ID_SUB_INT': 1},
      {'Hora':'11', 'ID_SUB_INT': 1},
      {'Hora':'12', 'ID_SUB_INT': 1},
      {'Hora':'13', 'ID_SUB_INT': 1},
      {'Hora':'14', 'ID_SUB_INT': 1},
      {'Hora':'15', 'ID_SUB_INT': 1},
      {'Hora':'16', 'ID_SUB_INT': 1},
      {'Hora':'17', 'ID_SUB_INT': 1},
      {'Hora':'18', 'ID_SUB_INT': 1},
      {'Hora':'19', 'ID_SUB_INT': 1},
      {'Hora':'20', 'ID_SUB_INT': 1},
      {'Hora':'21', 'ID_SUB_INT': 1},
      {'Hora':'22', 'ID_SUB_INT': 1},
      {'Hora':'23', 'ID_SUB_INT': 1},
      {'Hora':'24', 'ID_SUB_INT': 1},
    ]
  },
  {
    date:'____',
    powers:[
      {'Lim. Despacho máx. MW':'3','Lim. Despacho mín. MW':'2','Costo de operación a potencia mín. $/h':'s'},
    ]
  },

  
  {
    date:'1',
    powers:[
      {'MW':'1', '$/MWh': 1},
      {'MW':'1', '$/MWh': 1}
    ]
  },
  {
    date:'2',
    powers:[
      {'MW':'1', '$/MWh': 1},
      {'MW':'1', '$/MWh': 1}
    ]
  },
  {
    date:'3',
    powers:[
      {'MW':'1', '$/MWh': 1},
      {'MW':'1', '$/MWh': 1}
    ]
  },
  {
    date:'4',
    powers:[
      {'MW':'1', '$/MWh': 1},
      {'MW':'1', '$/MWh': 1}
    ]
  },
  {
    date:'5',
    powers:[
      {'MW':'1', '$/MWh': 1},
      {'MW':'1', '$/MWh': 1}
    ]
  },
  {
    date:'6',
    powers:[
      {'MW':'1', '$/MWh': 1},
      {'MW':'1', '$/MWh': 1}
    ]
  },
  {
    date:'7',
    powers:[
      {'MW':'1', '$/MWh': 1},
      {'MW':'1', '$/MWh': 1}
    ]
  },
  {
    date:'8',
    powers:[
      {'MW':'1', '$/MWh': 1},
      {'MW':'1', '$/MWh': 1}
    ]
  },
  {
    date:'9',
    powers:[
      {'MW':'1', '$/MWh': 1},
      {'MW':'1', '$/MWh': 1}
    ]
  },
  {
    date:'10',
    powers:[
      {'MW':'1', '$/MWh': 1},
      {'MW':'1', '$/MWh': 1}
    ]
  },
  {
    date:'11',
    powers:[
      {'MW':'1', '$/MWh': 1},
      {'MW':'1', '$/MWh': 1}
    ]
  }
];

@Component({
  selector: 'app-plannedPowersPpaE',
  templateUrl: './plannedPowersPpaE.component.html',
  styleUrls: ['./plannedPowersPpaE.component.scss']
})
export class PlannedPowersPPAEComponent implements OnInit {
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


    this.dataSource = new MatTableDataSource<any>(this.data);
    //this.columnsToDisplay.push('Potencia Planeada PPA', 'Potencia Planeada Máxima Real Demostrada');
    //this.dataSource.paginator = this.paginator;
  }

}
