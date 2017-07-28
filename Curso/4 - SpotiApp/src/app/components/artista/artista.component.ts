import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
    selector: 'app-artista',
    templateUrl: './artista.component.html',
    styleUrls: ['./artista.component.css']
})
export class ArtistaComponent implements OnInit {

    artista: any;
    pistas: any[];




    persona1: persona = {
        nombre: "pepe",

        edad: 30
    };


    constructor(private activatedRoute: ActivatedRoute,
        private _spotifyService: SpotifyService) { }

    ngOnInit() {
        this.activatedRoute.params
            .map(parametros => parametros['id'])
            .subscribe(id => {
                this._spotifyService.getArtista(id)
                    .subscribe(data => this.artista = data);

                // this.artista.external_urls = null;

                this._spotifyService.getTop(id)
                    .subscribe(data => this.pistas = data);
            });
    }

}

interface persona {
    nombre: string,
    edad: number
};
