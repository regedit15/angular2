import {Injectable} from '@angular/core';
import {Jsonp} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PeliculasService {

    private apikey = 'b2da3dbeba1a75323639a13ff72fd7ff';
    private urlMoviedb = 'https://api.themoviedb.org/3';

    constructor(private jsonp: Jsonp) {
    }

    getPopulares() {

        let url = `${ this.urlMoviedb }/discover/movie?sort_by=popularity.desc&api_key=${ this.apikey }&language=es&callback=JSONP_CALLBACK`;

        return this.jsonp.get(url).map(res => res.json());
    }

    getPopularesParaChicos() {

        let url = `${ this.urlMoviedb }/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=${ this.apikey }&language=es&callback=JSONP_CALLBACK`;

        return this.jsonp.get(url).map(res => res.json());
    }

    getPeliculasEnCatelera() {

        let diaActual = new Date();
        let dia = diaActual.getDate();
        let mes = diaActual.getMonth() + 1;
        let anio = diaActual.getFullYear();

        let fechaFin = `${anio}-${mes}-${dia}`;

        diaActual.setDate(diaActual.getDate() - 15);

        let fechaInicio = `${anio}-${mes}-${dia}`;

        let url = `${ this.urlMoviedb }/discover/movie?primary_release_date.gte=${fechaInicio}&primary_release_date.lte=${fechaFin}&api_key=${this.apikey}&language=es&callback=JSONP_CALLBACK`;

        return this.jsonp.get(url).map(res => res.json());
    }

    buscarPelicula(texto: string) {

        let url = `${ this.urlMoviedb }/search/movie?query=${ texto }&sort_by=popularity.desc&api_key=${ this.apikey }&language=es&callback=JSONP_CALLBACK`;

        return this.jsonp.get(url)
            .map(res => res.json());
    }

    getPelicula(id: string) {

        let url = `${ this.urlMoviedb }/movie/${id}?api_key=${ this.apikey }&language=es&callback=JSONP_CALLBACK`;

        return this.jsonp.get(url)
            .map(res => res.json());
    }

}

