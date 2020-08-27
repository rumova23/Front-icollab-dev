import { Component, OnInit } from '@angular/core';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { EventService } from 'src/app/core/services/event.service';

@Component({
	selector: 'app-bits-incidents-environmental',
	templateUrl: './bits-incidents-environmental.component.html',
	styleUrls: ['./bits-incidents-environmental.component.scss']
})
export class BitsIncidentsEnvironmentalComponent implements OnInit {
	tableData = [
		{order:1,name:"algo"}
	];
	tableRowXpage = [50,100];
	constructor(
		public eventService : EventService
	) { }

	ngOnInit() {
	}
	onbtnAdd(){
		
		console.log('onbtnAdd');
		const type = {
            dto: null,
            action: 'nuevo',
			name: '',
			element: {tester: 'tester'}
        };
  		this.eventService.sendChangePage(
            new EventMessage(null, type, 'Bits.BitsIncidentsEnvironmentalABC')
        );
	}
	onTableRowSee(e){
		console.log(e);		
	}
	onTableRowEdit(e){
		console.log(e);		
	}
	onTableRowDelete(e){
		console.log(e);		
	}
}
