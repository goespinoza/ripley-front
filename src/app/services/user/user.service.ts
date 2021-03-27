import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { Util } from 'src/app/utils/util';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private util: Util
  ) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.url}${environment.services.users.endpoint}`,
      { headers: this.util.serviceName(environment.services.users.serviceName) });
  }
}
