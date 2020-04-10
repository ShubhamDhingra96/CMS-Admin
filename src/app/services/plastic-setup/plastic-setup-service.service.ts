import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from './api.response';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PlasticSetupServiceService {
  private baseUrl: string = environment.base_url;
  private access_token = sessionStorage.getItem('access_token');
  private saveUrl = "/PlasticSetup/addPlasticProduct"
  private getUrl = "/PlasticSetup/getPlasticDetails"
  constructor(private http: HttpClient, private formBuilder: FormBuilder, private plasticService: PlasticSetupServiceService) { }



  
  savePlasticData(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + this.saveUrl, data);
  }
  getPlasticDetails(data: any): Observable<ApiResponse> {
    return this.http.post<any>(this.baseUrl + this. getUrl, data);
  }

  getSpecificPlasticDetails(clientid: any): Observable<ApiResponse> {
    return this.http.get<any>(this.baseUrl + "/PlasticSetup/getSpecificPlasticDetails/"+clientid, {headers:{'content-type':'application/json'}});
  }

  isExist(clientid: any,groupCode:string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/PlasticSetup/check/"+clientid+"/"+groupCode, {headers:{'content-type':'application/json'}});
  }


  submitBinData(data: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(environment.addBinData, data);
  }

  submitBinGroupData(data: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(environment.addBinGroupData, data);
  }



  getBinData(data: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(environment.getBinData, data);
  }


  submitPlasticData(data: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(environment.addPlasticSetup, data);
  }
  // getPlasticDetails(data: any): Observable<ApiResponse> {
  //   return this.http.post<ApiResponse>(environment.getPlasticDetails, data);
  // }
  addBinGroup(data: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(environment.addBinGroup, data);
  }

  getCurrencyData(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(environment.getCurrencyData);
  }
  getBinDetails(binNumber: string): Observable<ApiResponse> {
    
    return this.http.post<ApiResponse>(environment.getBinDetails + binNumber, { headers: { 'Content-Type': 'application/json' } });
  }

  getPlasticCodelist(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(environment.getPlasticCodelist);
  }

  getBinGroupSetUpDetails(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(environment.getBinGroupSetUpDetails);
  }

  getBinGroupCode(groupCode: string): Observable<ApiResponse> {
    
    return this.http.get<ApiResponse>(environment.getBinGroupCode + groupCode, { headers: { 'Content-Type': 'application/json' } });
  }

  

}
