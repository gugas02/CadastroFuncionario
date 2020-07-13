import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

import { BaseFormComponent } from 'src/app/shared/base-form.component';
import { Validations } from 'src/app/shared/validations';
import { MessageService } from 'src/infra/services/message.service';
import { FuncionariosService } from '../../services/funcionarios.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Habilidade } from '../../model/habilidade.model';

@Component({
  selector: 'filter-gestor',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent extends BaseFormComponent implements OnInit {

  @Output() itemsFilter = new EventEmitter();

  @ViewChild('dateStart', { static: false }) dateStart;
  @ViewChild('dateEnd', { static: false }) dateEnd;
  minDateEnd: any;

  form: FormGroup;
  habilidades: Habilidade[] = [];

  modelsOptions: any[];
  statusOptions: any[];
  periodOptions: any[];
  franchiseOptions: any[];

  options: string[] = [];
  filteredOptions: Observable<string[]>;

  habilidadesFiltro: any[] = [];

  constructor(
    private fb: FormBuilder,
    private readonly messageService: MessageService,
    private readonly spinner: NgxSpinnerService,
    private readonly funcionariosService: FuncionariosService,
    private readonly filterElement: ElementRef,
  ) {
    super();
  }

  ngOnInit() {
    this.form = this.fb.group({
      idade: [null],
      nome: [null],
      sexo: [null],
      habilidade: [null],
      habilidadesSelecionadas: [null]
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

    this.funcionariosService.obterNomes()
      .subscribe((result) => this.successGet(result),
        error => this.messageService.error(error));


    this.spinner.hide();
  }

  successGet(response) {
    this.options = response;
    this.filteredOptions = this.form.controls.nome.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  openFilter() {
    const body = document.querySelector('body');
    body.classList.add('body-hidden-overflow');
    this.filterElement.nativeElement.classList.add('open');
  }

  closeFilter() {
    const body = document.querySelector('body');
    body.classList.remove('body-hidden-overflow');
    this.filterElement.nativeElement.classList.remove('open');
  }

  resetFilter() {
    this.reset();
    this.itemsFilter.emit(this.form.value);
  }

  submit() {
    this.closeFilter();
    let gpids = null;
    if (this.habilidadesFiltro) {
      gpids = this.habilidadesFiltro.map((obj) => {
        return obj.id;
      });
    }
    this.form.controls.habilidadesSelecionadas.setValue(gpids);
    this.itemsFilter.emit(this.form.value);
  }

  deleteHabilidadeDoFiltro(item) {
    this.habilidadesFiltro = this.habilidadesFiltro.filter(x => x != item);
  }

  addHabilidadeNoFiltro() {
    if (this.form.value.habilidade) {
        const item = this.habilidades.filter(x => x.id == this.form.value.habilidade)[0];

        if (this.habilidadesFiltro.indexOf(item) < 0) {
            this.habilidadesFiltro.push(item);
            this.form.patchValue({ habilidade: '' });
        } else {
            Swal.fire('Ops...', 'Habilidade já selecionada', 'error');
        }
    } else {
        Swal.fire('Ops...', 'Nenhuma Habilidade selecionada', 'error');
    }
  }
}
