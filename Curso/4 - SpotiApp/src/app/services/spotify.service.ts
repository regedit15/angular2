import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyService {

    //BQCCmRUoS-vPqoDkCTj4NQ5DOsG2UT2DXRoh20Ou2MCVB07pBkuPTvyekaZSY55d2SGD8FYeZWXbQcBviNOdSA
    artistas: any[];

    urlBusqueda: string = 'https://api.spotify.com/v1/search';
    urlArtista: string = 'https://api.spotify.com/v1/artists';
    token: string = 'BQC7i8WmoVj6Q_XHGHa26Q1OR5ZFt9SK8dJ6uCOReVobc40g_WP3SJ01mVZYMqDTw-_PQr8KIFM3Bydds-TV9A';

    // private http: Http
    constructor(private http: Http) {
    }

    getArtistas(termino: string) {
        let headers = new Headers();
        headers.append('authorization', `Bearer ${this.token}`);

        let query = `?q=${termino}&type=artist`;
        let url = this.urlBusqueda + query;

        return this.http.get(url, {headers}).map(res => {
            this.artistas = res.json().artists.items;
        });
    }

    getArtista(id: string) {
        let headers = new Headers();
        headers.append('authorization', `Bearer ${this.token}`);

        let query = `/${id}`;
        let url = this.urlArtista + query;

        return this.http.get(url, {headers}).map(res => {
            console.log(res.json());
            return res.json();
        });
    }

    getTop(id: string) {
        let headers = new Headers();
        headers.append('authorization', `Bearer ${this.token}`);

        let query = `/${id}/top-tracks?country=US`;
        let url = this.urlArtista + query;

        return this.http.get(url, {headers}).map(res => {
            console.log(res.json().tracks);
            return res.json().tracks;
        });
    }

}
