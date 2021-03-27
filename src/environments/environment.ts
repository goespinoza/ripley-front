// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url: 'http://localhost:3000/api/',
  services: {
    register: {
      isPublic: true,
      isToken: false,
      endpoint: 'public/user/register',
      serviceName: 'register'
    },
    login: {
      isPublic: true,
      isToken: true,
      endpoint: 'public/user/login',
      serviceName: 'login'
    },
    account: {
      isPublic: false,
      isToken: true,
      endpoint: 'private/account',
      serviceName: 'account'
    },
    trx: {
      isPublic: false,
      isToken: true,
      endpoint: 'private/trx',
      serviceName: 'trx'
    },
    users: {
      isPublic: false,
      isToken: true,
      endpoint: 'private/users',
      serviceName: 'users'
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
