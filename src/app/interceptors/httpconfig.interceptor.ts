import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ErrorService } from '../services/error.service';
import { ErrorMessageComponent } from '../components/error-message/error-message.component';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(public errorService: ErrorService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // const token: string = localStorage.getItem('access_token');
        //  console.log('request')
        // // if (token) {
        // //     request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
        // // }

        // // if (!request.headers.has('Content-Type')) {
        // //     request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        // // }

        // // request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {                   
                    
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                let data = {};
                data = {
                    reason: error && error.error.reason ? error.error.reason : '',
                    status: error.status
                };
                // console.error(error)
                // this.errorService.setError(data);
                // new ErrorMessageComponent(this.errorService).openDialog();
                return throwError(error);
            }));
    }
}