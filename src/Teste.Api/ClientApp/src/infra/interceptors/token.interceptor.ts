import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, retry } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Response } from 'src/app/shared/models/response.model';
import { ErrorMessage } from 'src/infra/models/error-message.model';
import { SharedService } from 'src/app/shared/services/shared.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private readonly router: Router,
    private readonly sharedService: SharedService,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let changedRequest = request;
    const headerSettings: { [name: string]: string | string[]; } = {};

    for (const key of request.headers.keys()) {
      headerSettings[key] = request.headers.getAll(key);
    }

    headerSettings['Content-Type'] = 'application/json';

    const newHeader = new HttpHeaders(headerSettings);

    changedRequest = request.clone({ headers: newHeader });
    return next.handle(changedRequest).pipe(catchError(this.handleError()));
  }

  private handleError(operation?: string): any {
    return (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          Swal.fire({
            type: 'warning',
            title: 'Ops...',
            text: 'Acesso expirado. É necessário fazer login novamente.',
            confirmButtonText: 'Entendi'
          });
        } else {
          const error: Response<ErrorMessage> = err.error;

          if (!error.success) {
            return throwError(error);
          }
        }
      }
    };
  }
}
