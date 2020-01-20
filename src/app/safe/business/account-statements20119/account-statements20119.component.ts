import { Component, OnInit } from '@angular/core';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

const ELEMENT_DATA: any[] = [
  {
    order:'order',
    FUECD:'FUECD',
    fechaOperacion:'fechaOperacion',
    fechaEmision:'fechaEmision',
    claveParticipante:'claveParticipante',
    claveSubcuenta:'claveSubcuenta',
    claveSistema:'claveSistema',
    sys_see:'sys_see',
    sys_edit:'sys_edit',
    sys_delete:'sys_delete'
  },
];
@Component({
  selector: 'app-account-statements20119',
  templateUrl: './account-statements20119.component.html',
  styleUrls: ['./account-statements20119.component.scss']
})
export class AccountStatements20119Component implements OnInit {

  dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
  displayedColumnsOrder = [
    { key: 'order', label: '#' },
    { key: 'FUECD', label: 'FUECD' },
    { key: 'fechaOperacion', label: 'fechaOperacion' },
    { key: 'fechaEmision', label: 'fechaEmision' },
    { key: 'claveParticipante',label: 'claveParticipante'},
    { key: 'claveSubcuenta', label: 'claveSubcuenta' },
    { key: 'claveSistema', label: 'claveSistema' }
];
displayedColumnsActions = [
  { key: 'sys_see', label: 'See' },
  { key: 'sys_edit', label: 'Edit' },
  { key: 'sys_delete', label: 'Delete' }
];
  columnsToDisplay: string[] = [
    'order',
    'FUECD',
    'fechaOperacion',
    'fechaEmision',
    'claveParticipante',
    'claveSubcuenta',
    'claveSistema',
    'sys_see',
    'sys_edit',
    'sys_delete'
  ];
  row_x_page = [50, 100, 250, 500];
  constructor() { }

  ngOnInit() {
  }
  sortData(e){}
}
