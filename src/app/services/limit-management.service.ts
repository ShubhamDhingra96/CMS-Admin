import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LimitManagementService {

  private baseUrl = environment.base_url;
  private saveUrl = "/limit/saveLimitDetails"
  private updateUrl = "/limit/updateLimitDetails";
  private getUrl = "/limit/getLimitDetails"
  private viewUrl = "/limit/getLimitDetails";
   private checkCompany = "/client/has";
   private currencyData = "/binSetup/getCurrencyData";
   private transactionData = "/limit/getTransactionData";
 

  constructor(private httpClient: HttpClient) { }

  view(id:any): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + this.viewUrl+"/"+id, { headers: { 'content-type': 'application/json' } });
  }
  
  save(data: any[]): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + this.saveUrl, data);
  }
  update(data: any): Observable<any> {
    return this.httpClient.put<any>(this.baseUrl + this.updateUrl, data);
  }

  getAll(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + this.getUrl, { headers: { 'content-type': 'application/json' } });
  }

  checkLimitCode(user:string,limitcode:any): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + this.getUrl+"/"+user+"/"+limitcode, { headers: { 'content-type': 'application/json' } });
  }

  ckeckEntity(company:any): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + this.checkCompany+"/"+company, { headers: { 'content-type': 'application/json' } });
  }

  getCueency(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + this.currencyData);
  }

  getTransactionData(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + this.transactionData);
  }


}
