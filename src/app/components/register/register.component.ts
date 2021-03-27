import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user.interface';
import { RegisterService } from 'src/app/services/auth/register.service';
import { MESSAGE, REGISTER_MESSAGE_SUCCESS } from '../../utils/constants';
import { RutValidator } from 'ng9-rut';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  frmRegister: FormGroup;
  loading = false;
  user: User;

  constructor(
    private registerService: RegisterService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private rutValidator: RutValidator,
  ) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.frmRegister = this.fb.group({
      name: ['', [Validators.required]],
      rut: ['', [Validators.required, this.rutValidator]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  submit() {
    this.loading = true;
    this.registerService.register(
      this.frmRegister.get('name').value,
      this.frmRegister.get('rut').value,
      this.frmRegister.get('email').value,
      this.frmRegister.get('password').value
    ).subscribe((user: User) => {
      this.user = user;
      this.router.navigateByUrl('/login');
      this.toastr.success(REGISTER_MESSAGE_SUCCESS, MESSAGE);
    }, error => {
      this.toastr.error(error.error.message, MESSAGE);
    }).add(() => {
      this.loading = false;
    });
  }

}
