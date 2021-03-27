import { HttpHeaders } from '@angular/common/http';
import { Trx } from '../interfaces/trx';

export class Util {

  limit = 0;

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

  public addMoneyAccount(trx: Trx[], account: string) {
    this.limit = 0;
    trx.forEach(element => {
      if (element.trx_typ === 'abono') {
        this.limit += element.amount;
      }
      if (element.trx_typ === 'retiro') {
        this.limit -= element.amount;
      }
      if (element.trx_typ === 'transferencia' && element.ori_acc === account) {
        this.limit -= element.amount;
      }
      if (element.trx_typ === 'transferencia' && element.des_acc === account) {
        this.limit += element.amount;
      }
    });
    return this.limit;
  }

}
