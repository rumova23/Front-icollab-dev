import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {GlobalService} from '../../core/globals/global.service';
import {BinnacleEventDTO} from '../models/binnacle-event-dto';
import {Observable} from 'rxjs';
import {EconomicProposalDTO} from '../models/economic-proposal-dto';

@Injectable({
  providedIn: 'root'
})
export class EconomicProposalService {
  private economicProposalUrl = environment.economicProposalUrl;
  parameters: any;
  constructor(private http: HttpClient,
              private globalService: GlobalService) {
  }

  obtenEconomicProposal(year: any, month: any): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get( `${ this.economicProposalUrl }economicproposal/${year}/${month}`, {params : this.parameters });
  }

  saveEconomicProposal(economic: EconomicProposalDTO): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.post( `${ this.economicProposalUrl }economicproposal/save`, economic, {params : this.parameters });
  }
}
