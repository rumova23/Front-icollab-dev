import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-phase2v3',
	templateUrl: './phase2v3.component.html',
	styleUrls: ['./phase2v3.component.scss']
})
export class Phase2v3Component implements OnInit {
	expected={
		eat:{
			powerOutput:440.55,
			capacityFactor:89
		},
		est:{
			powerOutput:455.4,
			capacityFactor:92
		}
	}
	table = {
		overview:[
			{
				tag:"power",
				value:{
				actuals:{value:5,max:6},
				dif:{value:5,max:6},
				expected:{value:5,max:6}
				}
			}
		],
		est:[
			{
				tag:"power",
				value:{
				actuals:{value:5,max:6},
				dif:{value:5,max:6},
				expected:{value:5,max:6}
				}
			}
		],
		eat:[
			{
				tag:"power",
				value:{
				actuals:{value:5,max:6},
				dif:{value:5,max:6},
				expected:{value:5,max:6}
				}
			}
		]
	};
	constructor() { }

	ngOnInit() {
	}

}
