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
  selector: 'app-financialIndexes',
  templateUrl: './financialIndexes.component.html',
  styleUrls: ['./financialIndexes.component.scss']
})
export class FinancialIndexesComponent implements OnInit {
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
      'dateInit': new FormControl('', Validators.required),
      'dateEnd': new FormControl('', Validators.required)
    });
    this.search = {
      dateInit: new Date(),
      dateEnd: new Date()
    };
  }

  private loadData(data: any) {
    this.addBlock(1, null);
    this.marketService.getFinalcialIndexes(data).subscribe(
        dataP => {
          console.log(dataP);
          this.dataSource.data = dataP.bmx.series[0].datos;
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

  onSubmit(value:any){
    this.loadData({
      dateInit: this.formatDate( new Date(value.dateInit)),
      dateEnd: this.formatDate( new Date(value.dateEnd)),
      limit: 4000,
      process: value.process
    })
  }

  formatDate(date: Date) {
    const month = ((date.getMonth() + 1) <= 9) ? "0" 
     + (date.getMonth() + 1): (date.getMonth() + 1) ;
     const day = (date.getDate() <= 9) ? "0" + date.getDate(): date.getDate();
    return date.getFullYear() + '-' + month + '-' + day;
  }

  private addBlock(type, msg): void {
    this.eventService.sendApp(new EventMessage(1, 
      new EventBlocked(type, msg)));
  }
}
