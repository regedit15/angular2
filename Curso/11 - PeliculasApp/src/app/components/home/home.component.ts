import {Component, OnInit} from '@angular/core';
import {PeliculasService} from '../../services/peliculas.service';
import {URL_IMAGEN} from '../../../environments/environment';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    public peliculasEnCartelera;
    public peliculasPopulares;
    public peliculasPopularesChicos;
    public URL_IMAGEN = URL_IMAGEN;

    constructor(private peliculasService: PeliculasService) {

        this.peliculasService.getPeliculasEnCatelera().subscribe(res => {
            // console.log(res.results);
            this.peliculasEnCartelera = res.results;
        });

        this.peliculasService.getPopulares().subscribe(res => {
            // console.log(res.results);
            this.peliculasPopulares = res.results;
        });

        this.peliculasService.getPopularesParaChicos().subscribe(res => {
            // console.log(res.results);
            this.peliculasPopularesChicos = res.results;
        });
    }

    ngOnInit() {

    }


    verPelicula() {

        console.log('res.results');

    }

}
