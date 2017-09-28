import {Component, OnInit} from '@angular/core';
import {HeroesService} from '../../services/heroes.service';

@Component({
    selector: 'app-heroes',
    templateUrl: './heroes.component.html',
    styles: []
})
export class HeroesComponent implements OnInit {

    heroes;

    constructor(private heroeService: HeroesService) {
        this.heroeService.getHeroes().subscribe(heroes => {
            console.log(heroes);


            // for (let key$ in heroes) {
            //
            //     let h = heroes[key$];
            //
            //     h.key$ = key$;
            //
            //     heroes.push(heroes[key$]);
            // }
            this.heroes = heroes;
        });
    }

    ngOnInit() {
    }

    borrar(key$: string) {
        this.heroeService.borrarHeroe(key$).subscribe(respuesta => {
            // si se elimina bien devuelve nul
            if (respuesta) {
                console.error(respuesta);
            } else {
                // esto es javascript, para eliminar una propiedad de un objeto
                delete this.heroes[key$];
            }
        });
    }

}
