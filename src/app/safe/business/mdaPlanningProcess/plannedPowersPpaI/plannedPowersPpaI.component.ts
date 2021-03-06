import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';

 
const ELEMENT_DATA: any[] = [
  {'Tarea':'Planeación','1':'','2':'','3':'','4':'','5':'','6':'','7':'','8':'','9':'','10':'','11':'','12':'','13':'','14':'','15':'','16':'','17':'','18':'','19':'','20':'','21':'','22':'','23':'','24':''},
  {'Tarea':'Planeación','1':'','2':'','3':'','4':'','5':'','6':'','7':'','8':'','9':'','10':'','11':'','12':'','13':'','14':'','15':'','16':'','17':'','18':'','19':'','20':'','21':'','22':'','23':'','24':''},
  {'Tarea':'Planeación','1':'','2':'','3':'','4':'','5':'','6':'','7':'','8':'','9':'','10':'','11':'','12':'','13':'','14':'','15':'','16':'','17':'','18':'','19':'','20':'','21':'','22':'','23':'','24':''},
  {'Tarea':'Planeación','1':'','2':'','3':'','4':'','5':'','6':'','7':'','8':'','9':'','10':'','11':'','12':'','13':'','14':'','15':'','16':'','17':'','18':'','19':'','20':'','21':'','22':'','23':'','24':''},
  {'Tarea':'Planeación','1':'','2':'','3':'','4':'','5':'','6':'','7':'','8':'','9':'','10':'','11':'','12':'','13':'','14':'','15':'','16':'','17':'','18':'','19':'','20':'','21':'','22':'','23':'','24':''},
  {'Tarea':'Planeación','1':'','2':'','3':'','4':'','5':'','6':'','7':'','8':'','9':'','10':'','11':'','12':'','13':'','14':'','15':'','16':'','17':'','18':'','19':'','20':'','21':'','22':'','23':'','24':''},
  {'Tarea':'Planeación','1':'','2':'','3':'','4':'','5':'','6':'','7':'','8':'','9':'','10':'','11':'','12':'','13':'','14':'','15':'','16':'','17':'','18':'','19':'','20':'','21':'','22':'','23':'','24':''},
  {'Tarea':'Planeación','1':'','2':'','3':'','4':'','5':'','6':'','7':'','8':'','9':'','10':'','11':'','12':'','13':'','14':'','15':'','16':'','17':'','18':'','19':'','20':'','21':'','22':'','23':'','24':''},
  {'Tarea':'Planeación','1':'','2':'','3':'','4':'','5':'','6':'','7':'','8':'','9':'','10':'','11':'','12':'','13':'','14':'','15':'','16':'','17':'','18':'','19':'','20':'','21':'','22':'','23':'','24':''},
  {'Tarea':'Planeación','1':'','2':'','3':'','4':'','5':'','6':'','7':'','8':'','9':'','10':'','11':'','12':'','13':'','14':'','15':'','16':'','17':'','18':'','19':'','20':'','21':'','22':'','23':'','24':''},
  {'Tarea':'Planeación','1':'','2':'','3':'','4':'','5':'','6':'','7':'','8':'','9':'','10':'','11':'','12':'','13':'','14':'','15':'','16':'','17':'','18':'','19':'','20':'','21':'','22':'','23':'','24':''},
  {'Tarea':'Planeación','1':'','2':'','3':'','4':'','5':'','6':'','7':'','8':'','9':'','10':'','11':'','12':'','13':'','14':'','15':'','16':'','17':'','18':'','19':'','20':'','21':'','22':'','23':'','24':''}

];

@Component({
  selector: 'app-plannedPowersPpaI',
  templateUrl: './plannedPowersPpaI.component.html',
  styleUrls: ['./plannedPowersPpaI.component.scss']
})
export class PlannedPowersPPAIComponent implements OnInit {

  
    title  ="Potencia Planeadas del PPA";
    displayedColumns: string[] = [];
    columnsToDisplay: string[] = [];
    dataSource;
    constructor() { }
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    ngOnInit() {
      let i = 0;
      for (const lst of ELEMENT_DATA) {
        if(i == 0){
          for (const key in lst) {
            this.displayedColumns.push(key);
            this.columnsToDisplay.push(key);
          }
        }
        i+=1;
      }
      this.dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
      //this.columnsToDisplay = this.displayedColumns.slice();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  
  }
  