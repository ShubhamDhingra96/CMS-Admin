import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgrammedefinitionService {
  private baseUrl: string = environment.base_url;
  private access_token = sessionStorage.getItem('access_token');
  private getProgramType = "/ProgramDefinition/getProgramType"
  private getCountryCurrency = "/CountryCurrency/getCountryCurrency"
  private getBinGroup = "/binGroupSetup/getBinGroup"
  private getProduct = "/ProgramGroupTypeDefinition/getProductGroup"
  constructor(private httpclient: HttpClient) {}

  getProgramDefinationGroup(user: string): Observable<any> {
    return this.httpclient.get<any>(this.baseUrl + this.getProgramType+"/"+user, {headers:{'content-type':'application/json'}});
  }

  getCountryCurrencyGroup(): Observable<any> {
    return this.httpclient.get<any>(this.baseUrl + this.getCountryCurrency, {headers:{'content-type':'application/json'}});
  }

  getBinGroupDefination(user: String): Observable<any> {
    return this.httpclient.get<any>(this.baseUrl + this.getBinGroup+"/"+user, {headers:{'content-type':'application/json'}});
  }

  getProductGroup(user: string): Observable<any> {
    return this.httpclient.get<any>(this.baseUrl + this.getProduct+"/"+user, {headers:{'content-type':'application/json'}});
  }
}