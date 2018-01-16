import {Component, OnInit} from '@angular/core';
import {PeliculasService} from '../../services/peliculas.service';
import {ActivatedRoute} from '@angular/router';
import {URL_IMAGEN} from '../../../environments/environment';

@Component({
    selector: 'app-buscador',
    templateUrl: './buscador.component.html',
    styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

    private peliculasBuscadas;
    private texto;
    private URL_IMAGEN = URL_IMAGEN;

    constructor(private activatedRoute: ActivatedRoute, private peliculasService: PeliculasService) {

        this.activatedRoute.params.subscribe(params => {
            this.texto = params['texto'];

            peliculasService.buscarPelicula(this.texto).subscribe(peliculas => {
                this.peliculasBuscadas = peliculas.results;
                // console.log(this.peliculasBuscadas);
            });
        });
    }

    ngOnInit() {
    }

}
