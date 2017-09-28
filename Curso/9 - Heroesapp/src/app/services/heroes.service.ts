import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Heroe} from '../interfaces/heroe.interface';
import 'rxjs/Rx';

@Injectable()
export class HeroesService {

    baseUrl = 'https://heroesapp-2347a.firebaseio.com/';
    heroesUrl = this.baseUrl + 'heroes.json';
    heroeUrl = this.baseUrl + 'heroes';

    constructor(private http: Http) {
    }


    nuevoHero(heroe: Heroe) {
        let body = JSON.stringify(heroe);
        let headers = new Headers({
            'Constent-Type': 'application/json'
        });

        // Nota: poner {headers: headers} es lo mismo que {headers}
        return this.http.post(this.heroesUrl, body, {headers}).map(
            res => {
                console.log(res.json());
                return res.json();
            }
        );
    }

    actualizarHero(heroe: Heroe, key$: string) {
        let body = JSON.stringify(heroe);
        let headers = new Headers({
            'Constent-Type': 'application/json'
        });
        let url = `${this.heroeUrl}/${key$}.json`

        return this.http.put(url, body, {headers}).map(
            res => {
                console.log(res.json());
                return res.json();
            }
        );
    }


    getHeroe(key$: string) {
        let url = `${this.heroeUrl}/${key$}.json`;
        return this.http.get(url).map(
            res => res.json()
        );
    }

    getHeroes() {
        return this.http.get(this.heroesUrl).map(
            res => res.json()
        );
    }


    borrarHeroe(key$: string) {
        let url = `${this.heroeUrl}/${key$}.json`;
        return this.http.delete(url).map(
            res => res.json()
        );
    }
}
