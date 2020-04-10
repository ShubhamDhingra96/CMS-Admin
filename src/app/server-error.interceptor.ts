import { Injectable } from '@angular/core';
import { 
  HttpEvent, HttpRequest, HttpHandler, 
  HttpInterceptor, HttpErrorResponse 
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ErrorService } from './services/error.service';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
  constructor(private errosService:ErrorService){
    
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      //retry(1),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // refresh token
        } else {
          this.errosService.setServerError(error);
          return throwError(error);
        }
      })
    );    
  }
}