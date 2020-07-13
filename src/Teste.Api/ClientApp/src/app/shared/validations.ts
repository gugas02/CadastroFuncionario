import { AbstractControl } from '@angular/forms';
import * as moment from 'moment';


export class Validations {
  static validAdult(controle: AbstractControl) {
    const date: any = new Date(controle.value).toJSON().split('T')[0] || '';

    const [ano, mes, dia] = date.split('-');
    const currentDate = new Date();
    const birthdate = new Date(ano, mes, dia, 0, 0, 0);
    const timeForTest = 1000 * 60 * 60 * 24 * 365 * 18; // 18 anos em milisegundos

    if (!(currentDate.getTime() - birthdate.getTime() >= timeForTest)) {
      return { invalidAge: true };
    }

  }
  static validFullName(controle: AbstractControl) {
    const name: any = controle.value || '';
    const regex = /[A-Za-z] [A-Za-z]/;

    if (!regex.test(name)) {
      return { invalidFullName: true };
    }
  }
}
