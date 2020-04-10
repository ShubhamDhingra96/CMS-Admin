import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SuccessService {
  private success:HttpResponse<any>;

  constructor() { }

  getSuccessMessage(success:HttpResponse<any>): string {    
    return success.ok ? 
           success.body : 
           success.body.toString();
  }

  setServerResponse(success:HttpResponse<any>): HttpResponse<any> {    
    return this.success=success;
  } 
  getServerResponse(): HttpResponse<any> {    
    return this.success;
  }  

}
