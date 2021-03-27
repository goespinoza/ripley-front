import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { LogService } from 'src/app/services/auth/log.service';
import { ToastrService } from 'ngx-toastr';
import { MESSAGE, LOGIN_MESSAGE_SUCCESS } from '../../utils/constants';
import { RutValidator } from 'ng9-rut';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  frmLogin: FormGroup;
  loading = false;
  user: User;

  constructor(
    private logService: LogService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private rutValidator: RutValidator
  ) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.frmLogin = this.fb.group({
      rut: ['', [Validators.required, this.rutValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  submit() {
    this.loading = true;
    this.logService.login(
      this.frmLogin.get('rut').value,
      this.frmLogin.get('password').value
    ).subscribe((user: User) => {
      this.user = user;
      this.router.navigateByUrl('/dashboard');
      this.toastr.success(LOGIN_MESSAGE_SUCCESS, MESSAGE);
    }, error => {
      this.toastr.error(error.error.message, MESSAGE);
    }).add(() => {
      this.loading = false;
    });
  }

}
