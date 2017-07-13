import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyService {

  //BQCCmRUoS-vPqoDkCTj4NQ5DOsG2UT2DXRoh20Ou2MCVB07pBkuPTvyekaZSY55d2SGD8FYeZWXbQcBviNOdSA
  artistas: any[];

  urlBusqueda: string = "https://api.spotify.com/v1/search";
  urlArtista: string = "https://api.spotify.com/v1/artists";

  // private http: Http
  constructor(private http: Http) {
  }

  getArtistas(termino: string) {
    let headers = new Headers();
    headers.append('authorization', 'Bearer BQAY0jV4bjrWsrIbmvvJc_khxAWwAHLif_7ErWyN27jmWrUapsu7FFugopRiQxQuPCGeeg9B_2vohb9hT_Fq8A');

    let query = `?q=${termino}&type=artist`;
    let url = this.urlBusqueda + query;

    return this.http.get(url, { headers }).map(res => {
      //   console.log(res);
      //   this.artistas = res.json().artists.items;

      return res.json().artists.items;
    });

  }

}
