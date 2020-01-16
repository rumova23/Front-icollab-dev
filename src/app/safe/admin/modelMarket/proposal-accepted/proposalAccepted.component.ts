import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {GlobalService} from '../../../../core/globals/global.service';
import {Constants} from '../../../../core/globals/Constants';
import {MarketService} from '../../../services/market.service';
import {ToastrManager} from 'ng6-toastr-notifications';
import {requiredFileType} from '../../../../core/helpers/requiredFileType';

@Component({
  selector: 'app-proposal-accepted',
  templateUrl: './proposalAccepted.component.html',
  styleUrls: ['./proposalAccepted.component.scss']
})
export class ProposalAcceptedComponent implements OnInit {

  proposalAcceptedForm: FormGroup;
  file: any;
  fileName: any;
  valid = false;
  progress;

  constructor(public globalService: GlobalService,
              private marketService: MarketService,
              private toastr: ToastrManager,
              private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.proposalAcceptedForm = this.fb.group({
      'file': new FormControl(null, [Validators.required, requiredFileType('xlsx')])
    });
  }
  validate(value) {
    this.valid = false;
    const reader = new FileReader();
    reader.onloadend = (e) => {
      this.file = reader.result;
      this.file = this.file.replace(/^data:(.*;base64,)?/, '');

      this.file = this.file.trim();
      this.fileName = value.file.name;
      this.marketService.validateProposalAccepted({ file: this.file, name:  this.fileName})
          .subscribe(
              data => {
                console.dir(data);
                if (data.success) {
                  this.toastr.successToastr(data.message, '¡Se ha logrado!');
                }
                if (!data.success) {
                  this.toastr.errorToastr(data.message + '. Codigo: ' + data.code, '!Error¡');
                }
              },
              errorData => {
                this.toastr.errorToastr(Constants.ERROR_LOAD, errorData);
              });
    }
    reader.readAsDataURL(value.file);
  }

}
