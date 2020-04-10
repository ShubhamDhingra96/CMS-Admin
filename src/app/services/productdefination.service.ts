import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDefinationService {
  private baseUrl: string = environment.base_url;
  private access_token = sessionStorage.getItem('access_token');
  private saveUrl = "/ProgramGroupTypeDefinition/saveProductTypeDefination"
  constructor(private httpclient: HttpClient) {}

  
  saveProductdefination(data: any): Observable<any> {
    return this.httpclient.post<any>(this.baseUrl + this.saveUrl, data);
  }
   
}
