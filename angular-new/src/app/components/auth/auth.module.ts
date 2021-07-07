import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { AuthRoutingModule } from './auth.router';
import { LoginComponent } from './login/login.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NgxPayPalModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
