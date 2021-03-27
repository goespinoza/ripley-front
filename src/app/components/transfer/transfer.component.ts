import { AuthService } from './../../services/auth/auth.service';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BankAccount } from 'src/app/interfaces/account.interface';
import { Trx } from 'src/app/interfaces/trx';
import { User } from 'src/app/interfaces/user.interface';
import { AccountService } from 'src/app/services/trx/account.service';
import { TrxService } from 'src/app/services/trx/trx.service';
import { MESSAGE, BALANCE_TRANSFER_MESSAGE_SUCCESS, SERVER_MESSAGE_ERROR } from '../../utils/constants';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {

  frmTransferMoney: FormGroup;
  account: BankAccount[] = [];
  destinationAccount: BankAccount[] = [];
  loading = false;
  user: User;
  users: User[] = [];
  trx: Trx;
  request: any = {
    trx_typ: '',
    ori_acc: '',
    des_acc: '',
    amount: 0
  };

  constructor(
    private accountService: AccountService,
    private trxService: TrxService,
    private authService: AuthService,
    private toastr: ToastrService,
    private userService: UserService,
    private fb: FormBuilder,
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.user = this.authService.getuser();
    this.getAccountByUser(this.user.id);
    this.getUsers();
  }

  createForm() {
    this.frmTransferMoney = this.fb.group({
      ori_acc: [null, [Validators.required]],
      amount: ['', [Validators.required]],
      user: [null, [Validators.required]],
      des_acc: [null, [Validators.required]],
    });
  }

  getAccountByUser(id) {
    this.accountService.getAccount(id)
      .subscribe((account: BankAccount[]) => {
        this.account = account;
      }, error => { })
      .add(() => { });
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe((users: User[]) => {
        this.users = users;
      }, error => { })
      .add(() => { });
  }

  somethingChanged() {
    this.accountService.getAccount(this.frmTransferMoney.get('user').value)
      .subscribe((account: BankAccount[]) => {
        this.destinationAccount = account;
      }, error => { })
      .add(() => { });
  }

  submit() {
    this.loading = true;
    this.request.trx_typ = 'transferencia';
    this.request.ori_acc = this.frmTransferMoney.get('ori_acc').value;
    this.request.des_acc = this.frmTransferMoney.get('des_acc').value;
    this.request.amount = this.frmTransferMoney.get('amount').value;
    this.trxService.insTrx(this.request
    ).subscribe((trx: Trx) => {
      this.trx = trx;
      this.toastr.success(BALANCE_TRANSFER_MESSAGE_SUCCESS, MESSAGE);
    }, error => {
      this.toastr.error(SERVER_MESSAGE_ERROR, MESSAGE);
    }).add(() => {
      this.loading = false;
    });
  }
}
