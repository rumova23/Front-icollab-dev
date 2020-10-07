import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-approval-compliance-v',
	templateUrl: './approval-compliance-v.component.html',
	styles: []
})
export class ApprovalComplianceVComponent implements OnInit {
	oData:any;
	constructor() { }

	ngOnInit() {
		console.log(this.oData);
	}

}
