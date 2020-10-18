import { Component, OnInit, ViewChild, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, Sort } from '@angular/material';
import { ColumnLabel } from '../../../core/models/ColumnLabel';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
	selector: 'app-mat-table',
	templateUrl: './mat-table.component.html',
	styleUrls: ['./mat-table.component.scss']
})
export class MatTableComponent implements OnInit , OnChanges {
	// LA PROPIEDAD 'ORDER' ES NECESARIA EN EL DATA SI SE DESEA QUE SEA ORDENABLE ESTA COLUMNA
	// por eso se descarto dejar el incremental en el html
    @ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	@Output() clickSee    = new EventEmitter<any>();
	@Output() clickEdit   = new EventEmitter<any>();
	@Output() clickDelete = new EventEmitter<any>();
	@Output() clickLink   = new EventEmitter<any>();
	@Output() onSelected    = new EventEmitter<any>();
	@Input() row_x_page   = [5,10,20,50, 100, 250, 500];
	@Input() selection      : SelectionModel<any> = new SelectionModel<any>(true, []);
	@Input() selectionLabel : string = '';
	@Input() data           : any[] = [];
	@Input() columnsLabels  : ColumnLabel[] = [];
	@Input() columnsDisplay : string[] = [];
	@Input() showPagination : boolean = true;
	@Input() maxHeight      : String = null;

	dataSource;
	displayedColumnsActions: any[] = [
		{ key: 'sys_see'    , label: 'See'    },
		{ key: 'sys_edit'   , label: 'Edit'   },
		{ key: 'sys_delete' , label: 'Delete' }
	];
	constructor() { }

	ngOnInit() {
	}
	initExample(){
		this.data = [
			{order: 1, id:1,  name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
			{order: 2, id:2,  name: 'Helium', weight: 4.0026, symbol: 'He'},
			{order: 3, id:3,  name: 'Lithium', weight: 6.941, symbol: 'Li'},
			{order: 4, id:4,  name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
			{order: 5, id:5,  name: 'Boron', weight: 10.811, symbol: 'B'},
			{order: 6, id:6,  name: 'Carbon', weight: 12.0107, symbol: 'C'},
			{order: 7, id:7,  name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
			{order: 8, id:8,  name: 'Oxygen', weight: 15.9994, symbol: 'O'},
			{order: 9, id:9,  name: 'Fluorine', weight: 18.9984, symbol: 'F'},
			{order: 10, id:10,  name: 'Neon', weight: 20.1797, symbol: 'Ne'},
			{order: 11, id:11,  name: 'Sodium', weight: 22.9897, symbol: 'Na'},
			{order: 12, id:12,  name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
			{order: 13, id:13,  name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
			{order: 14, id:14,  name: 'Silicon', weight: 28.0855, symbol: 'Si'},
			{order: 15, id:15,  name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
			{order: 16, id:16,  name: 'Sulfur', weight: 32.065, symbol: 'S'},
			{order: 17, id:17,  name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
			{order: 18, id:18,  name: 'Argon', weight: 39.948, symbol: 'Ar'},
			{order: 19, id:19,  name: 'Potassium', weight: 39.0983, symbol: 'K'},
			{order: 20, id:20,  name: 'Calcium', weight: 40.078, symbol: 'Ca'},
		];
		this.columnsLabels = [
			{ key: 'order', label: '#' },
			{ key: 'name', label: 'Name' },
			{ key: 'weight', label: 'weight' },
			{ key: 'symbol', label: 'symbol' },
		];
		this.columnsDisplay = [
			'order',
			'name',
			'weight',
			'symbol',
			'sys_edit',    // No es necesario ponerlo en el array columnsLabels
			'sys_delete',  // No es necesario ponerlo en el array columnsLabels
			'sys_see'      // No es necesario ponerlo en el array columnsLabels
		];
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
	ngOnChanges(changes: SimpleChanges) {
		this.init();
	}
	init(){
		if(Array.isArray(this.data) && this.data.length > 0){
			if(Array.isArray(this.columnsLabels) ){
				for (const key in this.data[0]) {
					if (this.data[0].hasOwnProperty(key)) {
						if(! this.columnsLabels.some(element=>element.key==key)){
							this.columnsLabels.push({key, label: key});
						}
					}
				}
			}
			if(Array.isArray(this.columnsDisplay) && this.columnsDisplay.length == 0 ){
				const o = this.data[0];
				this.columnsDisplay.push('sys_checkbox');
				for (const key in o) {
					if (o.hasOwnProperty(key)) {
						this.columnsDisplay.push(key);
					}
				}
				this.columnsDisplay.push('sys_see');
				this.columnsDisplay.push('sys_edit');
				this.columnsDisplay.push('sys_delete');
			}
		
			this.dataSource = new MatTableDataSource<any>(this.data);
			this.dataSource.paginator = this.paginator;    // este no funcionara si la tabla se inicializa con datos ya que estos seran null 
			this.dataSource.sort = this.sort;
		}else if(Array.isArray(this.data) && this.data.length == 0){
			if(Array.isArray(this.columnsDisplay) && this.columnsDisplay.length > 0){
				this.columnsDisplay.forEach(key=>{
					if(!key.includes("sys_") && ! this.columnsLabels.some(element=>element.key==key)){
						this.columnsLabels.push({key, label: key});
					}
				});
			}
			this.dataSource = new MatTableDataSource<any>([]);
		}
	}
	see(e){
		this.clickSee.emit(e);
	}
	edit(e){
		this.clickEdit.emit(e);
	}
	delete(e, row: any){
		this.clickDelete.emit(e);
	}
	selected(e, row: any) {
		e.stopImmediatePropagation();
		this.onSelected.emit(row);
	}
	link(element,identifier){
		this.clickLink.emit({identifier,element});
	}

	
	/** Whether the number of selected elements matches the total number of rows. */
	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;
		return numSelected === numRows;
	}

	/** Selects all rows if they are not all selected; otherwise clear selection. */
	masterToggle() {
		this.isAllSelected() ?
			this.selection.clear() :
			this.dataSource.data.forEach(row => this.selection.select(row));
	}

	/** The label for the checkbox on the passed row */
	checkboxLabel(row?: any): string {
		if (!row) {
		return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
		}
		return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
	}
}
