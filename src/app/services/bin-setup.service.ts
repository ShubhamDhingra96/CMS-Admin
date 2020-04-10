import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { ApiResponse } from './api.response';

@Injectable({
  providedIn: 'root'
})
export class BinSetupService {

  private baseUrl: string = environment.base_url;
  private binCheckUrl:string ="/binSetup/check";

  constructor(private http: HttpClient) { }

  isExist(user:string,bin:string):Observable<any>{
    return this.http.get<any>(this.baseUrl+this.binCheckUrl+"/"+user+"/"+bin,{headers:{'content-type':'application/json'}})
  }

  getSpecificBinSetupDetails(clientid: any): Observable<ApiResponse> {
    return this.http.get<any>(this.baseUrl + "/binSetup/getSpecificBinSetupDetails/"+clientid, {headers:{'content-type':'application/json'}});
  }

  getCurrencyData(): Observable<any> {
    return this.http.get<any>(environment.getCurrencyData);
  }

}
