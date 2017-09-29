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
