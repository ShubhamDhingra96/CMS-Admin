import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private error: HttpErrorResponse;

  constructor() { }


  getClientErrorMessage(error: Error): string {    
    return error.message ? 
           error.message : 
           error.toString();
  }
  
  setServerError(error:HttpErrorResponse): HttpErrorResponse {    
    return this.error=error;
  } 

  getServerError(): HttpErrorResponse {    
    return this.error;
  }  


  getServerErrorMessage(error: HttpErrorResponse): string {
    return navigator.onLine ?    
           error.message :
           'No Internet Connection';
  }  
}
