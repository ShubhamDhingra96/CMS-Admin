import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from './api.response';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';


@Injectable({
    providedIn: 'root'
  })

export class ProductSettingServiceService {
    private baseUrl: string = environment.base_url;
    private access_token = sessionStorage.getItem('access_token');
    private saveUrl = "/productTypeSetting/addproductTypeSettingDetails"
    private getUrl = "/productTypeSetting/getproductTypeSettingDetails"
    constructor(private http: HttpClient, private formBuilder: FormBuilder) { }



    getProductCodeDescriptiondetails(productCode: string): Observable<ApiResponse> {
    
        return this.http.post<ApiResponse>(environment.getProductCodeDescriptiondetails + productCode, { headers: { 'Content-Type': 'application/json' } });
      }


      getProductCodeList(data: any): Observable<any> {
      
        return this.http.get<any>(environment.getProductCodeList,{headers:{'content-type':'application/json'}});
      }


      isExist(clientid: any,productCode:string): Observable<any> {
        return this.http.get<any>(this.baseUrl + "/productTypeSetting/check/"+clientid+"/"+productCode, {headers:{'content-type':'application/json'}});
      }

      save(data:any):Observable<any>{
        return this.http.post<any>(this.baseUrl+"/productUsage/save",data);
      }
}