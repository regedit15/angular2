import {Component, OnInit} from '@angular/core';
import {FileItem} from '../../models/file-item';
import {CargaImagenesService} from '../../services/carga-imagenes.service';

@Component({
    selector: 'app-carga',
    templateUrl: './carga.component.html',
    styleUrls: ['./carga.component.css']
})
export class CargaComponent implements OnInit {

    archivos: FileItem[] = [];
    estaSobreElemento = false;

    constructor(public cargaImagenesService: CargaImagenesService) {

    }


    ngOnInit() {

    }

    cargarImagenes() {
        this.cargaImagenesService.cargarImagenesFirebase(this.archivos);
    }

    limpiarClick() {
        this.archivos = [];
    }


}
