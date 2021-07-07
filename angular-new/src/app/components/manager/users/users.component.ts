import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { TeacherClassSubject } from 'src/app/shared/models/teacherClassSubject';
import { ClassService } from 'src/app/shared/services/class.service';
import { SubjectService } from 'src/app/shared/services/subject.service';
import { ClassSchool } from 'src/app/shared/models/classSchool';
import { Subject } from 'src/app/shared/models/subject';
import { TeacherClassSubjectService } from 'src/app/shared/services/teacherClassSubject.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  user: User = new User();
  submitted: boolean = false;
  userDialog: boolean = false;
  teacherDialog: boolean = false;
  teacherClassSubject: TeacherClassSubject = new TeacherClassSubject();
  classes: ClassSchool[] = [];
  subjects: Subject[] = [];
  roles =
    [
      { name: "manager", value: "מנהל" },
      { name: "teacher", value: "מורה" },
      { name: "secretary", value: "מזכירה" },
    ];

  constructor(public userService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private classService: ClassService,
    private subjectService: SubjectService,
    private teacherClassSubjectService: TeacherClassSubjectService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAllRole().subscribe(resR => {
      this.userService.getAll().subscribe(res => {
        res.forEach(e => {
          e.role = this.roles.find(p => p.name == resR.find(p => p._id == e.role).name).value;
        })
        this.users = res;
      })
    });

  }

  openTeacherDialog(user: User) {
    this.teacherClassSubject = new TeacherClassSubject();
    this.submitted = false;
    this.user = { ...user };
    this.teacherClassSubject.teacher = this.user._id;
    if (!this.classes || this.classes.length == 0)
      this.classService.getAll().subscribe(res => {
        res.forEach(r => {
          r.className = this.classService.getClassName(r);
        })
        this.classes = res;
      })
    if (!this.subjects || this.subjects.length == 0)
      this.subjectService.getAll().subscribe(res => {
        this.subjects = res;
      })

    this.teacherDialog = true;
  }

  openNew() {
    this.user = new User();
    this.submitted = false;
    this.userDialog = true;
  }

  editUser(user: User) {
    this.user = { ...user };
    this.user.role = this.roles.find(p => p.value == this.user.role).name
    this.userDialog = true;
  }

  deleteUser(user: User) {
    this.confirmationService.confirm({
      message: 'האם אתה בטוח במחיקת  ' + user.name + '?',
      header: 'אישור',
      acceptLabel: 'אישור',
      acceptButtonStyleClass: 'p-button-text',
      rejectButtonStyleClass: 'p-button-text',
      rejectLabel: 'ביטול',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.delete(user._id).subscribe(res => {
          this.users = this.users.filter(val => val._id !== user._id);
          this.user = new User();
          this.messageService.add({ severity: 'success', summary: 'הצלחה', detail: 'המשתמש נמחק', life: 3000 });
        })
      }
    });
  }

  saveTrend() {
    this.submitted = true;

    if (this.user.name.trim()) {
      if (this.user._id) {
        this.userService.update(this.user).subscribe(res => {
          this.users[this.findIndexById(this.user._id)] = this.user;
          this.closeSucc();
          //this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
        })
      }
      else {
        this.userService.save(this.user).subscribe(res => {
          this.userService.getAll().subscribe(res => {
            this.users = res;
          })
          this.closeSucc();
          //this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
        })
      }
    }
  }

  saveTeacher() {
    this.teacherClassSubjectService.save(this.teacherClassSubject).subscribe(res => {
      this.userService.getAll().subscribe(res => {
        this.users = res;
      })
      this.closeSucc();
      //this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
    })
  }

  closeSucc() {
    this.users = [...this.users];
    this.userDialog = false;
    this.teacherDialog = false;
    this.teacherClassSubject = new TeacherClassSubject();
    this.user = new User();
    this.getUsers();
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i]._id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  hideDialog() {
    this.userDialog = false;
    this.teacherDialog = false;
    this.submitted = false;
  }

}
