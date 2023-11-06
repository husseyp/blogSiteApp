import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilsService } from '../services/utils/utils.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private utilsService:UtilsService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let token = this.utilsService.decrypt(JSON.parse(localStorage.getItem('userToken') || '{}'));
    if(token) {
      let modifiedReq = request.clone({
        headers: request.headers.append('Authorization', token)
      });
      return next.handle(modifiedReq)
    }else {
      return next.handle(request)
    }
   

  }
}
