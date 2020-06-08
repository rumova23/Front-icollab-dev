import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Moment } from 'moment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IdLabel } from 'src/app/core/models/IdLabel';
import * as moment from 'moment';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
	selector: 'app-security-doc',
	templateUrl: './security-doc.component.html',
	styleUrls: ['./security-doc.component.scss']
})
export class SecurityDocComponent implements OnInit {
	listOptionsAutocomplete = ['One', 'Two', 'Three','Three','Threes','María'];
	form : FormGroup;
	tableDataDemo = [
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
	selectOptionsFuente : IdLabel[] = [
		{id:"1",label:'FileZilla FTP'},
		{id:"2",label:'PAYSERVER DB'},
		{id:"3",label:'PI SERVER DB'},
		{id:"4",label:'Manual'}
	];
	selection : SelectionModel<any> = new SelectionModel<any>(true, []);
	
	constructor(
		public toastr: ToastrManager,
		private formBuilder: FormBuilder
	) { }

	ngOnInit() {
		this.selection.select(this.tableDataDemo[2]);
		this.selection.changed.subscribe(event=>{
			let algo = this.selection.selected;
			debugger;
		});
		this.form = this.formBuilder.group({
			name: [{ value: '', disabled: false }, Validators.required],
			aotucomplete: [{ value: '', disabled: false }, Validators.required],
			dateYearAndMonth:[{ value: moment(), disabled: false }],
			select: [{ value: '', disabled: false }, Validators.required]
		});
	}
	
	clickBtn() {
		console.log(this.selection.selected);
		
		console.log(this.form.value);
		this.toastr.successToastr('Evento click', '¡Se ha logrado!');
	}
	chosenMonthHandler(d: Moment) {
		this.toastr.successToastr(d.format('MM/yyyy'), '¡Se ha logrado!');
	}

	onChangeSelectFuente(e){
		this.toastr.successToastr('Evento change', '¡Fuente seleccionada!');
	}
	
	tableRowDelete(element){
		console.log(element);
	}
	tableRowSee(element){
		console.log(element);
	}
	tableRowEdit(element){
		console.log(element);
	}
}
