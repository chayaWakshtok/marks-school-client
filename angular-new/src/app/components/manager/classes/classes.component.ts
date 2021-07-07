import { Component, OnInit } from '@angular/core';
import { ClassSchool } from 'src/app/shared/models/classSchool';
import { ClassService } from 'src/app/shared/services/class.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {

  classesSchool: ClassSchool[] = [];
  classSchool: ClassSchool = new ClassSchool();
  submitted: boolean = false;
  classDialog: boolean = false;
  teachersResult: User[] = [];
  teachers: User[] = [];

  constructor(public classService: ClassService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public userService: UserService,) { }

  ngOnInit(): void {
    this.classService.getAll().subscribe(res => {
      this.classesSchool = res;
    });
    this.userService.getAllRole().subscribe(resR => {
      this.userService.getAll().subscribe(res => {
        res.forEach(e => {
          e.role = resR.find(p => p._id == e.role).name;
        })
        this.teachers = res.filter(p => p.role == "teacher");
      })
    })
  }

  openNew() {
    this.classSchool = new ClassSchool();
    this.submitted = false;
    this.classDialog = true;
  }

  editTrend(c: ClassSchool) {
    c.teacher=c.teacherRef;
    this.classSchool = { ...c };
    this.classDialog = true;
  }

  deleteTrend(classSchool: ClassSchool) {
    this.confirmationService.confirm({
      message: 'האם אתה בטוח במחיקת  ' + classSchool.className + '?',
      header: 'אישור',
      acceptLabel: 'אישור',
      acceptButtonStyleClass: 'p-button-text',
      rejectButtonStyleClass: 'p-button-text',
      rejectLabel: 'ביטול',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.classService.delete(classSchool._id).subscribe(res => {
          this.classesSchool = this.classesSchool.filter(val => val._id !== classSchool._id);
          this.classSchool = new ClassSchool();
          this.messageService.add({ severity: 'success', summary: 'הצלחה', detail: 'הכיתה נמחקה', life: 3000 });
        })
      }
    });
  }

  saveTrend() {
    this.submitted = true;

    if (this.classSchool.className) {
      if (this.classSchool._id) {
        if (this.classSchool.teacher)
          this.classSchool.teacherRef = this.classSchool.teacher._id;
        this.classService.update(this.classSchool).subscribe(res => {
          this.classesSchool[this.findIndexById(this.classSchool._id)] = this.classSchool;
          this.closeSucc();
          //this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
        })
      }
      else {
        if (this.classSchool.teacher)
          this.classSchool.teacherRef = this.classSchool.teacher._id;
        this.classService.save(this.classSchool).subscribe(res => {
          this.classService.getAll().subscribe(res => {
            this.classesSchool = res;
          })
          this.closeSucc();
          //this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
        })
      }
    }
  }

  closeSucc() {
    this.classesSchool = [...this.classesSchool];
    this.classDialog = false;
    this.classSchool = new ClassSchool();
    this.classService.getAll().subscribe(res => {
      this.classesSchool = res;
    });
    this.userService.getAllRole().subscribe(resR => {
      this.userService.getAll().subscribe(res => {
        res.forEach(e => {
          e.role = resR.find(p => p._id == e.role).name;
        })
        this.teachers = res.filter(p => p.role == "teacher");
      })
    })
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.classesSchool.length; i++) {
      if (this.classesSchool[i]._id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  hideDialog() {
    this.classDialog = false;
    this.submitted = false;
  }

  searchTea(event): void {
    this.teachersResult = this.teachers.filter(c => c.name.startsWith(event.query));
  }

}
