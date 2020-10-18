import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalService} from '../../core/globals/global.service';
import {Observable} from 'rxjs';
import {MasterFuelCostDTO} from '../models/master-fuel-cost-dto';
import {BearerDTO} from '../models/bearer-dto';
import { EPs } from 'src/app/core/globals/endpoints';

@Injectable({
  providedIn: 'root'
})
export class FuelCostService {

  parameters: any;
  constructor(private http: HttpClient,
              private globalService: GlobalService) {
  }

  public saveFuelCost( masterFuelCostDTO: MasterFuelCostDTO): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ EPs.fuelcost.save.masterFuelCost }`, masterFuelCostDTO, {params : this.parameters });
  }

  public deleteFuelCost(masterFuelCostDTO: MasterFuelCostDTO ): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    console.log('RTC');
    console.dir(masterFuelCostDTO);
    console.log('RTC');
    return this.http.post( `${ EPs.fuelcost.delete.fuelCost }`, masterFuelCostDTO, {params : this.parameters });
  }

  public changeStatus(masterFuelCostDTO: MasterFuelCostDTO): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ EPs.fuelcost.finalized }`, masterFuelCostDTO, {params : this.parameters });
  }

  public findTradeDate(masterFuelCostDTO: MasterFuelCostDTO): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ EPs.fuelcost.find }`, masterFuelCostDTO,{params : this.parameters });
  }

  deleteFile(bearer: BearerDTO) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ EPs.fuelcost.delete.bearer }`, bearer, {params : this.parameters });
  }

  obtenSupports(binnacleEventId: number) {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get( `${ EPs.fuelcost.get.support }/${binnacleEventId}`, {params : this.parameters });
  }

  uploadSupport(masterFuelCostDTO: MasterFuelCostDTO): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ EPs.fuelcost.upload.support }`, masterFuelCostDTO, {params : this.parameters });
  }
}
