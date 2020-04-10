import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ApiResponse } from './api.response';

@Injectable({
    providedIn: 'root'
  })
  export class CustomerRegistrationService {
  
    constructor(private http: HttpClient,private formBuilder: FormBuilder, private customerRegistration :CustomerRegistrationService) { }

    addCustomerRegistration(data: any): Observable<ApiResponse> {
      return this.http.post<ApiResponse>(environment.addCustomerRegistration, data);
    }

}