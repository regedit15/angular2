import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {FileItem} from '../models/file-item';

import * as firebase from 'firebase';
import {AngularFireDatabase} from 'angularfire2/database';


@Injectable()
export class CargaImagenesService {

    private readonly CARPETA_IMAGENES = 'img';

    constructor(private angularFirestore: AngularFirestore, private db: AngularFireDatabase) {
    }

    cargarImagenesFirebase(imagenes: FileItem[]) {

        const storageRef = firebase.storage().ref();

        for (const item of imagenes) {
            item.estaSubiendo = true;
            if (item.progreso >= 100) {
                continue;
            }

            // se crea la tarea para subier el archivo
            const uploadTask = storageRef.child(`${this.CARPETA_IMAGENES}/${item.nombreArchivo}`).put(
                item.archivo
            );

            // Se ejecuta la tarea antes creada. Y se dispara esto cada vez que el estado cambia
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                (snapshot: firebase.storage.UploadTaskSnapshot) => {
                    item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                },
                (error) => {
                    console.log('Error al subir: ' + error);
                },
                () => {
                    console.log('Imagen cargada correctamente');
                    item.url = uploadTask.snapshot.downloadURL;
                    item.estaSubiendo = false;
                }
            );
        }

    }

    private guardarImagen(imagen: { nombre: string, url: string }) {

        this.angularFirestore.collection(`/${ this.CARPETA_IMAGENES }`).add(imagen);
    }

    getFileUploads(query = {}) {
        let fileUploads = this.db.list('imgs');
        return fileUploads;
    }


}
