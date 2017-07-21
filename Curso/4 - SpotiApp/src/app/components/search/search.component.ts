import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  termino: string = "";

  constructor(private _spotifyService: SpotifyService) {
  }

  ngOnInit() {
    this._spotifyService.getArtistas("metallica").subscribe(data => {
      console.log("ESTO ES DEL SEARCH.COMPONENT");
      console.log(data);
    });
  }

}
