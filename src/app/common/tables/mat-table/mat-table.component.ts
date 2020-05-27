import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, Sort } from '@angular/material';
import { Observable, of } from 'rxjs';
const ELEMENT_DATA = [
	{position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
	{position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
	{position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
	{position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
	{position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
	{position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
	{position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
	{position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
	{position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
	{position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
	{position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
	{position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
	{position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
	{position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
	{position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
	{position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
	{position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
	{position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
	{position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
	{position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
  ];
@Component({
	selector: 'app-mat-table',
	templateUrl: './mat-table.component.html',
	styleUrls: ['./mat-table.component.scss']
})
export class MatTableComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	
	dataSource;
	data: any[] = [];
	displayedColumnsLabel: any[] = [];
	displayedColumnsActions: any[] = [];
	columnsToDisplay: string[] = [];
	row_x_page = [5,10,20,50, 100, 250, 500];

	filteredfJob        : Observable<any[]>;
	constructor() { }

	ngOnInit() {
		this.filteredfJob= of(ELEMENT_DATA);
		this.displayedColumnsLabel = [
			{ key: 'name', label: 'Name' },
			{ key: 'position', label: 'position' },
		];
		this.columnsToDisplay = [
			'name',
			'position'
		];
		
		this.displayedColumnsActions.push({
			key: 'sys_see',
			label: 'See'
		});
		this.columnsToDisplay.push('sys_see');

		this.dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
		this.dataSource.paginator = this.paginator;
		/*this.dataSource.sortingDataAccessor = (item, property) => {
			switch(property) {
				case 'name'        : return item.name;
				case 'dateUpdated' : dateUpdated = ((item.element.dateUpdated != null) ? item.element.dateUpdated : item.element.dateCreated);
					return new Date(dateUpdated).getTime();
				default            : return item[property];
			}
		}//*/
		this.dataSource.sort = this.sort;
	}

    sortData(sort: Sort) {
        
    }
}
