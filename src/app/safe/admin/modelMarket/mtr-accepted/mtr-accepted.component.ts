import { Component, OnInit } from '@angular/core';
import {ModelMarket} from '../../../models/ModelMarket';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatTableDataSource} from '@angular/material';
import {Constants} from '../../../../core/globals/Constants';
import {GlobalService} from '../../../../core/globals/global.service';
import {MarketService} from '../../../services/market.service';
import {ToastrManager} from 'ng6-toastr-notifications';
import {Comentario} from '../../../../core/models/comentario';

@Component({
  selector: 'app-mtr-accepted',
  templateUrl: './mtr-accepted.component.html',
  styleUrls: ['./mtr-accepted.component.scss']
})
export class MtrAcceptedComponent implements OnInit {
  title = 'Consulta MTR';
  date: Date;
  dateDespatch = '';
  dataSource;
  data: Array<ModelMarket> = [];

  cols: any[];
  colsGroup: any [];

  submitted = false;
  isdisabled = false;
  headObservaciones = ['#', 'Nombre', 'Observaciones', 'Fecha de ultima modificación'];
  observaciones: Array<any>;
  get f() { return this.fileUploadForm.controls; }


  progress;
  fileUploadForm: FormGroup;
  file: any;
  fileName: any;
  valid = false;

  constructor(
      public globalService: GlobalService,
      private marketService: MarketService,
      private toastr: ToastrManager,
      private fb: FormBuilder) { }

  ngOnInit() {
  }


  dateChange(event) {
    this.date = new Date(event.target.value);
    this.loadData();
  }

  private loadData() {
    this.marketService.getModelMarketAccept(this.date.getTime())
        .subscribe(
            data => {
              const rows = data.rows;
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
              this.obtieneObservaciones();
            },
            errorData => {
              if (errorData.error.message.indexOf('La Planeacion Existe') > -1) {
                this.toastr.warningToastr(errorData.error.message, 'Warning!');
              } else {
                this.toastr.errorToastr(Constants.ERROR_LOAD, errorData.error.message);
              }
            });
  }
  obtieneObservaciones() {
    this.marketService.getComentariosPlanning(this.date.getTime()).subscribe(
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
