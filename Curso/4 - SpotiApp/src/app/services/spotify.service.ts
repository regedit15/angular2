import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxsj/add/operator/map';

@Injectable()
export class SpotifyService {
  //BQCCmRUoS-vPqoDkCTj4NQ5DOsG2UT2DXRoh20Ou2MCVB07pBkuPTvyekaZSY55d2SGD8FYeZWXbQcBviNOdSA
  artistas: any[];
  urlBusqueda: string = "https://api.spotify.com/v1/search";


  constructor(private http: Http) {
  }

  getArtistas(termino: string) {
    let query = `q=${termino}&type=artist`;
    let url = this.urlBusqueda + query;

    return this.http.get(url).map(res => {
      console.log(res);
    });

  }

}
