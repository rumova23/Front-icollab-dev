import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Datum } from '../models/tag/datum';
import { Data } from '../models/tag/data';



@Injectable({ providedIn: 'root' })
export class MonitoringTrService {

  constructor(private http: HttpClient) {}

  getStreamsetsInterpolated(params): Observable<Data> {
    // tslint:disable-next-line:max-line-length
    // https://192.168.1.175/piwebapi/streamsets/interpolated?webId=P0uQAgHoBd0ku7P3cWOJL6IgGCUAAAU0VSVklET1JfUElcREFBMDgxMDM&webId=P0uQAgHoBd0ku7P3cWOJL6IglyQAAAU0VSVklET1JfUElcUDJBMDgyMTE&
    // startTime='21-08-19 00:00:00 GMT'&endTime=*-10h&interval=1h&selectedFields=Items.WebId;Items.Name;Items.Items.Timestamp;Items.Items.Value&timeZone=America/New_York
    return this.http.get<Data>(environment.urlTrPi + 'piwebapi/streamsets/interpolated?' + params).pipe(
		map(data => new Data().deserialize(data)),
	  );
  }
  
  getStreamsetsInterpolated__(params): Observable<any> {
    // tslint:disable-next-line:max-line-length
    // https://192.168.1.175/piwebapi/streamsets/interpolated?webId=P0uQAgHoBd0ku7P3cWOJL6IgGCUAAAU0VSVklET1JfUElcREFBMDgxMDM&webId=P0uQAgHoBd0ku7P3cWOJL6IglyQAAAU0VSVklET1JfUElcUDJBMDgyMTE&
    // startTime='21-08-19 00:00:00 GMT'&endTime=*-10h&interval=1h&selectedFields=Items.WebId;Items.Name;Items.Items.Timestamp;Items.Items.Value&timeZone=America/New_York
    return this.http.get(environment.urlTrPi + 'piwebapi/streamsets/interpolated?' + params);
  }
	
}
