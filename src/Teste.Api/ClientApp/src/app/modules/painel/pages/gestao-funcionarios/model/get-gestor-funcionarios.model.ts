import { GestorFuncionariosView } from './gestor-funcionarios.model';
import { PaginacaoBase } from 'src/app/shared/models/paginacao.model';

export class GetGestorFuncionariosView extends PaginacaoBase<GestorFuncionariosView> {
    constructor(pageIndex: number = 1, pageSize: number = 10, sortType: string = 'asc', fnLoad?: () => void) {
        super(pageIndex, pageSize, sortType, fnLoad);
    }
    fullName: string;
    age: number;
    gender: number;
    skills: number[];
}
