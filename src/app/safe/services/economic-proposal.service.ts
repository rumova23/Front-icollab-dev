import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalService} from '../../core/globals/global.service';
import {Observable} from 'rxjs';
import {EconomicProposalDTO} from '../models/economic-proposal-dto';
import { EPs } from 'src/app/core/globals/endpoints';

@Injectable({
  providedIn: 'root'
})
export class EconomicProposalService {

  parameters: any;
  constructor(private http: HttpClient,
              private globalService: GlobalService) {
  }

  obtenEconomicProposal(year: any, month: any): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get( `${ EPs.economicproposal.id }${year}/${month}`, {params : this.parameters });
  }

  saveEconomicProposal(economic: EconomicProposalDTO): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ EPs.economicproposal.save }`, economic, {params : this.parameters });
  }
}
