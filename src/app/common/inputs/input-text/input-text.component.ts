import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent implements OnInit {
  /**
    <app-input-text label="Nombre(s)" formControlName="fNames" [formGroup]="perfilForm" [submitted]="submitted" >
    </app-input-text>
   */
	@Input() label           : string = '';
	@Input() sufijo          : string = '';
	@Input() submitted       : boolean = false;
	@Input() controlName     : string = null;
	@Input() formGroup       : FormGroup = null;
  constructor() { }

  ngOnInit() {
  }

}
