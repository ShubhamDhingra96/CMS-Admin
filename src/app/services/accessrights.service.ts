import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccessrightsService {
  private baseurl = environment.base_url;
  private accessrights= environment.accessrightsurl;
  private accessrightSaveUrl=environment.accessrightssaveurl;

  constructor(private http:HttpClient) { }

  public save(data:any[]):Observable<any>{
    return this.http.post<any>(this.baseurl+this.accessrights+this.accessrightSaveUrl,data);
  }

  public getMenu(username:string):Observable<any[]>{
    return this.http.get<any[]>(this.baseurl+this.accessrights+"/menu/"+username,{headers:{'content-type':'application/json'}});
  }
}
