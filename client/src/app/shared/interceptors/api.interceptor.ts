import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
  host:string = 'https://my-json-server.typicode.com/VItaliyKK/json-server';
  // host:string = 'http://localhost:3500/api';
  
  constructor( ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const apiRequest = request.clone({ url: `${this.host}/${request.url}` });
    
    return next.handle(apiRequest);
  }
}
