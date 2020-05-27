import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, Sort } from '@angular/material';
@Component({
	selector: 'app-mat-table',
	templateUrl: './mat-table.component.html',
	styleUrls: ['./mat-table.component.scss']
})
export class MatTableComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	@Output() clickSee    = new EventEmitter<any>();
	@Output() clickEdit   = new EventEmitter<any>();
	@Output() clickDelete = new EventEmitter<any>();
	
	
	
	
	dataSource;
	displayedColumnsActions: any[] = [
		{ key: 'sys_see', label: 'See' },
		{ key: 'sys_edit', label: 'Edit' },
		{ key: 'sys_delete', label: 'Delete' }
	];
	@Input() data: any[] = [
		{id:1, position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
		{id:1, position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
		{id:1, position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
		{id:1, position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
		{id:1, position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
		{id:1, position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
		{id:1, position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
		{id:1, position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
		{id:1, position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
		{id:1, position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
		{id:1, position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
		{id:1, position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
		{id:1, position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
		{id:1, position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
		{id:1, position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
		{id:1, position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
		{id:1, position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
		{id:1, position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
		{id:1, position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
		{id:1, position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
	];
	@Input() columnsLabels: any[] = [
		{ key: 'name', label: 'Name' },
		{ key: 'position', label: 'tester' },
		{ key: 'weight', label: 'weight' },
	];
	@Input() columnsDisplay: string[] = [
		'name',
		'position',
		'weight',
		'sys_edit',
		'sys_delete',
		'sys_see'
	];
	@Input() row_x_page = [5,10,20,50, 100, 250, 500];

	constructor() { }

	ngOnInit() {
		this.data;
		this.columnsLabels;
		this.columnsDisplay;
		debugger;
		this.refresh();
	}
	initExample(){



		/*this.dataSource.sortingDataAccessor = (item, property) => {
			switch(property) {
				case 'name'        : return item.name;
				case 'dateUpdated' : dateUpdated = ((item.element.dateUpdated != null) ? item.element.dateUpdated : item.element.dateCreated);
					return new Date(dateUpdated).getTime();
				default            : return item[property];
			}
		}//*/
	}

    sortData(sort: Sort) {        
	}
	refresh(){
		this.dataSource = new MatTableDataSource<any>(this.data);
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}
	see(e){
		this.clickSee.emit(e);
	}
	edit(e){
		this.clickEdit.emit(e);
	}
	delete(e){
		this.clickDelete.emit(e);
	}
}
