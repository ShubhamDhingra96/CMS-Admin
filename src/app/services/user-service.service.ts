import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Message } from '../domain/Message';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../domain/User';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private url: string = environment.base_url;
  private content_type: any = environment.content_type;
  private access_token = sessionStorage.getItem('access_token');

  constructor(private http: HttpClient) { }


  save(user: any): Observable<string> {
    return this.http.post<string>(this.url+"/user/save", user,{headers:{'content-type':this.content_type,'Authorization':'Bearer '+this.access_token}});
  }

  update(user: any): Observable<string> {
    return this.http.put<string>(this.url+"/user/update", user,{headers:{'content-type':this.content_type,'Authorization':'Bearer '+this.access_token}});
  }


  delete(user: any): Observable<string> {
    return this.http.post<string>(this.url+"/user/delete", user,{headers:{'content-type':this.content_type,'Authorization':'Bearer '+this.access_token}});
  }

  find(username:string): Observable<User> {    
    return this.http.get<User>(this.url+"/user/find/"+username, {headers:{'content-type':this.content_type,'Authorization':'Bearer '+this.access_token}});
  }

}
