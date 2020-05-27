import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Moment } from 'moment';

@Component({
  selector: 'app-security-doc',
  templateUrl: './security-doc.component.html',
  styleUrls: ['./security-doc.component.scss']
})
export class SecurityDocComponent implements OnInit {

  constructor(
    public  toastr: ToastrManager) { }

  ngOnInit() {
  }
  clickBtn(){
    this.toastr.successToastr('Evento click', '¡Se ha logrado!');
  }
  chosenMonthHandler(d:Moment){
    this.toastr.successToastr(d.format('MM/yyyy'), '¡Se ha logrado!');
  }
}
