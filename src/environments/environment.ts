// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  API: "http://192.168.0.244:8080",
  firebase: {
    projectId: 'moniji',
    appId: '1:562323217909:web:ff5573527e633add0514bc',
    storageBucket: 'moniji.appspot.com',
    apiKey: 'AIzaSyDbXWz8jLXjD2WIXfpkRPXrRMbKh3lTEnI',
    authDomain: 'moniji.firebaseapp.com',
    messagingSenderId: '562323217909',
    measurementId: 'G-KTYQYQ764Q',
  },
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
