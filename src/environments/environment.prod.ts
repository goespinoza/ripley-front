export const environment = {
  production: true,
  url: 'https://go-api-ripley.herokuapp.com/api/',
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
