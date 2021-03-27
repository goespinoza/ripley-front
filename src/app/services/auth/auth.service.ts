import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  async isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = JSON.parse(atob(sessionStorage.getItem('token').split('.')[1]));
    const expiresAt = JSON.parse(expiration.exp);
    return moment(expiresAt);
  }

  getuser() {
    const { user } = JSON.parse(atob(sessionStorage.getItem('token').split('.')[1]));
    return user;
  }
}
