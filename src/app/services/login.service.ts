import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable, observable} from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Message } from '../domain/Message';
import {catchError} from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url:string=environment.base_url+"/default/login";
  private content_type:string=environment.content_type;
  

  constructor(private http:HttpClient) {
    
   }

  public login(username:string,password:string):Observable<Message>{
    // let loginForm=new FormData();
    // loginForm.append('username',username);
    // loginForm.append('password',password); 
    let login ={
      username:username,
      password:password
    }       
    //JSON.stringify(login)
 let data =this.encrypt(JSON.stringify(login),environment.encryption_key).toString();
    return this.http.post<Message>(this.url,data)
  }
  encrypt(encry,keys){
    const key = CryptoJS.enc.Utf8.parse(keys);
    const iv = CryptoJS.enc.Utf8.parse(keys);
   
      const encrypt =CryptoJS.AES.encrypt(encry,key,{
        keySize:16,
        iv:iv,
        mode:CryptoJS.mode.ECB,
        padding:CryptoJS.pad.Pkcs7
      })
      return encrypt;
  }

  decrypt(encry,keys){
    const key = CryptoJS.enc.Utf8.parse(keys);
    const iv = CryptoJS.enc.Utf8.parse(keys);

      const decrypt =CryptoJS.AES.decrypt(encry,key,{
        keySize:16,
        iv:iv,
        mode:CryptoJS.mode.ECB,
        padding:CryptoJS.pad.Pkcs7
      })
      return decrypt.toString(CryptoJS.enc.Utf8);
  }

  public save(data:any):Observable<any>{
    return this.http.post<any>(environment.base_url+"/default/save",data,{ headers: { 'content-type': 'application/json' } });
  }

  public sendResetPasswordLink(data:any):Observable<any>{
    return this.http.post<any>(environment.base_url+"/default/sendResetPasswordLink",data,{ headers: { 'content-type': 'application/json' } });
  }

  public checkKeyLink(key:any):Observable<any>{
    return this.http.post<any>(environment.base_url+"/default/validateResetPasswordLink/"+key,{ headers: { 'content-type': 'application/json' } });
  }

  public resetPassword(data:any):Observable<any>{
    return this.http.post<any>(environment.base_url+"/default/resetPassword",data,{ headers: { 'content-type': 'application/json' } });
  }

  public getUser(username:any):Observable<any>{
    return this.http.post<any>(environment.base_url+"/default/get",username,{ headers: { 'content-type': 'text/plain' } });
  }
 

  public updateUser(data:any):Observable<any>{
    return this.http.post<any>(environment.base_url+"/default/update",data,{ headers: { 'content-type': 'application/json' } });
  }
  
   public getDashboradMenu(){
    return this.http.post<any>(environment.base_url+"/default/getDashboradMenu",{ headers: { 'content-type': 'application/json' } });
  }
 
  
  public getDashboradFunctions(moduleId:String){
    return this.http.post<any>(environment.base_url+"/default/getDashboradFunctions/"+moduleId,{ headers: { 'content-type': 'application/json' } });
  }
  
  public getFunctionsJobMapping(functionId:String){
    return this.http.post<any>(environment.base_url+"/default/getFunctionsJobMapping/"+functionId,{ headers: { 'content-type': 'application/json' } });
  }

  public  getAllUser():Observable<any[]>{
    return this.http.get<any[]>(environment.base_url+"/default/getAllUsers",{headers:{'content-type':'application/json'}})
  }
}
