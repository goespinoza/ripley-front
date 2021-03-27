import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BankAccount } from 'src/app/interfaces/account.interface';
import { Trx } from 'src/app/interfaces/trx';
import { User } from 'src/app/interfaces/user.interface';
import { AccountService } from 'src/app/services/trx/account.service';
import { TrxService } from 'src/app/services/trx/trx.service';
import { MESSAGE, BALANCE_WHITHDRAW_MESSAGE_SUCCESS, SERVER_MESSAGE_ERROR } from '../../utils/constants';
import { Util } from 'src/app/utils/util';

@Component({
  selector: 'app-balance-withdrawal',
  templateUrl: './balance-withdrawal.component.html',
  styleUrls: ['./balance-withdrawal.component.scss']
})
export class BalanceWithdrawalComponent implements OnInit {

  frmBalanceWithdrawal: FormGroup;
  account: BankAccount[] = [];
  loading = false;
  user: User;
  limit = 0;
  request: any = {
    trx_typ: '',
    ori_acc: '',
    des_acc: '',
    amount: 0
  };

  constructor(
    private accountService: AccountService,
    private authService: AuthService,
    private trxService: TrxService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private util: Util
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.user = this.authService.getuser();
    this.getAccountOfUser(this.user.id);
  }

  createForm() {
    this.frmBalanceWithdrawal = this.fb.group({
      account: [null, [Validators.required]],
      amount: ['', [Validators.required, Validators.max(this.limit)]]
    });
  }

  getTrxByAccount(account) {
    this.trxService.getTrxByAccount(account)
      .subscribe((trx: Trx[]) => {
        this.limit = this.util.addMoneyAccount(trx, account);
        this.frmBalanceWithdrawal.controls[`amount`].setValidators([Validators.max(this.limit)]);
      }, error => { }).add(() => { });
  }

  getAccountOfUser(id: number) {
    this.accountService.getAccount(id)
      .subscribe((account: BankAccount[]) => {
        this.account = account;
        this.getTrxByAccount(this.account[0].account);
      }, error => { })
      .add(() => { });
  }

  submit() {
    this.loading = true;
    this.request.trx_typ = 'retiro';
    this.request.ori_acc = this.frmBalanceWithdrawal.get('account').value;
    this.request.amount = this.frmBalanceWithdrawal.get('amount').value;
    this.trxService.insTrx(this.request
    ).subscribe((trx: Trx) => {
      this.getTrxByAccount(this.account[0].account);
      this.toastr.success(BALANCE_WHITHDRAW_MESSAGE_SUCCESS, MESSAGE);
    }, error => {
      this.toastr.error(SERVER_MESSAGE_ERROR, MESSAGE);
    }).add(() => {
      this.loading = false;
    });
  }

}
