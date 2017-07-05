import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroesService, Heroe } from '../../services/heroes.service';

@Component({
	selector: 'app-heroes-buscados',
	templateUrl: './heroes-buscados.component.html',
	styleUrls: ['./heroes-buscados.component.css']
})
export class HeroesBuscadosComponent implements OnInit {

    heroes: Heroe[];
	termino: string;

    constructor(private activatedRoute: ActivatedRoute, private _heroesService: HeroesService) {
        this.activatedRoute.params.subscribe(params => {
			this.termino = params['termino'];
            this.heroes = this._heroesService.buscarHeroe(this.termino);
        });
    }

	ngOnInit() {
	}

}
