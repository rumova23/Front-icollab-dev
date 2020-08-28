import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { EventService } from 'src/app/core/services/event.service';
import { DatePipe } from '@angular/common';
import { EventMessage } from 'src/app/core/models/EventMessage';

@Component({
	selector: 'app-bits-incidents-environmental-abc',
	templateUrl: './bits-incidents-environmental-abc.component.html',
	styleUrls: ['./bits-incidents-environmental-abc.component.scss']
})
export class BitsIncidentsEnvironmentalABCComponent implements OnInit {
	formNew : FormGroup;

	disabledSubmit = false;
	disabledBtnFinish = false;
	disabledToRefuse = false;
	disabledToAccept = false;

	constructor(
		private formBuilder: FormBuilder,
		public globalService: GlobalService,
		public toastr: ToastrManager,
		public eventService: EventService,
		private datePipe: DatePipe,
	) { }

	ngOnInit() {
		this.formNew = this.formBuilder.group({
			tag:[{value:null,disabled:true},[Validators.required]]
		});
	}
	onFomrNew(o){
		console.log(o);
		
	}
	btnClickBack(){
		const type = {};
		this.eventService.sendChangePage(
			new EventMessage(null, type, 'Bits.BitsIncidentsEnvironmental')
		);
	}
	btnFinish(){
		console.log("btnFinish()");
		
	}
	btnSend(){
		console.log("btnSend()");
		
	}
	btnChangeStatus(status:String){
		console.log(status);
		
	}
}
