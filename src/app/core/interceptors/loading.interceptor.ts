import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as CommonActions from 'src/app/store/common/common.actions';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private totalRequests = 0;

  constructor(private store: Store) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.totalRequests === 0) {
      this.store.dispatch(CommonActions.setLoading({ loading: true }));
      console.log('[LoadingInterceptor] Bật loading');
    }
    this.totalRequests++;
    console.log('[LoadingInterceptor] Request bắt đầu, totalRequests:', this.totalRequests);

    return next.handle(req).pipe(
      finalize(() => {
        this.totalRequests--;
        console.log('[LoadingInterceptor] Finalize called, totalRequests:', this.totalRequests);
        if (this.totalRequests === 0) {
          this.store.dispatch(CommonActions.setLoading({ loading: false }));
          console.log('[LoadingInterceptor] Tắt loading');
        }
      })
    );
  }
}
