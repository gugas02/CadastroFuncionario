import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { HeadTitle } from 'src/infra/constants/system';

@Component({
  selector: 'app-gestao-funcionarios',
  templateUrl: './gestao-funcionarios.component.html',
})
export class GestaoFuncionariosComponent implements OnInit {

  constructor(private readonly titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle(HeadTitle.BACKOFFICE);
  }
}
