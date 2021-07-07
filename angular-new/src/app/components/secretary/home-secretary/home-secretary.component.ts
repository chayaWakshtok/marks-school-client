import { Component, OnInit } from '@angular/core';
import { navItems } from './_nav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-secretary',
  templateUrl: './home-secretary.component.html',
  styleUrls: ['./home-secretary.component.scss']
})
export class HomeSecretaryComponent implements OnInit {

  public sidebarMinimized = false;
  public navItems = navItems;
  user: any;

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
