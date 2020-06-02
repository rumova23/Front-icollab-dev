import { Injectable } from '@angular/core';
import {MaestroDTO} from '../../compliance/models/maestro-dto';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {GlobalService} from '../../core/globals/global.service';
import {BinnacleDTO} from '../models/binnacle-dto';

@Injectable({
  providedIn: 'root'
})
export class BinnacleService {
  private binnacle = environment.binnacle;
  parameters: any;
  constructor(private http: HttpClient,
              private globalService: GlobalService) {
  }

  saveBinnacle(binnacle: BinnacleDTO): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ this.binnacle }`, binnacle, {params : this.parameters });
  }
}
