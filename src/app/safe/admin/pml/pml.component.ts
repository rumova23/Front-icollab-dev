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
  selector: 'app-pml',
  templateUrl: './pml.component.html',
  styleUrls: ['./pml.component.scss']
})
export class PmlComponent implements OnInit {
  displayedColumns: string[] = ['node', 'date', 'process', 'hour', 'pml', 'pmlEne', 'pmlPer', 'pmlCng'];
  dataSource = new MatTableDataSource<Pml>();
  process: any[] = [
    {key: 'MDA', value: 'Mercado del Día en Adelanto'},
    {key: 'MTR', value: 'Mercado de Tiempo Real '}
  ];
  conexionForm: FormGroup;
  search: any = {};

  titulo: string;
  constructor(private marketService: MarketService,  public toastr: ToastrManager,
    private eventService: EventService,
    private globalService: GlobalService, private fb: FormBuilder) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.conexionForm = new FormGroup({
      'dateInit': new FormControl('', Validators.required),
      'dateEnd': new FormControl('', Validators.required),
      'process': new FormControl('', Validators.nullValidator)
    });
    this.search = {
      dateInit: new Date(),
      dateEnd: new Date(),
      process:'MDA'
    };
  }
  dateChange(event){
  }
  private loadData(data: any) {
    this.addBlock(1, null);
    this.marketService.getPmls(data).subscribe(
        dataP => {
          this.dataSource.data = dataP;
          if(data.length === 0) {
            this.toastr.warningToastr('No hay datos para mostrar')
          }
          this.addBlock(2, null);
        },
        errorData => {
          this.toastr.errorToastr(Constants.ERROR_LOAD, 'Lo siento,')
          this.addBlock(2, null);
        });
  }

  onSubmit(value:any){
    this.loadData({
      dateInit: this.formatDate(value.dateInit),
      dateEnd: this.formatDate(value.dateEnd),
      limit: 4000,
      process: value.process
    })
  }

  formatDate(date: Date) {
    const month = ((date.getMonth() + 1) <= 9) ? "0" 
     + (date.getMonth() + 1): (date.getMonth() + 1) ;
     const day = (date.getDate() <= 9) ? "0" + date.getDate(): date.getDate();
    return date.getFullYear() + '/' + month + '/' + day;
  }

  private addBlock(type, msg): void {
    this.eventService.sendApp(new EventMessage(1, 
      new EventBlocked(type, msg)));
  }
}
