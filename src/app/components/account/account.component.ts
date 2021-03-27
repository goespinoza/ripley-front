import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BankAccount } from 'src/app/interfaces/account.interface';
import { AccountService } from 'src/app/services/trx/account.service';
import { MESSAGE, ACCOUNT_MESSAGE_SUCCESS, SERVER_MESSAGE_ERROR } from '../../utils/constants';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  frmAccount: FormGroup;
  loading = false;
  bankAccount: BankAccount;
  user: User;

  constructor(
    private accountService: AccountService,
    private authService: AuthService,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getuser();
  }

  submit() {
    this.loading = true;
    this.accountService.insAccount()
      .subscribe((bankAccount: BankAccount) => {
        this.bankAccount = bankAccount;
        this.toastr.success(ACCOUNT_MESSAGE_SUCCESS, MESSAGE);
      }, error => {
        this.toastr.error(SERVER_MESSAGE_ERROR, MESSAGE);
      }).add(() => {
        this.loading = false;
      });
  }

}
