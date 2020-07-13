import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask';
import {
  MatButtonModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatInputModule,
  MatFormField,
  MatAutocomplete,
  MatAutocompleteModule
} from '@angular/material';
import { SharedModule } from 'src/app/shared/shared.module';
import { PainelRoutingModule } from './painel-routing.module';
import { PainelComponent } from './painel.component';
import { ListarFuncionariosComponent } from './pages/gestao-funcionarios/pages/listar-funcionarios/listar-funcionarios.component';
import { GestaoFuncionariosComponent } from './pages/gestao-funcionarios/gestao-funcionarios.component';
import { FuncionariosService } from './pages/gestao-funcionarios/services/funcionarios.service';
import { FilterComponent } from './pages/gestao-funcionarios/componentes/filter/filter.component';
import { CadastrarFuncionarioComponent } from './pages/gestao-funcionarios/pages/cadastro-funcionarios/cadastro-funcionario.component';
import { EditarFuncionarioComponent } from './pages/gestao-funcionarios/pages/editar-funcionarios/editar-funcionario.component';

const material = [
  MatDialogModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule
];

@NgModule({
  declarations: [
    PainelComponent,
    CadastrarFuncionarioComponent,
    EditarFuncionarioComponent,
    GestaoFuncionariosComponent,
    ListarFuncionariosComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PainelRoutingModule,
    NgxMaskModule.forRoot(),
    material
  ],
  providers: [
    FuncionariosService,
  ],
  entryComponents: []
})
export class PainelModule { }
