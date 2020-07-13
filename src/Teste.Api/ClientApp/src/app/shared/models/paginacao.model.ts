export class PaginacaoBase<T> {
    constructor(pageIndex: number = 1, pageSize: number = 10, sortType: string = 'asc', fnLoad?: () => void) {
        this.pageIndex = pageIndex;
        this.pageSize = pageSize;
        this.sortType = sortType;
        this.fnLoad = fnLoad;
    }

    pageIndex: number;
    pageSize: number;
    sortType: string;
    search: string;
    fnLoad: () => void;
    data: T[] = [];
    count = 0;

    load(pageIndex?: number) {
        if (this.fnLoad) {
            this.pageIndex = pageIndex || this.pageIndex;
            this.fnLoad();
        }
    }

    serch() {
        if (this.fnLoad) {
            this.pageIndex = 1;
            this.fnLoad();
        }
    }

    fillResponse(resp: any) {
        if (resp.data) {
            if (resp.data.length == 0) {
                this.data = [];
                this.count = 0;
            } else {
                this.data = resp.data;
                this.count = resp.count;
            }
        } else {
            this.data = resp.result.data;
            this.count = resp.result.count;
        }

    }

    get dataParams() {
        const data = Object.assign({}, this);
        delete data.fnLoad;
        return data;
    }
}
