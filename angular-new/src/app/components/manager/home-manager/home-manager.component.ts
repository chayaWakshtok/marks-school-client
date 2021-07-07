import { Component, OnInit } from '@angular/core';
import { navItems } from './_nav';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-home-manager',
  templateUrl: './home-manager.component.html',
  styleUrls: ['./home-manager.component.scss']
})
export class HomeManagerComponent implements OnInit {

  public sidebarMinimized = false;
  public navItems = navItems;
  user: User;

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logOut() {
    localStorage.removeItem('user');
    setTimeout(() => {
      this.router.navigate([""]);
    }, 1);

  }

  constructor(public router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));
  }



}
