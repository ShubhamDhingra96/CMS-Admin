import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from './api.response';

@Injectable({
  providedIn: 'root'
})
export class BinGroupService {

  private baseUrl: string = environment.base_url;
  private checkBinUrl: string = environment.checkBinGroup;
  constructor(private http: HttpClient) { }

  isExist(user: string, binGroupCode: string): Observable<any> {
   
    return this.http.get<any>(this.baseUrl+"/binGroupSetup/"+this.checkBinUrl+user+"/"+binGroupCode,{headers:{'Content-Type':'application/json'}})
  }

  getSpecificBinGroupDetails(clientid: any): Observable<ApiResponse> {
    return this.http.get<any>(this.baseUrl + "/binGroupSetup/getSpecificBinGroupDetails/"+clientid, {headers:{'content-type':'application/json'}});
  }
}
