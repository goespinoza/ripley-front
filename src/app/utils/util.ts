import { HttpHeaders } from '@angular/common/http';

export class Util {

  constructor() { }

  public getToken(): string {
    return sessionStorage.getItem('token');
  }

  public setToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  public serviceName(serviceName) {
    return new HttpHeaders({ 'service-name': serviceName });
}

}
