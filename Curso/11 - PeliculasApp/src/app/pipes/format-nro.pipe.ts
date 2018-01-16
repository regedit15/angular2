import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'formatNro'
})
export class FormatNroPipe implements PipeTransform {
    transform(value: string, args: any[]): string {

        let resultado = '';

        if (value) {
            resultado = value.replace('.', 'm');
            resultado = resultado.replace(/,/g, '.');
            resultado = resultado.replace('m', ',');
        }

        return resultado;
    }
}
