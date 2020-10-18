import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { GlobalService } from 'src/app/core/globals/global.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { take } from 'rxjs/operators';
import { Constants } from 'src/app/core/globals/Constants';
import { FormBuilder, FormGroup, Validators, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Entity } from 'src/app/core/models/Entity';
import { MarketService } from 'src/app/safe/services/market.service';
import { Validate } from 'src/app/core/helpers/util.validator.';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { EventService } from 'src/app/core/services/event.service';
import { CatalogService } from 'src/app/core/services/catalog.service';
import { FileUploadComponent } from 'src/app/common/fileUpload/fileUpload.component';
import { requiredFileType } from 'src/app/core/helpers/requiredFileType';
import { TimeRegister } from 'src/app/safe/models/TimeRegister';

@Component({
  selector: 'app-fuecdEdit',
  templateUrl: './fuecdEdit.component.html',
  styleUrls: ['./fuecdEdit.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent,
      multi: true
    }
  ]
})

export class FuecdEditComponent implements OnInit {
  fuecdForm: FormGroup;
  file: any;
  fileName: any;
  timeRegisters: Array<TimeRegister> = [];
  columns = ['id', 'fuecd', 'ful', 'date', 'concept',
    'iva', 'totalNet', 'totalAmount'];
  valid: boolean = false;

  progress;

  constructor(public globalService: GlobalService,
    private ngZone: NgZone, private marketService: MarketService,
    private fb: FormBuilder,
    private eventService: EventService,
    private catalogService: CatalogService,
    private toastr: ToastrManager) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.fuecdForm = this.fb.group({
      'file': new FormControl(null, [Validators.required, requiredFileType('xml')])
    });

  }

  validate(value) {
    this.valid = false;
    let reader = new FileReader();
    reader.onloadend = (e) => {
      this.file = reader.result;
      this.file = this.file.replace(/^data:(.*;base64,)?/, '');

      this.file = this.file.trim();
      this.fileName = value.file.name;
      this.marketService.validateFuecd({ file: this.file, name:  this.fileName})
        .subscribe(
          data => {
            const status = data;
            for (let a = 0; a < status.settlements.length; a++) {
              const settlement = status.settlements[a];
              for (let b = 0; b < settlement.settlementInvoices.length; b++) {
                const settlementInvoice = settlement.settlementInvoices[b];

                for (let c = 0; c < settlementInvoice.concepts.length; c++) {
                  const concept = settlementInvoice.concepts[c];

                  let timer: TimeRegister = {};
                  timer.fuecd = status.fuecd;
                  timer.concept = concept.ful;
                  timer.date = settlementInvoice.datePayment;
                  timer.ful = concept.ful;
                  timer.concept = concept.description;
                  timer.iva = concept.iva;
                  timer.totalAmount = concept.totalAmount;
                  timer.totalNet = concept.totalNet;
                  this.timeRegisters.push(timer);
                  for (let d = 0; d < concept.annexeds.length; d++) {
                    const annexed = concept.annexeds[d];

                    for (let e = 0; e < annexed.timeRegisters.length; e++) {
                      const timeRegister = annexed.timeRegisters[e];
                    }
                  }
                }
              }
            }
            this.valid = true;
          },
          errorData => {
            this.fuecdForm.reset();
            this.toastr.errorToastr(Constants.ERROR_LOAD, errorData.error.message);
          });
    }
    reader.readAsDataURL(value.file);
  }

  save() {
      this.marketService.saveFuecd({ file: this.file, name: this.fileName })
        .subscribe(
          data => {

            this.eventService.sendMainSafe(new EventMessage(22, {}));
          },
          errorData => {
            this.fuecdForm.reset();
            this.valid = false;
            this.timeRegisters = [];
            this.toastr.errorToastr(Constants.ERROR_SAVE, errorData);
          });
    
  }

}
