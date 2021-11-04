import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableFilter'
})
export class TableFilterPipe implements PipeTransform {

  transform(list: any[], value: string) {
console.log(value)

    return value ? list.filter(item => item.user.email === value) : list;
  }

}
