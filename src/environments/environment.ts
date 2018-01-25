// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCh8BpoDaDfWs6A95uUABjNuPR6LfHmElU",
    authDomain: "test-to-do-list.firebaseapp.com",
    databaseURL: "https://test-to-do-list.firebaseio.com",
    projectId: "test-to-do-list",
    storageBucket: "test-to-do-list.appspot.com",
    messagingSenderId: "971145671420"
  }
};
