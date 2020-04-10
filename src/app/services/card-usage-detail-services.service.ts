import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardUsageDetailServicesService {
  //private baseUrl:environment.base_url;
  private baseUrl: string = environment.base_url;
  private access_token = sessionStorage.getItem('access_token');
  private saveUrl = "/cardusageDetails/save"
  private updateUrl = "/cardusageDetails/update";
  private viewUrl = "/cardusageDetails/view";
  private getUrl = "/cardusageDetails/getAll"

  constructor(private httpClient: HttpClient) { }

  view(groupCode: any): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + this.viewUrl + "/" + groupCode, { headers: { 'content-type': 'application/json' } });
  }
  save(data: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + this.saveUrl, data);
  }
  update(data: any): Observable<any> {

    return this.httpClient.put<any>(this.baseUrl + this.updateUrl, data);
  }
  getCardUsageDetails(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + this.getUrl, { headers: { 'content-type': 'application/json' } });
  }

  checkCardUsage(user:string,groupCode:string): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + this.getUrl+"/"+user+"/"+groupCode, { headers: { 'content-type': 'application/json' } });
  }
}
