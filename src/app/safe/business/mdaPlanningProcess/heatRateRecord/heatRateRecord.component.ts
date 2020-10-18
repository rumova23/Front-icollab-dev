import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';

const ELEMENT_DATA: any[] = [
  {'#': 1,'fecha de registro': '14/05/2019', 'usuario que registro': 'usuario 1', 'HEATE RATE kj/MWv Punto 1': 6700, 'HEATE RATE kj/MWv Punto 2':6700},
];
@Component({
  selector: 'app-heatRateRecord',
  templateUrl: './heatRateRecord.component.html',
  styleUrls: ['./heatRateRecord.component.scss']
})
export class HeatRateRecordComponent implements OnInit {
  title  ="Registro del Heat Rate";
  displayedColumns: string[] = ['#', 'fecha de registro', 'usuario que registro', 'HEATE RATE kj/MWv Punto 1', 'HEATE RATE kj/MWv Punto 2'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
  constructor() { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
