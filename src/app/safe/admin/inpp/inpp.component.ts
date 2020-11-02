import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Pml } from '../../models/Pml';
import { GlobalService } from 'src/app/core/globals/global.service';
import { MarketService } from '../../services/market.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { EventService } from 'src/app/core/services/event.service';
import { EventMessage } from 'src/app/core/models/EventMessage';
import { EventBlocked } from 'src/app/core/models/EventBlocked';
import { Constants } from 'src/app/core/globals/Constants';


@Component({
  selector: 'app-inpp',
  templateUrl: './inpp.component.html',
  styleUrls: ['./inpp.component.scss']
})
export class InppComponent implements OnInit {
  displayedColumns: string[] = [
  'date', 'data'];
  dataSource = new MatTableDataSource<Pml>();
  conexionForm: FormGroup;
  search: any = {};

  constructor(private marketService: MarketService,  public toastr: ToastrManager,
    private eventService : EventService,
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
    
    this.marketService.getInpp(data).subscribe(
        dataP => {
          this.dataSource.data = dataP;
          /*
          if(dataP.length === 0) {
            this.toastr.warningToastr('No hay datos para mostrar')
          } */
          
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Lo siento,')
          
        });
  }

  onSubmit(value:any){
    this.loadData({
      yearInit: value.yearInit,
      yearEnd: value.yearEnd
    })
  }

  formatDate(date: Date) {
    const month = ((date.getMonth() + 1) <= 9) ? "0" 
     + (date.getMonth() + 1): (date.getMonth() + 1) ;
     const day = (date.getDate() <= 9) ? "0" + date.getDate(): date.getDate();
    return date.getFullYear() + '-' + month + '-' + day;
  }

}
