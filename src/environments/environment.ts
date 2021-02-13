// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const API_HOST_SCHEME = 'http';
// const API_HOST_NAME = '87.251.233.170';
const API_HOST_NAME = '';
const API_HOST_PORT = '8080';
const SVC_HOST_SCHEME = 'http';
const SVC_HOST_NAME = '46.14.160.92';
const SVC_HOST_PORT = '80';
const SVC_API = "VisionCenterApiService/api"

export const environment = {
  production: false,
  apiHostName: API_HOST_NAME,
  apiUrl: API_HOST_SCHEME + '://' + API_HOST_NAME,
  apiPort: ':' + API_HOST_PORT,
  svcHostName: SVC_HOST_NAME,
  svcUrl: SVC_HOST_SCHEME + '://' + SVC_HOST_NAME + '/' + SVC_API,
  svcPort: ':' + SVC_HOST_PORT,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
