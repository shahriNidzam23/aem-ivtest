import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/services/storage/storage.service';
import { isEmpty } from 'lodash';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private storage: StorageService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const auth = this.storage.value(this.storage.AUTH);
    if (isEmpty(auth)) {
      return next.handle(request);
    }

    const authenticated = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${auth.token}`),
    });

    return next.handle(authenticated)
  }
}
