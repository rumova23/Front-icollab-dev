import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {GlobalService} from '../../core/globals/global.service';
import {Observable} from 'rxjs';
import {MasterFuelCostDTO} from '../models/master-fuel-cost-dto';
import {BearerDTO} from '../models/bearer-dto';

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

  public deleteFuelCost(masterFuelCostDTO: MasterFuelCostDTO ): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    console.log('RTC');
    console.dir(masterFuelCostDTO);
    console.log('RTC');
    return this.http.post( `${ this.fuelcostUrl }fuelcost/delete/fuelCost`, masterFuelCostDTO, {params : this.parameters });
  }

  public changeStatus(masterFuelCostDTO: MasterFuelCostDTO): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ this.fuelcostUrl }fuelcost/finalized`, masterFuelCostDTO, {params : this.parameters });
  }

  public findTradeDate(masterFuelCostDTO: MasterFuelCostDTO): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ this.fuelcostUrl }fuelcost/find`, masterFuelCostDTO,{params : this.parameters });
  }

  deleteFile(bearer: BearerDTO) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ this.fuelcostUrl }fuelcost/delete/bearer`, bearer, {params : this.parameters });
  }

  obtenSupports(binnacleEventId: number) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get( `${ this.fuelcostUrl }fuelcost/obten/support/${binnacleEventId}`, {params : this.parameters });
  }

  uploadSupport(masterFuelCostDTO: MasterFuelCostDTO): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ this.fuelcostUrl }fuelcost/upload/support`, masterFuelCostDTO, {params : this.parameters });
  }
}
