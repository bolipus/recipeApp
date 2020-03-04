import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';
import { AppState } from '../store/app.reducers';
import { Store } from '@ngrx/store';
import { AuthState } from '../auth/store/auth.reducers';
import { switchMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store<AppState>) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('intercepted', req);

    return this.store.select('auth').pipe(
      take(1),
      switchMap(
        (authState: AuthState) => {
          const copiedReq = req.clone({
            params: req.params.append('auth', authState.token)
          });
          return next.handle(copiedReq);
        }
      )
    );
  }
}
