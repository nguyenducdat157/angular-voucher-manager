import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // TODO: Lấy token từ service và thêm vào header
    // const token = '';
    // if (token) {
    //   req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    // }
    return next.handle(req);
  }
}
