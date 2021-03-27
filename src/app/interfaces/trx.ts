export interface Trx {
  user: number;
  trx_typ: string;
  ori_acc: string;
  des_acc: string;
  amount: number;
  trx_date: Date;
}
