import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { Util } from 'src/app/utils/util';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(
    private http: HttpClient,
    private util: Util
  ) { }

  login(rut: string, password: string): Observable<User> {
    const request = { rut, password };
    return this.http.post<User>(`${environment.url}${environment.services.login.endpoint}`, request,
      { headers: this.util.serviceName(environment.services.login.serviceName) });
  }

  logout() {
    sessionStorage.removeItem('token');
  }
}
