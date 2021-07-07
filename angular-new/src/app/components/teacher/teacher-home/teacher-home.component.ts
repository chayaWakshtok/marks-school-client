import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { navItems } from './_nav';
import { TypeCertService } from 'src/app/shared/services/typeCert.service';
import { INavData } from '@coreui/angular';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-teacher-home',
  templateUrl: './teacher-home.component.html',
  styleUrls: ['./teacher-home.component.scss']
})
export class TeacherHomeComponent implements OnInit {

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

  constructor(public typeCertService: TypeCertService, private cdr: ChangeDetectorRef, public router: Router) {
  }

  ngOnInit(): void {
    // this.typeCertService.getAll().subscribe(res => {
    //   res.forEach(el => {
    //     navItems[1].children.push({ url: "/teacher/type", name: el.type })
    //   })
    //   var items=[...this.navItems];
    //   this.navItems=[];
    //   this.navItems=items;
    //   this.cdr.detectChanges();
    // })
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  selectTab(event) {
    console.log(event);
  }

}
