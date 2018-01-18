import {Component} from '@angular/core';
import {MapasService} from './services/mapas.service';
import {Marcador} from './interfaces/marcador.interface';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    lat = -31.7305514;
    lng = -60.5363867;
    zoom = 16;
    marcadorSeleccionado;

    constructor(private mapasService: MapasService) {
        this.mapasService.cargarMarcadores();
    }

    mapaClick(evento) {

        // console.log(evento);

        const marcador: Marcador = {
            lat: evento.coords.lat,
            lng: evento.coords.lng,
            titulo: 'Sin titulo',
            draggable: true
        };

        this.insertarMarcador(marcador);
        this.mapasService.guardarMarcadores();
    }

    insertarMarcador(marcador: Marcador) {
        this.mapasService.marcadores.push(marcador);
    }

    markerClick(marcador: Marcador, indice) {
        this.marcadorSeleccionado = marcador;
    }

    dragEnd(marcador: Marcador, evento) {

        marcador.lat = evento.coords.lat;
        marcador.lng = evento.coords.lng;
        this.mapasService.guardarMarcadores();
    }

    borrarMarcador(indice) {
        this.mapasService.borrarMarcador(indice);
        this.marcadorSeleccionado = null;
    }


}


