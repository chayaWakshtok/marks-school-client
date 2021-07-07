import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { School } from 'src/app/shared/models/school';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // paymentCode: string;

  form = new FormGroup({
    nameSchool: new FormControl('', [Validators.required, Validators.minLength(2)]),
    code: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required, Validators.minLength(2)]),
    city: new FormControl('', [Validators.required, Validators.minLength(2)]),
    nameManager: new FormControl('', [Validators.required, Validators.minLength(2)]),
    tz: new FormControl('', [Validators.required, Validators.minLength(9)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
    phone: new FormControl('', [Validators.required, Validators.minLength(7)]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  public payPalConfig?: IPayPalConfig;
  showCancel: boolean;
  showSuccess: boolean;
  showError: boolean;
  paymentCode: string;

  constructor(public authService: AuthService,
    public rouetr: Router) {

  }

  ngOnInit(): void {
    this.initConfig('1000');
  }

  private initConfig(price: string): void {
    this.payPalConfig = {
      currency: 'ILS',
      clientId: 'AZ--qfIbtAW1th-Q10-YGRiz_WICkcTqKCS-XHafQ7CB21iEVOZmFZVMwHWCKQLJEE7VHNWiXD_SAzLf',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'ILS',
              value: price,
              breakdown: {
                item_total: {
                  currency_code: 'ILS',
                  value: price
                }
              }
            },
            items: [
              {
                name: 'הרשמה לשרות ציונים',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'ILS',
                  value: price,
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        //data.orderID;
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });

      },
      onClientAuthorization: (data) => {
        //data.id;
        this.paymentCode = data.id;
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        this.showCancel = true;

      },
      onError: err => {
        console.log('OnError', err);
        this.showError = true;
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
        this.resetStatus();
      },
      onInit: (data, actions) => {
        console.log('onInit', data, actions);
      }
    };
  }

  private resetStatus(): void {
    this.showError = false;
    this.showSuccess = false;
    this.showCancel = false;
  }

  get f() {
    return this.form.controls;
  }

  register() {
    var user: User = new User();
    user.email = this.form.controls["email"].value;
    user.name = this.form.controls["nameManager"].value;
    user.password = this.form.controls["password"].value;
    user.phone = this.form.controls["phone"].value;
    user.tzId = this.form.controls["tz"].value;
    user.role = "manager";
    user.school = new School();
    user.school.address = this.form.controls["address"].value;
    user.school.city = this.form.controls["city"].value;
    user.school.code = this.form.controls["code"].value;
    user.school.name = this.form.controls["nameSchool"].value;
    user.school.paymentCode = this.paymentCode;
    this.authService.register(user).subscribe(res => {
      this.rouetr.navigate(["/manager"]);
    })
  }

}
