import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    tz: new FormControl('', [Validators.required, Validators.minLength(9)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  constructor(public router: Router,
    private route: ActivatedRoute,
    public authService: AuthService) {

    if (this.authService.userValue) {
      this.router.navigate(['']);
    }
  }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.form.controls["tz"].value, this.form.controls["password"].value)
      .subscribe({
        next: (res: User) => {
          let returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/manager';
          if (res.role == "SECRETARY")
            returnUrl = "secretary";
            if (res.role == "TEACHER")
            returnUrl = "teacher";
          // get return url from query parameters or default to home page
          this.router.navigateByUrl(returnUrl);
        },
        error: error => {
          console.log(error);
          //erorr login
        }
      });
  }

  register() {
    this.router.navigate(["register"]);
  }

}
