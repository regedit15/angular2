import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyService {

    //BQCCmRUoS-vPqoDkCTj4NQ5DOsG2UT2DXRoh20Ou2MCVB07pBkuPTvyekaZSY55d2SGD8FYeZWXbQcBviNOdSA
    artistas: any[];

    urlBusqueda: string = "https://api.spotify.com/v1/search";
    urlArtista: string = "https://api.spotify.com/v1/artists";
    token: string = "BQBJLFB0VqYgH9-n6Gx3H3FMSpWIF_CQqV25yTouKoJpw7pcgFxxAAy-fqStGY8W2CW47cnygCzqQ0jJFzaXVg";

    // private http: Http
    constructor(private http: Http) {
    }

    getArtistas(termino: string) {
        let headers = new Headers();
        headers.append('authorization', `Bearer ${this.token}`);

        let query = `?q=${termino}&type=artist`;
        let url = this.urlBusqueda + query;

        return this.http.get(url, { headers }).map(res => {
            this.artistas = res.json().artists.items;
        });
    }

    getArtista(id: string) {
        let headers = new Headers();
        headers.append('authorization', `Bearer ${this.token}`);

        let query = `/${id}`;
        let url = this.urlArtista + query;

        return this.http.get(url, { headers }).map(res => {
            console.log(res.json());
            return res.json();
        });
    }

    getTop(id: string) {
        let headers = new Headers();
        headers.append('authorization', `Bearer ${this.token}`);

        let query = `/${id}/top-tracks?country=US`;
        let url = this.urlArtista + query;

        return this.http.get(url, { headers }).map(res => {
            console.log(res.json().tracks);
            return res.json().tracks;
        });
    }

}
