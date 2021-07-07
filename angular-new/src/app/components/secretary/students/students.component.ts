import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/shared/models/student';
import { Trend } from 'src/app/shared/models/trend';
import { ClassSchool } from 'src/app/shared/models/classSchool';
import { StudentsService } from 'src/app/shared/services/students.service';
import { TrendService } from 'src/app/shared/services/trend.service';
import { ClassService } from 'src/app/shared/services/class.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  students: Student[] = [];
  student: Student = new Student();
  submitted: boolean = false;
  studentDialog: boolean = false;
  trends: Trend[];
  rowGroupMetadata: any;
  classes: ClassSchool[] = [];

  constructor(public studentService: StudentsService,
    public trendService: TrendService,
    public classService: ClassService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private SpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.studentService.getAll().subscribe(res => {
      res.forEach(e => {
        e.bornDate = new Date(e.bornDate);
      })
      res.forEach(r => {
        r.classSchool.className = this.classService.getClassName(r.classSchool);
      })
      this.students = res;
      //this.updateRowGroupMetaData();
    });
    this.trendService.getAll().subscribe(res => {
      this.trends = res;
    })
    this.classService.getAll().subscribe(res => {
      res.forEach(r => {
        r.className = this.classService.getClassName(r);
      })
      this.classes = res;
    })
  }

  openNew() {
    this.student = new Student();
    this.submitted = false;
    this.studentDialog = true;
  }

  editTrend(sub: Student) {
    this.student = { ...sub };
    this.studentDialog = true;
  }

  deleteTrend(sub: Student) {
    this.confirmationService.confirm({
      message: 'האם אתה בטוח במחיקת  ' + sub.tz + '?',
      header: 'אישור',
      acceptLabel: 'אישור',
      acceptButtonStyleClass: 'p-button-text',
      rejectButtonStyleClass: 'p-button-text',
      rejectLabel: 'ביטול',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.SpinnerService.show();
        this.studentService.delete(sub._id).subscribe(res => {
          this.students = this.students.filter(val => val._id !== sub._id);
          this.student = new Student();
          this.SpinnerService.hide();
          //this.updateRowGroupMetaData();
          this.messageService.add({ severity: 'success', summary: 'הצלחה', detail: 'התלמידה נמחקה', life: 3000 });
        })
      }
    });
  }

  saveSub() {
    this.submitted = true;

    if (this.student.tz.trim()) {
      if (this.student._id) {
        this.SpinnerService.show();
        this.studentService.update(this.student).subscribe(res => {
          this.students[this.findIndexById(this.student._id)] = this.student;
          this.closeSucc();
          //this.updateRowGroupMetaData();
          this.SpinnerService.hide();
          //this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
        })
      }
      else {
        this.SpinnerService.show();
        this.studentService.save(this.student).subscribe(res => {
          this.studentService.getAll().subscribe(res => {
            this.students = res;
            this.SpinnerService.hide();
            //this.updateRowGroupMetaData();
          });
          this.closeSucc();
          //this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
        })
      }
    }
  }

  closeSucc() {
    this.students = [...this.students];
    this.studentDialog = false;
    this.student = new Student();
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.students.length; i++) {
      if (this.students[i]._id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  hideDialog() {
    this.studentDialog = false;
    this.submitted = false;
  }


  // updateRowGroupMetaData() {
  //   this.rowGroupMetadata = {};

  //   if (this.students) {
  //     for (let i = 0; i < this.students.length; i++) {
  //       let rowData = this.students[i];
  //       let representativeName = rowData.classSchool.className;

  //       if (i == 0) {
  //         this.rowGroupMetadata[representativeName] = { index: 0, size: 1 };
  //       }
  //       else {
  //         let previousRowData = this.students[i - 1];
  //         let previousRowGroup = previousRowData.classSchool.className;
  //         if (representativeName === previousRowGroup)
  //           this.rowGroupMetadata[representativeName].size++;
  //         else
  //           this.rowGroupMetadata[representativeName] = { index: i, size: 1 };
  //       }
  //     }
  //   }
  // }
}
