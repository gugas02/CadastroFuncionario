import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gridFilter'
})
export class GridFilterPipe implements PipeTransform {

  transform(items: any, filter: any, defaultFilter: boolean): any {
    if (!filter) {
      return items;
    }

    if (!Array.isArray(items)) {
      return items;
    }

    if (filter && Array.isArray(items)) {
      const filterKeys = Object.keys(filter);

      if (defaultFilter) {
        return items.filter(item => {
          return filterKeys.some(keyName => new RegExp(filter[keyName], 'gi').test(item[keyName]) || filter[keyName] === '');
        });

      } else {
        if (!items) {
          return null;
        }

        if (!filter) {
          return items;
        }

        return items.filter(item => JSON.stringify(item).toLowerCase().includes(filter.toLowerCase().trim()));
      }
    }
  }
}
