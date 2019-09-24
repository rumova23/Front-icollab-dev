import { Component, OnInit, ViewChild,  } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/core/globals/global.service';
import { MarketService } from '../../services/market.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { EventBlocked } from 'src/app/core/models/EventBlocked';
import { Constants } from 'src/app/core/globals/Constants';

var root;

@Component({
  selector: 'app-usppi',
  templateUrl: './usppi.component.html',
  styleUrls: ['./usppi.component.scss']
})
export class UsppiComponent implements OnInit {
  displayedColumns: string[] = [
    'year', 'January', 'February',
    'March', 'April', 'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December'];
  public dataSource = new MatTableDataSource();
  conexionForm: FormGroup;
  search: any = {};
  root = this;
  constructor(private marketService: MarketService, public toastr: ToastrManager,
    private eventService: EventService,
    private globalService: GlobalService, private fb: FormBuilder) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.conexionForm = new FormGroup({
      'yearInit': new FormControl('', Validators.required),
      'yearEnd': new FormControl('', Validators.required)
    });
    this.search = {
      dateInit: new Date(),
      dateEnd: new Date()
    };
  }

  private loadData(data: any) {
    this.addBlock(1, null);
    this.marketService.getUsppi(data).subscribe(
      dataP => {

        const result = dataP.Results.series[0].data;
        let datas = [];

        for (var i = data.yearInit; i <= data.yearEnd; i++) {
          datas.push({
            year: i,
            January: "",
            February: "",
            March: "",
            April: "",
            May: "",
            June: "",
            July: "",
            August: "",
            September: "",
            October: "",
            November: "",
            December: ""
          })
        }

        for (var a = 0; a < datas.length; a++) {

          for (var e = 0; e < result.length; e++) {

            if (String(datas[a].year) === result[e].year) {

              switch (result[e].periodName) {
                case 'January':
                  datas[a].January = result[e].value;
                  break;
                case 'February':
                  datas[a].February = result[e].value;
                  break;
                case 'March':
                  datas[a].March = result[e].value;
                  break;
                case 'April':
                  datas[a].April = result[e].value;
                  break;
                case 'May':
                  datas[a].May = result[e].value;
                  break;
                case 'June':
                      datas[a].June = result[e].value;
                      break;  
                case 'July':
                  datas[a].July = result[e].value;
                  break;
                case 'August':
                  datas[a].August = result[e].value;
                  break;
                case 'September':
                  datas[a].September = result[e].value;
                  break;
                case 'October':
                  datas[a].October = result[e].value;
                  break;
                case 'November':
                  datas[a].November = result[e].value;
                  break;
                case 'December':
                  datas[a].December = result[e].value;
                  break;
              }
            }
          }
        }

        setTimeout(function(){

          this.dataSource.data = datas;
       }.bind(this), 500);

        /*
        if(dataP.length === 0) {
          this.toastr.warningToastr('No hay datos para mostrar')
        } */
        this.addBlock(2, null);
      },
      errorData => {
        this.toastr.errorToastr(Constants.ERROR_LOAD, 'Lo siento,')
        this.addBlock(2, null);
      });
  }

  onSubmit(value: any) {
    this.loadData({
      yearInit: value.yearInit,
      yearEnd: value.yearEnd
    })
  }

  formatDate(date: Date) {
    const month = ((date.getMonth() + 1) <= 9) ? "0"
      + (date.getMonth() + 1) : (date.getMonth() + 1);
    const day = (date.getDate() <= 9) ? "0" + date.getDate() : date.getDate();
    return date.getFullYear() + '-' + month + '-' + day;
  }

  private addBlock(type, msg): void {
    this.eventService.sendApp(new EventMessage(1,
      new EventBlocked(type, msg)));
  }
}
