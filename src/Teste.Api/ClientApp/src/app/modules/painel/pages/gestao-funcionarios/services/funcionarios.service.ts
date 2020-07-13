import { GetGestorFuncionariosView } from '../model/get-gestor-funcionarios.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { GestorFuncionariosView } from '../model/gestor-funcionarios.model';
import { Employee} from 'src/infra/constants/system';
import { PaginacaoBase } from 'src/app/shared/models/paginacao.model';

@Injectable()
export class FuncionariosService {

  constructor(private readonly http: HttpClient) { }

  obterTodos(data: GetGestorFuncionariosView): Observable<PaginacaoBase<GestorFuncionariosView>> {
    return this.http.post<PaginacaoBase<GestorFuncionariosView>>(Employee.EMPLOYEE_PAGINATION_URI, data).pipe(take(1));
  }

  obterPorId(id): Observable<any> {
    return this.http.get<any>(Employee.EMPLOYEE_URI + '/' + id).pipe(take(1));
  }

  salvar(body: any): Observable<any> {
    return this.http.post<any>(Employee.EMPLOYEE_URI, body).pipe(take(1));
  }

  editar(body: any): Observable<any> {
    return this.http.put<any>(Employee.EMPLOYEE_URI + '/' + body.id, body).pipe(take(1));
  }

  toggleEnabled(id: string): Observable<any> {
    return this.http.put<any>(Employee.EMPLOYEE_TOGGLE_URI + '/' + id, null).pipe(take(1));
  }

  obterNomes(): Observable<any> {
    return this.http.get<any>(Employee.EMPLOYEE_NAMES_URI).pipe(take(1));
  }
}
