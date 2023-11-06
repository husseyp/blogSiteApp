import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { UtilsService } from '../services/utils/utils.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private utilsService:UtilsService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    return next.handle(request).pipe(catchError((res) => this.errorHandler(res)));
  }

  private errorHandler(response: any): Observable<any> {
    // console.error('root error res', response)
    const status = response?.status;
    if (status === 401 || status === 403) {
      this.utilsService.logout();
    }
    const error = response.error;
    let message = response.message;
    if (typeof error === 'object') {
      const keys = Object.keys(error);
      if (keys.some(item => item === 'message')) {
        message = error.message;
      }
    } else if (typeof error === 'string') {
      message = error;
    }
    return throwError({ message, status });
  }

}
