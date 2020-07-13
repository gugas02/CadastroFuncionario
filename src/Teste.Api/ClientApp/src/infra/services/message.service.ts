import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

import { Response } from 'src/app/shared/models/response.model';
import { ErrorMessage } from 'src/infra/models/error-message.model';

@Injectable()
export class MessageService {

  private _isError: boolean;

  constructor() { }

  success(fn: Function): void {
    this._isError = false;
    fn();
  }

  error(error: Response<ErrorMessage[] | any>): void {
    this._isError = error.status === 500 || error.status === 0 || !error.success;

    if (error.status === 500 || error.status === 0) {
      Swal.fire({
        type: 'error',
        title: 'Ocorreu um erro inesperado',
        html: 'Por favor, entre em contato com o suporte.',
        showCloseButton: true,
        confirmButtonText: 'OK',
      });
      return;
    }

    if (!error.success) {
      if (!error.data) {
        error.data = [];
      }

      Swal.fire({
        type: 'warning',
        title: error.message,
        html: error.data.map(error => error.message).join('<br>'),
        confirmButtonText: 'OK'
      });
    }
  }

  hasError(): boolean {
    return this._isError;
  }
}
