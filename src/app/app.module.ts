import { Util } from 'src/app/utils/util';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { TransferComponent } from './components/transfer/transfer.component';
import { BalanceWithdrawalComponent } from './components/balance-withdrawal/balance-withdrawal.component';
import { BalanceChargeComponent } from './components/balance-charge/balance-charge.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RestrictInputDirective } from './directives/restrictinput.directive';
import { InterceptorService } from './interceptors/interceptor.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AccountComponent } from './components/account/account.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ToastrModule } from 'ngx-toastr';
import { Ng9RutModule } from 'ng9-rut';
import { NumberDirective } from './directives/number.directive';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: 'right',
  allowNegative: true,
  decimal: '.',
  precision: 2,
  prefix: 'CLP ',
  suffix: '',
  thousands: ','
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    TransferComponent,
    BalanceWithdrawalComponent,
    BalanceChargeComponent,
    RestrictInputDirective,
    NavbarComponent,
    AccountComponent,
    LoginComponent,
    DashboardComponent,
    PageNotFoundComponent,
    NumberDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      closeButton: true,
      progressBar: true
    }),
    Ng9RutModule,
    CurrencyMaskModule
  ],
  providers: [
    Util,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
