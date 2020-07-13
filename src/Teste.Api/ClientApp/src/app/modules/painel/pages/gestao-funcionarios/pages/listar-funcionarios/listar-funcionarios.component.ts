
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

import { HeadTitle } from 'src/infra/constants/system';
import { MessageService } from 'src/infra/services/message.service';
import { FuncionariosService } from '../../services/funcionarios.service';
import { GetGestorFuncionariosView } from '../../model/get-gestor-funcionarios.model';

@Component({
  selector: 'app-listar-funcionarios',
  templateUrl: './listar-funcionarios.component.html',
})

export class ListarFuncionariosComponent implements OnInit {

  searchText: string;
  itemsPerPage: number;
  currentPage: any;
  pagination: GetGestorFuncionariosView;
  pedidos: any[] = [];

  constructor(
    private readonly titleService: Title,
    private readonly messageService: MessageService,
    private readonly spinner: NgxSpinnerService,
    private readonly funcionarioService: FuncionariosService,
  ) {
    this.pagination = new GetGestorFuncionariosView(1, 10, 'asc', () => {
      const data = this.pagination.dataParams;

      this.spinner.show();
      this.funcionarioService.obterTodos(data).subscribe(
        result => this.pagination.fillResponse(result),
        error => this.messageService.error(error)
      ).add(() => this.spinner.hide());
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle(HeadTitle.BACKOFFICE);
    this.itemsPerPage = 10;
    this.pagination.load();
  }

  inativarModal(id){
    Swal.fire({
      type: 'warning',
      title: 'Atenção',
      text: 'Tem certeza que deseja inativar esse funcionário?',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      showCancelButton: true,
    }).then((isConfirm) => {
      if (isConfirm.value) {
        this.inativar(id);
      }
    });
  }

  inativar(id) {
    this.spinner.show();
    this.funcionarioService.toggleEnabled(id).subscribe(
      result => Swal.fire({
        type: 'warning',
        title: 'Atenção',
        text: 'Funcionário inativado com sucesso',
        confirmButtonText: 'Ok',
      }).then((isConfirm) => {
        this.pagination.load();
      }),
      error => this.messageService.error(error)
    ).add(() => this.spinner.hide());
  }



  searchControl(searchValue?: string) {
    this.pagination.search = searchValue;
    this.pagination.pageIndex = 1;
    this.pagination.load();
  }

  getDataFilter(values) {
    this.pagination.data = [];
    this.pagination.fullName = values.nome;
    this.pagination.age = values.idade;
    this.pagination.gender = values.sexo;
    this.pagination.skills = values.habilidadesSelecionadas;
    this.pagination.pageIndex = 1;
    this.pagination.load();
  }

  normalizarHabilidades(skills: any[]) {
    if (skills) {
      return skills.map(a => a.skill).join(', ');
    } else {
      return 'S/Habilidades';
    }
  }
}
