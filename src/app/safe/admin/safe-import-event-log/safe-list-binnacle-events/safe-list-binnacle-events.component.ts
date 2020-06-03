import { Component, OnInit } from '@angular/core';
import {default as moment, Moment} from 'moment';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-safe-list-binnacle-events',
  templateUrl: './safe-list-binnacle-events.component.html',
  styleUrls: ['./safe-list-binnacle-events.component.scss']
})
export class SafeListBinnacleEventsComponent implements OnInit {


  date = new FormControl(moment());
  maxDate: Date;
  constructor() { }

  ngOnInit() {
    this.maxDate = new Date(new Date().getFullYear(), (new Date().getMonth() - 1 ));
  }

  onChangeDatePicker(d: Moment) {
    this.date.setValue(d);
  }

}
