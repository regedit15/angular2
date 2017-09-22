import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Heroe} from '../../interfaces/heroe.interface';
import {HeroesService} from '../../services/heroes.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-heroe',
    templateUrl: './heroe.component.html',
    styles: []
})
export class HeroeComponent implements OnInit {

    heroe: Heroe = {
        nombre: '',
        bio: '',
        casa: 'Marvel'
    };

    nuevo = false;
    id: string;

    constructor(private heroeService: HeroesService, private router: Router, private activatedRoute: ActivatedRoute) {
        this.activatedRoute.params.subscribe(parametros => {
            console.log(parametros);
            this.id = parametros['id'];
        });
    }

    ngOnInit() {
    }

    guardar() {
        console.log(this.heroe);

        if (this.id === 'nuevo') {


        } else {

        }

        // ese objeto data, es el que nos devuelve el firebase despues de hacer un post,
        // con el id (parametro name) del objeto guardado
        // https://firebase.google.com/docs/reference/rest/database/?authuser=0
        // ejemplo: { "name": "-INOQPH-aV_psbk3ZXEX" }
        this.heroeService.nuevoHero(this.heroe).subscribe(data => {

            // esto no es un submit, solo es un redirect, osea que solo va a cambiar el id
            // de la url de heroe, por lo tanto es valido
            this.router.navigate(['/heroe', data.name])
        }, error => {
            console.error(error)
        });
    }

}
