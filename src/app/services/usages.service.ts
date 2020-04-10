import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsagesService {

  private url: string = environment.base_url;
  private content_type: any = environment.content_type;
  private access_token = sessionStorage.getItem('access_token');
  private usageUrl = environment.usagesUrl;
  private usageCountrySaveUrl = environment.usageCountrySaveUrl;
  private usageCountryUpdateUrl = environment.usageCountryUpdateUrl;
  private usageCountryfetehUrl = environment.usageCountryfatchUrl;
  private usagedeliverySaveUrl = environment.usageDeliverySaveUrl
  private usagedeliveryUpdateUrl = environment.usageDeliveryUpdateUrl;
  private usagedeliveryFatchUrl = environment.usageDeliveryFatchUrl;
  private usageMerchantSaveUrl=environment.usageMerchantSaveUrl;
  private viewacquirednetworkgroup=environment.viewAcquiredNetworkUrl;
  private viewcardusagesetting=environment.viewCardUsageSettingUrl;
  private viewfeemanagement=environment.viewFeeManagement;
  private viewlimitmanagement=environment.viewLimitManagement;
  private viewmerchantcategory=environment.viewMerchantCategory;
  private viewalertsetting=environment.viewAlertSetting;

  constructor(private http: HttpClient) { }



  public save(CmsCountryGroup: any): Observable<any> {
    return this.http.post<any>(this.url + this.usageUrl + this.usageCountrySaveUrl, CmsCountryGroup);
  };

  public update(CmsCountryGroup: any): Observable<any> {
    return this.http.post<any>(this.url + this.usageUrl + this.usageCountrySaveUrl, CmsCountryGroup);
  };

  public getCountryGroup(parameter: any): Observable<any> {
    return this.http.get<any>(this.url + this.usageUrl + this.usageCountryfetehUrl+"/"+parameter,{headers:{'content-type':'application/json'}});
  };
  public checkCountryGroup(user:any,parameter: any): Observable<any> {
    return this.http.get<any>(this.url + this.usageUrl + this.usageCountryfetehUrl+"/"+user+"/"+parameter,{headers:{'content-type':'application/json'}});
  };

  public getCountryGroupUserBase(user:any): Observable<any> {
    return this.http.get<any>(this.url + this.usageUrl + this.usageCountryfetehUrl+"s/"+user,{headers:{'content-type':'application/json'}});
  };

  public getAllCountryGroup(): Observable<any[]> {
    return this.http.get<any[]>(this.url + this.usageUrl + this.usageCountryfetehUrl,{headers:{'content-type':'application/json'}});
  };

  public saveDel(CmsDeliveryChannelGroup: any): Observable<any> {
    return this.http.post<any>(this.url + this.usageUrl + this.usagedeliverySaveUrl, CmsDeliveryChannelGroup);
  };

  public updateDel(CmsDeliveryChannelGroup: any): Observable<any> {
    return this.http.post<any>(this.url + this.usageUrl + this.usagedeliveryUpdateUrl, CmsDeliveryChannelGroup);
  };

  public getDeliveryChannelGroup(parameter: number): Observable<any> {
    return this.http.get<any>(this.url + this.usageUrl + this.usagedeliveryFatchUrl+"/"+parameter, {headers:{'content-type':'application/json'}});
  };

  public checkDeliveryChannelGroup(user:string,parameter: number): Observable<any> {
    return this.http.get<any>(this.url + this.usageUrl + this.usagedeliveryFatchUrl+"/"+user+"/"+parameter, {headers:{'content-type':'application/json'}});
  };

  public getDeliveryChannelGroupUserBase(user:string): Observable<any> {
    return this.http.get<any>(this.url + this.usageUrl + this.usagedeliveryFatchUrl+"s/"+user, {headers:{'content-type':'application/json'}});
  };

  public getAllDeliveryChannelGroup(): Observable<any> {
    return this.http.get<any>(this.url + this.usageUrl + this.usagedeliveryFatchUrl, {headers:{'content-type':'application/json'}});
  };

  public checkMerchantGroup(user:string,groupCode:string): Observable<any> {
    return this.http.get<any>(this.url + this.usageUrl + this.usageMerchantSaveUrl+"/"+user+"/"+groupCode, {headers:{'content-type':'application/json'}});
  };

  public saveMerchantGroup(cmsMerchantGroup: any[]): Observable<any> {
    return this.http.post<any>(this.url + this.usageUrl + this.usageMerchantSaveUrl, cmsMerchantGroup);
  };

  public saveAcquiredNetworkGroup(acquired: any[]): Observable<any> {
    return this.http.post<any>(this.url + this.usageUrl + "/acquiredNetwork", acquired);
  };

  public getAllAcquiredNetworkGroup(): Observable<any> {
    return this.http.get<any>(this.url + this.usageUrl + "/getallacquiredNetwork", {headers:{'content-type':'application/json'}});
  };

  public checkAcquiredNetworkGroup(user:string,groupCode:string): Observable<any> {
    return this.http.get<any>(this.url + this.usageUrl + "/getallacquiredNetwork/"+user+"/"+groupCode, {headers:{'content-type':'application/json'}});
  };

  public getMerchantMCCGroup(): Observable<any[]> {
    return this.http.get<any[]>(this.url + this.usageUrl + "/getMerchantMCCGroup", {headers:{'content-type':'application/json'}});
  };

  public getAcquiredNetworkType(): Observable<any[]> {
    return this.http.get<any[]>(this.url + this.usageUrl + "/getAcquiredNetworkType", {headers:{'content-type':'application/json'}});
  };

  getDeliveryChannel():Observable<any[]>{
      return this.http.get<any[]>(this.url + this.usageUrl + "/getDeliveryChannel", {headers:{'content-type':'application/json'}});
  };

  public viewAcquiringNetworkGroup(user:string): Observable<any> {
    return this.http.get<any>(this.url + this.usageUrl + this.viewacquirednetworkgroup+"/"+user, {headers:{'content-type':'application/json'}});
  };
  
  public viewCardUsageSetting(user:string): Observable<any> {
    return this.http.get<any>(this.url + this.usageUrl + this.viewcardusagesetting+"/"+user, {headers:{'content-type':'application/json'}});
  };

  public viewFeeManagement(user:string): Observable<any> {
    return this.http.get<any>(this.url + this.usageUrl + this.viewfeemanagement+"/"+user, {headers:{'content-type':'application/json'}});
  };

  public viewLimitManagement(user:string): Observable<any> {
    return this.http.get<any>(this.url + this.usageUrl + this.viewlimitmanagement+"/"+user, {headers:{'content-type':'application/json'}});
  };
  public viewMerchaneCategory(user:string): Observable<any> {
    return this.http.get<any>(this.url + this.usageUrl + this.viewmerchantcategory+"/"+user, {headers:{'content-type':'application/json'}});
  };
  public viewAlertSetting(user:string): Observable<any> {
    return this.http.get<any>(this.url + this.usageUrl + this.viewalertsetting+"/"+user, {headers:{'content-type':'application/json'}});
  };
}
