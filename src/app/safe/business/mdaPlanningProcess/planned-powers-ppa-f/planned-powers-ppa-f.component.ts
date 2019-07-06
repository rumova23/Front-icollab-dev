import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';


const ELEMENT_DATA: any[] = [
  {'Hora': 1 ,'$ Cargo Fijo':'2','$ Cargo Variable':'2','$ Gas':'2','$ GR/ MW':'2','$ Margen x MM':'2','$ Otros':'2',}
  ,{'Hora': 2 ,'$ Cargo Fijo':'2','$ Cargo Variable':'2','$ Gas':'2','$ GR/ MW':'2','$ Margen x MM':'2','$ Otros':'2',}
  ,{'Hora': 3 ,'$ Cargo Fijo':'2','$ Cargo Variable':'2','$ Gas':'2','$ GR/ MW':'2','$ Margen x MM':'2','$ Otros':'2',}
  ,{'Hora': 4 ,'$ Cargo Fijo':'2','$ Cargo Variable':'2','$ Gas':'2','$ GR/ MW':'2','$ Margen x MM':'2','$ Otros':'2',}
  ,{'Hora': 5 ,'$ Cargo Fijo':'2','$ Cargo Variable':'2','$ Gas':'2','$ GR/ MW':'2','$ Margen x MM':'2','$ Otros':'2',}
  ,{'Hora': 6 ,'$ Cargo Fijo':'2','$ Cargo Variable':'2','$ Gas':'2','$ GR/ MW':'2','$ Margen x MM':'2','$ Otros':'2',}
  ,{'Hora': 7 ,'$ Cargo Fijo':'2','$ Cargo Variable':'2','$ Gas':'2','$ GR/ MW':'2','$ Margen x MM':'2','$ Otros':'2',}
  ,{'Hora': 8 ,'$ Cargo Fijo':'2','$ Cargo Variable':'2','$ Gas':'2','$ GR/ MW':'2','$ Margen x MM':'2','$ Otros':'2',}
  ,{'Hora': 9 ,'$ Cargo Fijo':'2','$ Cargo Variable':'2','$ Gas':'2','$ GR/ MW':'2','$ Margen x MM':'2','$ Otros':'2',}
  ,{'Hora': 10 ,'$ Cargo Fijo':'2','$ Cargo Variable':'2','$ Gas':'2','$ GR/ MW':'2','$ Margen x MM':'2','$ Otros':'2',}
  ,{'Hora': 11 ,'$ Cargo Fijo':'2','$ Cargo Variable':'2','$ Gas':'2','$ GR/ MW':'2','$ Margen x MM':'2','$ Otros':'2',}
  ,{'Hora': 12 ,'$ Cargo Fijo':'2','$ Cargo Variable':'2','$ Gas':'2','$ GR/ MW':'2','$ Margen x MM':'2','$ Otros':'2',}
  ,{'Hora': 13 ,'$ Cargo Fijo':'2','$ Cargo Variable':'2','$ Gas':'2','$ GR/ MW':'2','$ Margen x MM':'2','$ Otros':'2',}
  ,{'Hora': 14 ,'$ Cargo Fijo':'2','$ Cargo Variable':'2','$ Gas':'2','$ GR/ MW':'2','$ Margen x MM':'2','$ Otros':'2',}
  ,{'Hora': 15 ,'$ Cargo Fijo':'2','$ Cargo Variable':'2','$ Gas':'2','$ GR/ MW':'2','$ Margen x MM':'2','$ Otros':'2',}
  ,{'Hora': 16 ,'$ Cargo Fijo':'2','$ Cargo Variable':'2','$ Gas':'2','$ GR/ MW':'2','$ Margen x MM':'2','$ Otros':'2',}
  ,{'Hora': 17 ,'$ Cargo Fijo':'2','$ Cargo Variable':'2','$ Gas':'2','$ GR/ MW':'2','$ Margen x MM':'2','$ Otros':'2',}
  ,{'Hora': 18 ,'$ Cargo Fijo':'2','$ Cargo Variable':'2','$ Gas':'2','$ GR/ MW':'2','$ Margen x MM':'2','$ Otros':'2',}
  ,{'Hora': 19 ,'$ Cargo Fijo':'2','$ Cargo Variable':'2','$ Gas':'2','$ GR/ MW':'2','$ Margen x MM':'2','$ Otros':'2',}
  ,{'Hora': 20 ,'$ Cargo Fijo':'2','$ Cargo Variable':'2','$ Gas':'2','$ GR/ MW':'2','$ Margen x MM':'2','$ Otros':'2',}
  ,{'Hora': 21 ,'$ Cargo Fijo':'2','$ Cargo Variable':'2','$ Gas':'2','$ GR/ MW':'2','$ Margen x MM':'2','$ Otros':'2',}
  ,{'Hora': 22 ,'$ Cargo Fijo':'2','$ Cargo Variable':'2','$ Gas':'2','$ GR/ MW':'2','$ Margen x MM':'2','$ Otros':'2',}
  ,{'Hora': 23 ,'$ Cargo Fijo':'2','$ Cargo Variable':'2','$ Gas':'2','$ GR/ MW':'2','$ Margen x MM':'2','$ Otros':'2',}
  ,{'Hora': 24 ,'$ Cargo Fijo':'2','$ Cargo Variable':'2','$ Gas':'2','$ GR/ MW':'2','$ Margen x MM':'2','$ Otros':'2',}

];
@Component({
  selector: 'app-planned-powers-ppa-f',
  templateUrl: './planned-powers-ppa-f.component.html',
  styleUrls: ['./planned-powers-ppa-f.component.scss']
})
export class PlannedPowersPpaFComponent implements OnInit {

  title  ="Planeación de variables";
  displayedColumns: string[] = [
    'Hora'               
    ,'$ Cargo Fijo'    
    ,'$ Cargo Variable'
    ,'$ Gas'           
    ,'$ GR/ MW'        
    ,'$ Margen x MM'   
    ,'$ Otros'         
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
  columnsTocheck   : any[]    = [
    '-Hora'               
    ,'$ -Cargo Fijo'    
    ,'$ -Cargo Variable'
    ,'$ -Gas'           
    ,'$ -GR/ MW'        
    ,'$ -Margen x MM'   
    ,'$ -Otros'     
  ];
  constructor() { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
