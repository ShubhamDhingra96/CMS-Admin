import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgrammedefinitionService {
  private baseUrl: string = environment.base_url;
  private access_token = sessionStorage.getItem('access_token');
  private saveUrl = "/ProgramDefinition/save"
  private updateUrl = "/ProgramDefinition/update";
  private viewUrl = "/ProgramDefinition/view";
  private getUrl = "/ProgramDefinition/getAll"
  constructor(private httpclient: HttpClient) {}

  // view(programmeCode: any): Observable<any> {
  //   return this.httpclient.get<any>(this.baseUrl + this.getUrl + "/" + programmeCode, { headers: { 'content-type': 'application/json' } });
  // }
  saveProgrammedefinition(data: any): Observable<any> {
    return this.httpclient.post<any>(this.baseUrl + this.saveUrl, data);
  }
  updateProgrammedefinition(data: any): Observable<any> {

    return this.httpclient.put<any>(this.baseUrl + this.updateUrl, data);
  }
  getProgrammeDefinitionDetails(): Observable<any> {
    return this.httpclient.get<any>(this.baseUrl + this.getUrl, { headers: { 'content-type': 'application/json' } });
  }
//  isExist(cl: any,groupCode:string): Observable<any> {
//     return this.httpclient.get<any>(this.baseUrl + "/PlasticSetup/check/"+clientid+"/"+groupCode, {headers:{'content-type':'application/json'}});
//   }
 
checkCardUsage(user:string,programmeCode:string): Observable<any> {
  return this.httpclient.get<any>(this.baseUrl + this.getUrl+"/"+user+"/"+programmeCode, { headers: { 'content-type': 'application/json' } });
}

   
}
