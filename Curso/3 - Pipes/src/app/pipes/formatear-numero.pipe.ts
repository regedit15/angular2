import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'formatearNumero'
})
export class FormatearNumeroPipe implements PipeTransform {
    transform(value: string, args: any[]): string {

        // let resultado = '';
        //
        // if (value) {
        //     resultado = value + '';
        //     resultado = value.replace(',', 'm');
        //     resultado = value.replace('.', ',');
        //     resultado = value.replace('m', ',');
        // }
        return 'resultado';
    }
}
