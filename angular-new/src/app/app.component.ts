import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { freeSet } from '@coreui/icons';
import { AuthService } from './shared/services/auth.service';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  templateUrl: './app.component.html',
  providers: [IconSetService],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    public iconSet: IconSetService,
    public authService: AuthService
  ) {
    // iconSet singleton
    iconSet.icons = { ...freeSet };
  }

  ngOnInit() {
    const user = this.authService.userValue;
    if (user) {
      if (user.role == "MANAGER")
        this.router.navigate(["manager"]);
      if (user.role == "SECRETARY")
        this.router.navigate(["secretary"]);
      if (user.role == "TEACHER")
        this.router.navigate(["teacher"]);
    }

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
