import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
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
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit, OnDestroy {
  interval: any;
  conected: boolean = false;
  channelWeather: any;
  channelForecast: any;
  channelHourly: any;
  weather:any;
  hourly:any;
  forecast: any;
  date = new Date();
  dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  stringDate:string = '';
  temp:any;
  realFeelTemp:any;
  weatherText = "";
  weatherImg = "";
  UVIndex: any;
  UVIndexText: any;
  pressureTendency: any;
  humidity: any;
  pressure:any;
  windSpeed:any;
  visibility:any;
  hours = [];
  predictionOptions = { weekday: 'long' };
  predictions = [];

  constructor(private marketService: MarketService, public toastr: ToastrManager,
    private eventService: EventService,
    private socketService: SocketService,
    private trService: TrService,
    private datePipe: DatePipe,
    private securityService: SecurityService,
    private globalService: GlobalService) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.stringDate = this.date.toLocaleDateString("es-ES", this.dateOptions);    
    this.getWeather();
    this.interval = setInterval(() => {
      this.socketConection();
    }, 5000);
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval( this.interval);
    }
  }  

  private socketConection(): void {
    if (!this.conected) {
      const token = this.securityService.getToken();
      if (Validate(token)) {
        this.socketService.initSocket(token);
        this.socketService.onEvent(EventSocket.CONNECT)
          .subscribe(() => {
            this.conected = true;
          });
        this.socketService.onEvent(EventSocket.DISCONNECT)
          .subscribe(() => {
            this.conected = false;
            //this.toastr.errorToastr("Socket desconectado",'Lo siento,');
          });
        this.socketService.onError()
          .subscribe((error: any) => {
            this.conected = false;
            //this.toastr.errorToastr("Socket error conexión",'Lo siento,');
          });
        this.socketService.login()
          .subscribe((errorLogin: any) => {
            if (errorLogin) {
              this.conected = false;
              //this.toastr.errorToastr(errorLogin,'Lo siento,');
            } else {
              this.channelWeather = this.socketService.suscribeChannel("weather");

              this.channelForecast = this.socketService.suscribeChannel("forecast");

              this.channelHourly = this.socketService.suscribeChannel("hourly");


              this.socketService.onChannelError(this.channelWeather - 1)
                .subscribe((errorChannel: any) => {
                  console.log(errorChannel);
                });
              this.socketService.onChannelWatch(this.channelWeather - 1)
                .subscribe((data: any) => {
                  this.weather = data.data;
                  this.loadWeatherData();
                });

              this.socketService.onChannelError(this.channelForecast - 1)
                .subscribe((errorChannel: any) => {
                  console.log(errorChannel);
                });
              this.socketService.onChannelWatch(this.channelForecast - 1)
                .subscribe((data: any) => {

                  this.forecast = data.data;
                  this.loadForecastData();
                });

                this.socketService.onChannelError(this.channelHourly - 1)
                .subscribe((errorChannel: any) => {
                  console.log(errorChannel);
                });
              this.socketService.onChannelWatch(this.channelHourly - 1)
                .subscribe((data: any) => {

                  this.hourly = data.data;
                  this.loadHourlyData();
                });  
            }
          });
      } else {
        //this.toastr.errorToastr("Token inválido",'Lo siento,');
         console.log('Token inválido');
      }
    }
  }

  getWeather() {
    this.trService.getWeather(this.date.getTime())
    .subscribe(
      data => {
        this.weather = data.docs[0].data;

        this.loadWeatherData();
        this.getHourly();
      },
      errorData => {
        this.toastr.errorToastr(Constants.ERROR_LOAD, 'Clima actual');
      });
  }

  loadWeatherData() {
    this.temp = this.weather.Temperature.Metric.Value;
    this.realFeelTemp = this.weather.RealFeelTemperature.Metric.Value;
    this.weatherText = this.weather.WeatherText;
    this.UVIndex = this.weather.UVIndex;
    this.UVIndexText = this.weather.UVIndexText;
    this.pressureTendency = this.weather.PressureTendency.LocalizedText;
    this.weatherImg = this.getUrlWeather();
    this.humidity = this.weather.RelativeHumidity;
    this.pressure = this.weather.Pressure.Metric.Value;
    this.windSpeed = this.weather.Wind.Speed.Metric.Value;
    this.visibility = this.weather.Visibility.Metric.Value;
  }

  getUrlWeather() {
    let img = "assets/icons/conditions/";
    if(Validate(this.weather)) {
      img = img + this.weather.WeatherIcon;
    } else {
      img = img + "1";
    }
    img = img + ".svg";
    return img;
  }


  getHourly() {
    this.trService.getHourly(this.date.getTime())
    .subscribe(
      data => {
        this.hourly = data.docs[0].data;
        this.loadHourlyData();
        this.getForecast();
      },
      errorData => {
        this.toastr.errorToastr(Constants.ERROR_LOAD, 'Temperatura');
      });
  }

  loadHourlyData() {
    this.hours = [];
    let date = this.date;
    date.setHours(0,0,0,0);
    for(var i = 0; i < this.hourly.length; i ++) {
      let dateHour = new Date(this.hourly[i].DateTime);
      let hour = dateHour.getHours();

      dateHour.setHours(0,0,0,0);

      if(date.getTime() === dateHour.getTime()) {
        this.hours.push({
          time: this.getTime(hour),
          value: this.hourly[i].Temperature.Value,
          url: this.getUrlHourly(this.hourly[i])
        });
      }
    }
  }

  getTime(hour) {
    return (hour < 10 ? "0": "") + 
    hour  + ":00"
  }

  getUrlHourly(dat) {
    let img = "assets/icons/conditions/";
    if(Validate(dat)) {
      img = img + dat.WeatherIcon;
    } else {
      img = img + "1";
    }
    img = img + ".svg";
    return img;
  }

  getForecast() {
    this.trService.getForecast(this.date.getTime())
    .subscribe(
      data => {
        this.forecast = data.docs[0].data;

        this.loadForecastData();
      },
      errorData => {
        this.toastr.errorToastr(Constants.ERROR_LOAD, 'Predicción');
      });
  }

  loadForecastData() {
    const DailyForecasts = this.forecast.DailyForecasts;
    this.predictions     = [];

    for(var i = 0; i < DailyForecasts.length; i++) {
      let dat: Date = new Date(DailyForecasts[i].Date);
      let dia = dat.toLocaleDateString("es-ES", this.predictionOptions);
      let hoy = new Date().toLocaleDateString("es-ES", this.predictionOptions);
      let datePipeString = this.datePipe.transform(dat,'dd-MMM');
      let stringDate = dia+" "+datePipeString;
      this.predictions.push({
        date: stringDate,
        min: DailyForecasts[i].Temperature.Minimum.Value,
        max: DailyForecasts[i].Temperature.Maximum.Value,
        dayText: DailyForecasts[i].Day.ShortPhrase,
        nightText: DailyForecasts[i].Night.ShortPhrase
      })
    }
  }

}
