import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // if(request.url.includes('data.mongodb-api.com')){
      request = request.clone({
        setHeaders: {
          'api-key' : 'Yk2vjQ5MYOzxsAKv2ujTiNDktJQxu8fqfv1YqWKAsmMAwi4OV4qqyRi1IhI7Gja2',
        }
      });
    // }
    return next.handle(request);
  }
}
