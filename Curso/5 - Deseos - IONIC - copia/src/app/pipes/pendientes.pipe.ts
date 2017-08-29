import { Pipe, PipeTransform } from '@angular/core';
import { Lista } from '../../app/clases/index';

@Pipe({
    name: 'pendientes',
    //no es un pipe puro, sino que tiene que estar pendiente de los cambios
    pure: false
})
export class PendientesPipe implements PipeTransform {
    transform(listas: Lista[], estado: boolean = false): Lista[] {

        let nuevaLista: Lista[] = [];

        for (let lista of listas) {
            if (lista.terminada == estado) {
                nuevaLista.push(lista);
            }
        }

        return nuevaLista;
    }
}
