import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trx } from 'src/app/interfaces/trx';
import { Util } from 'src/app/utils/util';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrxService {

  constructor(
    private http: HttpClient,
    private util: Util
  ) { }

  insTrx(request): Observable<Trx> {
    return this.http.post<Trx>(`${environment.url}${environment.services.trx.endpoint}`, request,
      { headers: this.util.serviceName(environment.services.trx.serviceName) });
  }

  getTrxByAccount(account: string): Observable<Trx[]> {
    return this.http.get<Trx[]>(`${environment.url}${environment.services.trx.endpoint}/${account}`,
      { headers: this.util.serviceName(environment.services.trx.serviceName) });
  }
}
