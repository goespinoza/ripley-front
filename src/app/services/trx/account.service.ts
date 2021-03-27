import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Util } from 'src/app/utils/util';
import { BankAccount } from 'src/app/interfaces/account.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient,
    private util: Util
  ) { }

  insAccount(): Observable<BankAccount> {
    const request = {};
    return this.http.post<BankAccount>(`${environment.url}${environment.services.account.endpoint}`, request,
      { headers: this.util.serviceName(environment.services.account.serviceName) });
  }

  getAccount(id: number): Observable<BankAccount[]> {
    return this.http.get<BankAccount[]>(`${environment.url}${environment.services.account.endpoint}/${id}`,
      { headers: this.util.serviceName(environment.services.account.serviceName) });
  }
}
