import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeesService {
  private baseUrl = environment.base_url;
  private saveUrl = "/saveFeeDetails"
  private getUrl = "/getFeeDetails"
  private updateUrl = "/updateFeeDetails"; 
  private getUrl1 = "/getFeeDetails";
  private getfeeUrl="/getallfeecode";
  private groupTransactionData = "/getGroupTransactionData";
  
  constructor(private httpClient: HttpClient) { }

    save(data: any[]): Observable<any> {
      return this.httpClient.post<any>(this.baseUrl + this.saveUrl, data);
    }

    getAll(): Observable<any> {
      return this.httpClient.get<any>(this.baseUrl + this.getUrl, { headers: { 'content-type': 'application/json' } });
    }

    update(data: any): Observable<any> {
      return this.httpClient.put<any>(this.baseUrl + this.updateUrl, data);
    }

    get(feeCode:any): Observable<any> {
      return this.httpClient.get<any>(this.baseUrl + this.getUrl1+"/"+feeCode, { headers: { 'content-type': 'application/json' } });
    }
    public checkFeeCode(user:string,feeCode:string): Observable<any> {
      return this.httpClient.get<any>(this.baseUrl  + "/cmsFeeDetails/"+user+"/"+feeCode, {headers:{'content-type':'application/json'}});
    };

    getGroupTransaction(): Observable<any> {
      return this.httpClient.get<any>(this.baseUrl + this.groupTransactionData);
    }

    
  
  
}
