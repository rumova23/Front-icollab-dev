import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ModelMarket} from '../../../models/ModelMarket';
import {GlobalService} from '../../../../core/globals/global.service';
import {MarketService} from '../../../services/market.service';
import {ToastrManager} from 'ng6-toastr-notifications';
import {requiredFileType} from '../../../../core/helpers/requiredFileType';
import {Constants} from '../../../../core/globals/Constants';
import {MatTableDataSource} from '@angular/material';
import {Comentario} from '../../../../core/models/comentario';

@Component({
  selector: 'app-mtr-cenace',
  templateUrl: './mtr-cenace.component.html',
  styleUrls: ['./mtr-cenace.component.scss']
})
export class MtrCenaceComponent implements OnInit {
  proposalAcceptedForm: FormGroup;
  file: any;
  fileName: any;
  valid = false;
  progress;

  fileUploadForm: FormGroup;
  submitted = false;
  isdisabled = false;
  headObservaciones = ['#', 'Nombre', 'Observaciones', 'Fecha de ultima modificación'];
  observaciones: Array<any>;
  get f() { return this.fileUploadForm.controls; }

  cols: any[];
  colsGroup: any [];
  dataSource;
  date: Date;
  dateDespatch = '';
  data: Array<ModelMarket> = [];
  constructor(public globalService: GlobalService,
              private marketService: MarketService,
              private toastr: ToastrManager,
              private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.proposalAcceptedForm = this.fb.group({
      file: new FormControl(null, [Validators.required, requiredFileType('xlsx')])
    });
    this.fileUploadForm = this.fb.group({
      file: new FormControl(null, Validators.required),
      fObserva: [{ value: '', disabled: this.isdisabled }, Validators.required]
    });
    this.observaciones = [];
    this.cols = [
      'hour',
      'idSubInt',
      'limitDispatchMax',
      'limitDispatchMin',
      'minimumPowerOperationCost',
      'megawatt1',
      'priceMegawatt1',
      'megawatt2',
      'priceMegawatt2',
      'megawatt3',
      'priceMegawatt3',
      'megawatt4',
      'priceMegawatt4',
      'megawatt5',
      'priceMegawatt5',
      'megawatt6',
      'priceMegawatt6',
      'megawatt7',
      'priceMegawatt7',
      'megawatt8',
      'priceMegawatt8',
      'megawatt9',
      'priceMegawatt9',
      'megawatt10',
      'priceMegawatt10',
      'megawatt11',
      'priceMegawatt11'
    ];
    this.colsGroup = ['-', '--', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
  }

  validate(value) {
    this.valid = false;
    const reader = new FileReader();
    reader.onloadend = (e) => {
      this.file = reader.result;
      this.file = this.file.replace(/^data:(.*;base64,)?/, '');

      this.file = this.file.trim();
      this.fileName = value.file.name;
      this.marketService.validateProposalAcceptedMTR({ file: this.file, name:  this.fileName})
          .subscribe(
              data => {
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

  dateChange(event) {
    this.date = new Date(event.target.value);
    this.loadData();
  }

  private loadData() {
    this.marketService.getModelMarketResultadosMTRCenace(this.date.getTime())
        .subscribe(
            data => {
              const rows = data.rows;
              console.dir(rows);
              this.dateDespatch = data.dateDespatch;
              this.data = [];
              for (var i = 0; i < rows.length; i++) {
                let hour: ModelMarket = {};
                const offerIncrements = rows[i].offerIncrements;
                hour.hour = offerIncrements[0].hour;
                hour.limitDispatchMin = rows[i].planningDetail.limitDespatchMin;
                hour.limitDispatchMax = rows[i].planningDetail.limitDespatchMax;
                hour.idSubInt =  rows[i].planningDetail.idSubInt;
                hour.minimumPowerOperationCost = rows[i].planningCharges.costOperation;
                for (var a = 0; a < offerIncrements.length; a++) {
                  switch (a) {
                    case 0:
                      hour.megawatt1 = offerIncrements[a].megaWatts;
                      hour.priceMegawatt1 = offerIncrements[a].costMegaWatts;
                      break;
                    case 1:
                      hour.megawatt2 = offerIncrements[a].megaWatts;
                      hour.priceMegawatt2 = offerIncrements[a].costMegaWatts;
                      break;
                    case 2:
                      hour.megawatt3 = offerIncrements[a].megaWatts;
                      hour.priceMegawatt3 = offerIncrements[a].costMegaWatts;
                      break;
                    case 3:
                      hour.megawatt4 = offerIncrements[a].megaWatts;
                      hour.priceMegawatt4 = offerIncrements[a].costMegaWatts;
                      break;
                    case 4:
                      hour.megawatt5 = offerIncrements[a].megaWatts;
                      hour.priceMegawatt5 = offerIncrements[a].costMegaWatts;
                      break;
                    case 5:
                      hour.megawatt6 = offerIncrements[a].megaWatts;
                      hour.priceMegawatt6 = offerIncrements[a].costMegaWatts;
                      break;
                    case 6:
                      hour.megawatt7 = offerIncrements[a].megaWatts;
                      hour.priceMegawatt7 = offerIncrements[a].costMegaWatts;
                      break;
                    case 7:
                      hour.megawatt8 = offerIncrements[a].megaWatts;
                      hour.priceMegawatt8 = offerIncrements[a].costMegaWatts;
                      break;
                    case 8:
                      hour.megawatt9 = offerIncrements[a].megaWatts;
                      hour.priceMegawatt9 = offerIncrements[a].costMegaWatts;
                      break;
                    case 9:
                      hour.megawatt10 = offerIncrements[a].megaWatts;
                      hour.priceMegawatt10 = offerIncrements[a].costMegaWatts;
                      break;
                    case 10:
                      hour.megawatt11 = offerIncrements[a].megaWatts;
                      hour.priceMegawatt11 = offerIncrements[a].costMegaWatts;
                      break;
                  }
                }
                this.data.push(hour);
              }
              this.dataSource = new MatTableDataSource<any>(this.data);

            },
            errorData => {
              if (errorData.error.message.indexOf('La Planeacion Existe') > -1) {
                this.toastr.warningToastr(errorData.error.message, 'Warning!');
              } else {
                this.toastr.errorToastr(Constants.ERROR_LOAD, errorData.error.message);
              }
            });
  }

  solicitaReactivarPlanning(value) {
    let reader = new FileReader();
    reader.onloadend = (e) => {
      this.file = reader.result;
      console.dir(reader);
      this.file = this.file.replace(/^data:(.*;base64,)?/, '');
      this.file = this.file.trim();
      this.fileName = value.file.name;
      this.marketService.solicitaReactivarPlannigMTRCenace({
        file: this.file,
        name: this.fileName,
        soporte: this.fileUploadForm.controls.fObserva.value,
        date: this.date.getTime()
      }).subscribe(
          data => {
            this.obtieneObservaciones();
            this.toastr.successToastr(Constants.SAVE_SUCCESS);
          },
          errorData => {
            this.toastr.errorToastr(Constants.ERROR_LOAD, errorData.error.message);
          });
    }
    reader.readAsDataURL(value.file);
  }

  reactivarPlanning() {
    this.marketService.reactivarPlannigMtrCenace(this.date.getTime()).subscribe(
        data => {
          console.dir(data);
          this.toastr.successToastr(Constants.SAVE_SUCCESS);
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, errorData.error.message);
        });
  }

  obtieneObservaciones() {
    this.marketService.getComentariosPlanningMtrCenace(this.date.getTime()).subscribe(
        data => {
          data.forEach(comenta => {
            this.resuelveDS(comenta);
          });
        });
  }
  resuelveDS(comenta) {
    this.observaciones.push(
        new Comentario(comenta.planningSoporteId, comenta.usuarioSoporte, comenta.soporte, comenta.fechaSoporte));
  }

}
