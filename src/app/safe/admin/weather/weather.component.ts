import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { GlobalService } from 'src/app/core/globals/global.service';
import { MarketService } from '../../services/market.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { EventService } from 'src/app/core/services/event.service';
import { SocketService } from 'src/app/core/services/socket.service';
import { Validate } from 'src/app/core/helpers/util.validator.';
import { SecurityService } from 'src/app/core/services/security.service';
import { EventSocket } from 'src/app/core/models/EventSocket';
import { TrService } from '../../services/tr.service';
import { Constants } from 'src/app/core/globals/Constants';

import * as moment from 'moment';



@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  interval: any;
  conected: boolean = false;
  channel: any;
  weather:any;
  hourly:any;
  forecast: any;

  constructor(private marketService: MarketService, public toastr: ToastrManager,
    private eventService: EventService,
    private socketService: SocketService,
    private trService: TrService,
    private securityService: SecurityService,
    private globalService: GlobalService) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    const date = moment(new Date()).format(Constants.DATE_FORMAT_WEATHER);
    this.getWeather(date);
    this.interval = setInterval(() => {
      console.log("tryinn... conected");
      //this.socketConection();
    }, 5000);
  }

  private socketConection(): void {
    console.log("tryinn... conected");
    if (!this.conected) {
      const token = this.securityService.getToken();
      if (Validate(token)) {
        this.socketService.initSocket(token);
        this.socketService.onEvent(EventSocket.CONNECT)
          .subscribe(() => {
            this.conected = true;
            console.log(  this.conected);
          });
        this.socketService.onEvent(EventSocket.DISCONNECT)
          .subscribe(() => {
            this.conected = false;
            console.log("Socket desconectado");
            this.toastr.errorToastr("Socket desconectado",'Lo siento,');
          });
        this.socketService.onError()
          .subscribe((error: any) => {
            this.conected = false;
            this.toastr.errorToastr("Socket error conexión",'Lo siento,');
          });
        this.socketService.login()
          .subscribe((errorLogin: any) => {
            if (errorLogin) {
              console.log(errorLogin);
              this.conected = false;
              this.toastr.errorToastr(errorLogin,'Lo siento,');
            } else {
              this.channel = this.socketService.suscribeChannel("weather");
              console.log( this.channel);
              this.socketService.onChannelError(this.channel - 1)
                .subscribe((errorChannel: any) => {
                  console.log(errorChannel);
                  this.toastr.errorToastr(errorChannel, 'Lo siento,');
                });
              this.socketService.onChannelWatch(this.channel - 1)
                .subscribe((data: any) => {
                  console.log(data);
                });
            }
          });
      } else {
        this.toastr.errorToastr("Token inválido",'Lo siento,');
      }
    }
  }

  getWeather(date: string) {
    this.trService.getWeather(date)
    .subscribe(
      data => {
        this.weather = data.docs[0].data;
        console.log(this.weather);
        this.getHourly(date);
      },
      errorData => {
        this.toastr.errorToastr(Constants.ERROR_LOAD, 'Weather');
      });
  }

  getHourly(date: string) {
    this.trService.getHourly(date)
    .subscribe(
      data => {
        this.hourly = data.docs[0].data;
        console.log(this.hourly);
        this.getForecast(date);
      },
      errorData => {
        this.toastr.errorToastr(Constants.ERROR_LOAD, 'Hourly');
      });
  }

  getForecast(date: string) {
    this.trService.getForecast(date)
    .subscribe(
      data => {
        this.forecast = data.docs[0].data;
        console.log(this.forecast);
      },
      errorData => {
        this.toastr.errorToastr(Constants.ERROR_LOAD, 'Forecast');
      });
  }


}
