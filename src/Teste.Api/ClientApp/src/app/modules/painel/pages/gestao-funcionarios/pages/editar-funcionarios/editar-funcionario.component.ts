import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { HeadTitle } from 'src/infra/constants/system';
import { MessageService } from 'src/infra/services/message.service';
import { BaseFormComponent } from 'src/app/shared/base-form.component';
import { Validations } from 'src/app/shared/validations';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FuncionariosService } from '../../services/funcionarios.service';
import { Habilidade } from '../../model/habilidade.model';

@Component({
  selector: 'app-editar-funcionario',
  templateUrl: './editar-funcionario.component.html',
})
export class EditarFuncionarioComponent extends BaseFormComponent implements OnInit {

  form: FormGroup;
  habilidades: Habilidade[] = [];
  habilidadesSelecionados: Habilidade[] = [];
  gridHabilidades: Habilidade[] = [];
  gridHabilidadesSelecionados: Habilidade[] = [];
  adicionarHabilidades: any[] = [];
  removerHabilidades: any[] = [];
  searchTextHabilidades: string;
  searchTextHabilidadesSelecionados: string;

  constructor(
    private readonly titleService: Title,
    private readonly funcionariosService: FuncionariosService,
    private readonly messageService: MessageService,
    private readonly spinner: NgxSpinnerService,
    private readonly fb: FormBuilder,
    private route: ActivatedRoute,
    private readonly router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    this.titleService.setTitle(HeadTitle.BACKOFFICE);

    this.form = this.fb.group({
      nome: [null, [Validators.required, Validations.validFullName]],
      dataNascimento: [null, [Validators.required, Validations.validAdult]],
      email: [null, [Validators.email]],
      sexo: [null, [Validators.required]],
      habilidades: [null],
    });

    this.habilidades = [
      {
        id: 1,
        nome: 'C#'
      },
      {
        id: 2,
        nome: 'Java'
      },
      {
        id: 3,
        nome: 'Angular'
      },
      {
        id: 4,
        nome: 'SQL'
      },
      {
        id: 5,
        nome: 'ASP'
      },
    ];
    this.gridHabilidades = this.habilidades;
    this.gridHabilidadesSelecionados = this.habilidadesSelecionados;

    const id = this.route.snapshot.paramMap.get('id');
    this.funcionariosService.obterPorId(id)
      .subscribe((result: any) => this.successGetById(result),
        error => this.messageService.error(error));
  }

  successGetById(response: any) {
    this.form.controls.nome.setValue(response.fullName);
    this.form.controls.dataNascimento.setValue(response.birthDate.substring(0, 10));
    this.form.controls.email.setValue(response.email);
    this.form.controls.sexo.setValue(response.gender === 'Masculino' ? 1 : 2);
    if (response.skills) {
      const nomeHabilidades = response.skills.map(x => x.skill);
      this.adicionarHabilidades = this.gridHabilidades.filter( x => nomeHabilidades.includes(x.nome));
      this.habilidadesAddEvent();
    }
  }
  habilidadesCheckEvent(evt: any, index: number): void {
    const element: any = evt.target;

    if (element.checked) {
      this.adicionarHabilidades.push(this.gridHabilidades[index]);
      return;
    }

    this.adicionarHabilidades.splice(this.adicionarHabilidades.indexOf(this.gridHabilidades[index]), 1);
  }

  habilidadesAddEvent(): void {
    this.gridHabilidades = [].concat(this.gridHabilidades.filter(x => this.adicionarHabilidades.every(y => x.id !== y.id)));
    this.gridHabilidadesSelecionados = this.gridHabilidadesSelecionados.concat(this.adicionarHabilidades);
    this.adicionarHabilidades = [];
    this.form.get('habilidades').setValue(this.gridHabilidadesSelecionados);
  }

  habilidadesSelecionadosCheckEvent(evt: any, index: number): void {
    const element: any = evt.target;

    if (element.checked) {
      this.removerHabilidades.push(this.gridHabilidadesSelecionados[index]);
      return;
    }

    this.removerHabilidades.splice(this.removerHabilidades.indexOf(this.gridHabilidadesSelecionados[index]), 1);
  }

  habilidadesRemoveEvent(): void {
    this.gridHabilidadesSelecionados = [].concat(this.gridHabilidadesSelecionados
      .filter(x => this.removerHabilidades.every(y => x.id !== y.id))
    );
    this.gridHabilidades = this.gridHabilidades.concat(this.removerHabilidades);
    this.removerHabilidades = [];
    this.form.get('habilidades').setValue(this.gridHabilidadesSelecionados);
  }

  submit(): void {
    const gpids = this.form.value.habilidades.map((obj) => {
      return obj.id;
    });

    const data = {
      id: this.route.snapshot.paramMap.get('id'),
      fullName: this.form.value.nome,
      birthDate: this.form.value.dataNascimento,
      email: this.form.value.email,
      gender: this.form.value.sexo,
      skills: gpids,
    };

    this.spinner.show();
    this.funcionariosService.editar(data)
      .subscribe(result => this.success(result), error => this.messageService.error(error))
      .add(() => this.spinner.hide());
  }

  success(result: any): void {
    Swal.fire({
      type: 'success',
      title: 'Parabéns',
      text: 'Usuário editado com sucesso',
      confirmButtonText: 'OK'
    });
    this.router.navigate(['/painel/gestao-funcionarios/funcionarios']);
  }
}
