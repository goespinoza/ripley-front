import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Util } from 'src/app/utils/util';
import { User } from 'src/app/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private http: HttpClient,
    private util: Util
  ) { }

  register(name: string, rut: string, email: string, password: string): Observable<User> {
    const request = { name, rut, email, password};
    return this.http.post<User>(`${environment.url}${environment.services.register.endpoint}`, request,
    { headers: this.util.serviceName(environment.services.register.serviceName) });
  }
}
