import { Injectable } from '@angular/core';
import { Company } from '../../interfaces/company.interface';

@Injectable({
  providedIn: 'root',
})
export class RequestConfirmedService {
  requestConfirmed: Company[] = [];
  constructor() {}

  addRequestConfirmed(company: Company) {
    this.requestConfirmed.push(company);
  }

  getConfirmedRequests(): Company[] {
    return this.requestConfirmed;
  }
}
