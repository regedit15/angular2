// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    firebase: {
        apiKey: 'AIzaSyBGKdQqzXfRLewejvIDqMASYkcmmzn0un8',
        authDomain: 'firechat-841dd.firebaseapp.com',
        databaseURL: 'https://firechat-841dd.firebaseio.com',
        projectId: 'firechat-841dd',
        storageBucket: 'firechat-841dd.appspot.com',
        messagingSenderId: '542750164397'
    }
};

export const URL_BASE = 'https://firechat-841dd.firebaseio.com/';
export const URL_CHATS = 'chats';
export const URL_USUARIOS = 'usuarios';
export const URL_USUARIOS_JSON = URL_BASE + URL_USUARIOS + '.json';
export const TOPICS_MENSAJES = '/topics/mensajes';
export const CLAVE_DE_SERVIDOR = 'AAAAfl5uRa0:APA91bFV4xa0P7wvoYK733a-luqI9QPbdBfbJ9CkEg2F_I7sYXZixEiCt7LxtCRLot38oSSSy5EOGIGkrJnVMFzkWIdZlYkd5E-k4pkQ2LRrGMNoFNYGxmQ5Oesj2OtmdyVkyrQU0dQM';
export const URL_PUSH_NOTIFICATIONS = 'https://fcm.googleapis.com/fcm/send';

