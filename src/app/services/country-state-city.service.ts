import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryStateCityService {

  private baseUrl:string=environment.base_url;
  private fetchCountriesUrl=this.baseUrl+"/location/yourLocation";
  private fetchStatesUrl=this.baseUrl+"/location/yourLocation/";

  constructor(private httpClient:HttpClient) { }

  public getCountries():Observable<any[]>{
    return this.httpClient.get<any[]>(this.fetchStatesUrl,{headers:{'content-type':'application/json'}})
  }

  public getStatesAndCities(countryid:number):Observable<any[]>{
    return this.httpClient.get<any[]>(this.fetchStatesUrl+countryid,{headers:{'content-type':'application/json'}})
  }
}
