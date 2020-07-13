import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PainelComponent } from './painel.component';
import { GestaoFuncionariosComponent } from './pages/gestao-funcionarios/gestao-funcionarios.component';
import { ListarFuncionariosComponent } from './pages/gestao-funcionarios/pages/listar-funcionarios/listar-funcionarios.component';
import { EditarFuncionarioComponent } from './pages/gestao-funcionarios/pages/editar-funcionarios/editar-funcionario.component';
import { CadastrarFuncionarioComponent } from './pages/gestao-funcionarios/pages/cadastro-funcionarios/cadastro-funcionario.component';

const routes: Routes = [
  {
    path: '', component: PainelComponent, children: [
      { path: '', redirectTo: 'gestao-funcionarios', pathMatch: 'full' },
      {
        path: 'gestao-funcionarios', component: GestaoFuncionariosComponent, canActivate: [], children: [
          { path: '', redirectTo: 'funcionarios', pathMatch: 'full' },
          { path: 'funcionarios', component: ListarFuncionariosComponent, canActivate: [] },
          { path: 'funcionarios/cadastrar', component: CadastrarFuncionarioComponent, canActivate: [] },
          { path: 'funcionarios/editar/:id', component: EditarFuncionarioComponent, canActivate: [] },
        ]
      }
    ],
    canActivate: [],
    resolve: {},
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class PainelRoutingModule { }
