import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {GlobalService} from '../../core/globals/global.service';
import {Observable} from 'rxjs';
import {MasterFuelCostDTO} from '../models/master-fuel-cost-dto';

@Injectable({
  providedIn: 'root'
})
export class FuelCostService {

  private fuelcostUrl = environment.fuelcostUrl;

  parameters: any;
  constructor(private http: HttpClient,
              private globalService: GlobalService) {
  }

  public saveFuelCost( masterFuelCostDTO: MasterFuelCostDTO): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ this.fuelcostUrl }fuelcost/save/masterFuelCost`, masterFuelCostDTO, {params : this.parameters });
  }

  public updateFuelCost(masterFuelCostDTO: MasterFuelCostDTO ): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ this.fuelcostUrl }fuelcost/update/masterFuelCost`, {params : this.parameters });
  }

  public changeStatus(year: number, month: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get( `${ this.fuelcostUrl }fuelcost/finalized/${year}/${month}`, {params : this.parameters });
  }

  public findTradeDate(year: number, month: number): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get( `${ this.fuelcostUrl }fuelcost/find/${year}/${month}`, {params : this.parameters });
  }
}
