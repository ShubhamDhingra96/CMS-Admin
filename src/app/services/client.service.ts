import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private baseUrl = environment.base_url;
  private saveUrl = "/client/save"
  private updateUrl = "/client/update";
  private viewUrl = "/client/view";
  private getUrl = "/client/getAll"
  private checkCompany = "/client/has"
  private compony = "/client/getAllCorporate";

  constructor(private httpClient: HttpClient) { }


  view(id:any): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + this.viewUrl+"/"+id, { headers: { 'content-type': 'application/json' } });
  }

  save(data: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + this.saveUrl, data);
  }
  update(data: any): Observable<any> {
    return this.httpClient.put<any>(this.baseUrl + this.updateUrl, data);
  }

  getAll(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + this.getUrl, { headers: { 'content-type': 'application/json' } });
  }

  ckeckEntity(company:any): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + this.checkCompany+"/"+company, { headers: { 'content-type': 'application/json' } });
  }

  getAllCorporate(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + this.compony, { headers: { 'content-type': 'application/json' } });
  }
}
