import { Util } from '../utils/util';
import { Injectable } from '@angular/core';
import { environment } from '../../../src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(
    private util: Util
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers;
    let serviceName;
    headers = new HttpHeaders();
    serviceName = request.headers.get('service-name');
    if (serviceName && !environment.services[serviceName][`isPublic`]) {
      headers = request.headers.set('Authorization', `${this.util.getToken()}`);
      request = request.clone({ headers });
    }



    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          serviceName = event.headers.get('service-name');
          if (environment.services[serviceName] !== undefined &&
            environment.services[serviceName].isToken) {
            this.util.setToken(event.headers.get('token'));
          }
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      }));
  }
}
