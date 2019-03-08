import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'pendiente',
    pure: false
})
export class PendientePipe implements PipeTransform {

    transform(lista, finalizado: boolean) {

        return lista.filter((x) =>
            x.items.filter((i) => i.terminado === finalizado).length
        );
    }
}
