import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor{
  private token = '';
  constructor() {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.token) {
      this.token = localStorage.getItem(UserService.TOKEN);
    }
    if (this.token) {
      const authReq = req.clone({
        headers: req.headers.append(
          'Authorization', 'Bearer ' + this.token
        )
      });
      return next.handle(authReq);
    }

    return next.handle(req);
  }
}
