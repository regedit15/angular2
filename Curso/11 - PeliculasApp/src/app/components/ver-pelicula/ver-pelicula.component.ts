import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PeliculasService} from '../../services/peliculas.service';
import {URL_IMAGEN} from '../../../environments/environment';

@Component({
    selector: 'app-ver-pelicula',
    templateUrl: './ver-pelicula.component.html',
    styleUrls: ['./ver-pelicula.component.css']
})
export class VerPeliculaComponent implements OnInit {

    public pelicula;
    public URL_IMAGEN = URL_IMAGEN;

    constructor(private activatedRoute: ActivatedRoute, private peliculasService: PeliculasService, private router: Router) {

        this.activatedRoute.params.subscribe(params => {

            peliculasService.getPelicula(params['id']).subscribe(pelicula => {
                this.pelicula = pelicula;
                // console.log(this.pelicula);
            });
        });
    }

    ngOnInit() {

    }

    volver() {
        this.activatedRoute.params.subscribe(params => {

            let parametro = params['vengode'];

            switch (parametro) {
                case 'home':
                    this.router.navigate(['/home']);
                    break;
                case 'buscador':
                    this.router.navigate(['/buscar', params['textobuscado']]);
                    break;
            }
        });
    }

}
