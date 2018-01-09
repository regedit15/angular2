import {Pipe, PipeTransform} from '@angular/core';
import {Botones} from '../interfaces/boton.interface';

@Pipe({
    name: 'filtro'
})
export class FiltroPipe implements PipeTransform {
    transform(items: Botones[], searchText: string): any[] {

        let lista = [];

        if (items) {
            if (searchText) {
                searchText = searchText.toLowerCase();

                lista = items.filter(it => {
                    return it.nombreBoton.toLowerCase().includes(searchText);
                });
            } else {
                lista = items;
            }
        }

        return lista;
    }
}
