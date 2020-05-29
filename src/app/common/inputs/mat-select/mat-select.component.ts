import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IdLabel } from 'src/app/core/models/IdLabel';

@Component({
  selector: 'app-mat-select'
  ,
  templateUrl: './mat-select.component.html'
  ,
  styleUrls: ['./mat-select.component.scss']
})
export class MatSelectComponent implements OnInit {
  @Output() eventChange   = new EventEmitter<any>();
	@Input() label           : string = '';
	@Input() sufijo          : string = '';
	@Input() submitted       : boolean = false;
	@Input() controlName     : string = null;
  @Input() formGroup       : FormGroup = null;
  @Input() options         : IdLabel[] = [
    {id:1,label:'Alabama'}
    , {id:1,label:'Alaska'}
    , {id:1,label:'Arizona'}
    , {id:1,label:'Arkansas'}
    , {id:1,label:'California'}
    , {id:1,label:'Colorado'}
    , {id:1,label:'Connecticut'}
    , {id:1,label:'Delaware'}
    , {id:1,label:'Florida'}
    , {id:1,label:'Georgia'}
    , {id:1,label:'Hawaii'}
    , {id:1,label:'Idaho'}
    , {id:1,label:'Illinois'}
    , {id:1,label:'Indiana'}
    , {id:1,label:'Iowa'}
    , {id:1,label:'Kansas'}
    , {id:1,label:'Kentucky'}
    , {id:1,label:'Louisiana'}
    , {id:1,label:'Maine'}
    , {id:1,label:'Maryland'}
    , {id:1,label:'Massachusetts'}
    , {id:1,label:'Michigan'}
    , {id:1,label:'Minnesota'}
    , {id:1,label:'Mississippi'}
    , {id:1,label:'Missouri'}
    , {id:1,label:'Montana'}
    , {id:1,label:'Nebraska'}
    , {id:1,label:'Nevada'}
    , {id:1,label:'New Hampshire'}
    , {id:1,label:'New Jersey'}
    , {id:1,label:'New Mexico'}
    , {id:1,label:'New York'}
    , {id:1,label:'North Carolina'}
    , {id:1,label:'North Dakota'}
    , {id:1,label:'Ohio'}
    , {id:1,label:'Oklahoma'}
    , {id:1,label:'Oregon'}
    , {id:1,label:'Pennsylvania'}
    , {id:1,label:'Rhode Island'}
    , {id:1,label:'South Carolina'}
    , {id:1,label:'South Dakota'}
    , {id:1,label:'Tennessee'}
    , {id:1,label:'Texas'}
    , {id:1,label:'Utah'}
    , {id:1,label:'Vermont'}
    , {id:1,label:'Virginia'}
    , {id:1,label:'Washington'}
    , {id:1,label:'West Virginia'}
    , {id:1,label:'Wisconsin'}
    , {id:1,label:'Wyoming'}
  ];
  constructor() { }

  ngOnInit() {
  }
  onSelectChange(e){
		this.eventChange.emit(e);
  }
}
