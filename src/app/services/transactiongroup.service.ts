import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ApiResponse } from './api.response';
@Injectable({
  providedIn: 'root'
})
export class TransactiongroupService {

  private baseUrl = environment.base_url;
  private transactionData = "/transaction/getTransaction";
  private saveUrl = "/transaction/saveTransactionGroup";
  private transactionDetails = "/transaction/getTransactionGrouping";
  private tranCodeCheckUrl = "/transaction/checkTransactionCode";

  constructor(private httpClient: HttpClient) { }

  getTransactionData(): Observable<any> {
    
    return this.httpClient.get<any>(this.baseUrl + this.transactionData);
  }

  saveTransaction(data: any[]): Observable<any> {
    
    return this.httpClient.post<any>(this.baseUrl + this.saveUrl, data);
  }

  getTransactionGrouping(): Observable<any> {
    
    return this.httpClient.get<any>(this.baseUrl + this.transactionDetails);
  }
  
  isExist(user:string,groupTransactionCode:string):Observable<any>{
    console.log(groupTransactionCode)
    alert("in isexist")
    return this.httpClient.get<any>(this.baseUrl+this.tranCodeCheckUrl+"/"+user+"/"+groupTransactionCode,{headers:{'content-type':'application/json'}})
  }

  getSpecificTransactionGroupDetails(clientid: any): Observable<ApiResponse> {
    return this.httpClient.get<any>(this.baseUrl + "/transaction/getSpecificTransactionGroupDetails/"+clientid, {headers:{'content-type':'application/json'}});
  }
}
