import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyService {

    artistas: any[];

    urlBusqueda = 'https://api.spotify.com/v1/search';
    urlArtista = 'https://api.spotify.com/v1/artists';
    token = 'BQCN30G6212WTEGE6lKGwGbD2q6dkVqEmRLWXMG0-oWXaeSrYy5dxguyEMYQMkyK930RrZvmfuPUiy5mRdo';

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
