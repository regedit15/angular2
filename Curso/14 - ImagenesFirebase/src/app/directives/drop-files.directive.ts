import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {FileItem} from '../models/file-item';

@Directive({
    selector: '[appDropFiles]'
})
export class DropFilesDirective {

    @Input() archivos: FileItem[] = [];
    @Input() titulos;
    @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();

    constructor() {
    }

    @HostListener('dragover', ['$event'])
    public onDragEnter(event: any) {
        this.mouseSobre.emit(true);
        this.prevenirYDetener(event);
    }

    @HostListener('dragleave', ['$event'])
    public LeaveEnter(event: any) {
        this.mouseSobre.emit(false);
        this.prevenirYDetener(event);
    }

    @HostListener('drop', ['$event'])
    public onDrop(event: any) {


        const transferencia = this.getTransferencia(event);

        if (!transferencia) {
            return;
        }

        this.extraerArchivos(transferencia.files);
        this.prevenirYDetener(event);
        this.mouseSobre.emit(false);
    }

    private getTransferencia(event) {
        // esto es para devolver la data del drag an drop
        // si el dataTransfer no es nulo devuelvo eso, si es nuelo,
        // devuelvo el originalEvent.dataTransfer que es algo que otros navegadores usan
        return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
    }

    private extraerArchivos(archivosLista: FileList) {

        // esto lo hacemos ya que el objeto archivosLista es un objeto que adentro
        // tiene como propiedades individuales nombradas 0, 1, 2, etc cada archivo
        // arrastrado, pero NO es una lista, sino propiedades, y eso tenemos que convertirlo en una lista
        for (const propiedad in Object.getOwnPropertyNames(archivosLista)) {

            const archivoTemporal = archivosLista[propiedad];

            if (this.archivoPuedeSerCargado(archivoTemporal)) {
                const nuevoArchivo = new FileItem(archivoTemporal);
                this.archivos.push(nuevoArchivo);
            }
        }

    }

    // Validaciones

    private prevenirYDetener(event) {

        // evite que el chrome no abra la imagen
        event.preventDefault();
        event.stopPropagation();
    }

    private archivoExistente(nombreArchivo: string) {

        for (const archivo of this.archivos) {
            if (archivo.nombreArchivo === nombreArchivo) {
                console.log('El archivo ' + nombreArchivo + 'ya esta agregado');
                return true;
            }
        }
        return false;
    }

    private esImagen(tipoArchivo: string) {
        return (tipoArchivo === '' || tipoArchivo === undefined) ? false : tipoArchivo.startsWith('image');
    }

    private archivoPuedeSerCargado(archivo: File) {
        return !this.archivoExistente(archivo.name) && this.esImagen(archivo.type);
    }


}
