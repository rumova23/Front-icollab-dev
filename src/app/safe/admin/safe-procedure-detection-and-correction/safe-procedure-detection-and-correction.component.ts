import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { timer } from 'rxjs';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import {MY_FORMAT_DATE_PICKER} from '../../../core/models/MyFormatDatePicker';
import * as moment from 'moment';

import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { EventBlocked } from 'src/app/core/models/EventBlocked';
import { GlobalService } from 'src/app/core/globals/global.service';
import { time } from 'highcharts';

@Component({
  selector: 'app-safe-procedure-detection-and-correction',
  templateUrl: './safe-procedure-detection-and-correction.component.html',
  styleUrls: ['./safe-procedure-detection-and-correction.component.scss'],
	providers: [
		{
		  provide: DateAdapter,
		  useClass: MomentDateAdapter,
		  deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
		},
	
		{provide: MAT_DATE_FORMATS, useValue: MY_FORMAT_DATE_PICKER},
	  ],
})
export class SafeProcedureDetectionAndCorrectionComponent implements OnInit {

	date = new FormControl(moment());
	constructor(
		public globalService: GlobalService,
		public eventService: EventService) { }

	ngOnInit() {
	}
	ejecutaProceso(){
		this.addBlock(1,"");

		timer(2000).subscribe(()=>{
			this.addBlock(2,"");
		});
	}
	download(){
		this.addBlock(1,"");

		timer(2000).subscribe(()=>{
			this.addBlock(2,"");
		});
	}
	
	private addBlock(type, msg): void {
		this.eventService.sendApp(new EventMessage(1,
			new EventBlocked(type, msg)));
	}
	chosenYearHandler(normalizedYear: any) {
		const ctrlValue = this.date.value;
		ctrlValue.year(normalizedYear.year());
		this.date.setValue(ctrlValue);
	}

	chosenMonthHandler(normalizedMonth: any, datepicker: MatDatepicker<any>) {
		const ctrlValue = this.date.value;
		ctrlValue.month(normalizedMonth.month());
		this.date.setValue(ctrlValue);
		datepicker.close();
	}
}
