import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {GlobalService} from '../../core/globals/global.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterSupportService {
  private economicProposalUrl = environment.economicProposalUrl;
  parameters: any;
  constructor(private http: HttpClient,
              private globalService: GlobalService) {
  }

  obtenEconomicProposal(year: any, month: any): Observable<any> {
    this.parameters = this.globalService.setXTenantId(this.globalService.aguila);
    return this.http.get( `${ this.economicProposalUrl }economicproposal/${year}/${month}`, {params : this.parameters });
  }
}
