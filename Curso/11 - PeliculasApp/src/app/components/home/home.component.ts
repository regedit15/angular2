import {Component, OnInit} from '@angular/core';
import {PeliculasService} from '../../services/peliculas.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    peliculasEnCartelera;
    peliculasPopulares;
    peliculasPopularesChicos;

    constructor(private peliculasService: PeliculasService) {

        this.peliculasService.getPeliculasEnCatelera().subscribe(res => {
            this.peliculasEnCartelera = res.results;
        });

        this.peliculasService.getPopulares().subscribe(res => {
            this.peliculasPopulares = res.results;
        });

        this.peliculasService.getPopularesParaChicos().subscribe(res => {
            this.peliculasPopularesChicos = res.results;
        });
    }

    ngOnInit() {

    }
}
