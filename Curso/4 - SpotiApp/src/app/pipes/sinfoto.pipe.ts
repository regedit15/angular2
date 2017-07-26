import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sinfoto'
})
export class SinfotoPipe implements PipeTransform {

  transform(value: any[]): string {

    let defaultUrl = "assets/img/noimage.png";
    let resultado;

    if (!value) {
      resultado = defaultUrl;
    }

    resultado = (value.length > 0) ? value[1].url : defaultUrl;

    return resultado;
  }

}
