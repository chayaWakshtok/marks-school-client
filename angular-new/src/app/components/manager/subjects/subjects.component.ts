import { Component, OnInit } from '@angular/core';
import { Subject } from 'src/app/shared/models/subject';
import { SubjectService } from 'src/app/shared/services/subject.service';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import { TrendService } from 'src/app/shared/services/trend.service';
import { Trend } from 'src/app/shared/models/trend';
import { NgxSpinnerService } from 'ngx-spinner';
import { Project } from 'src/app/shared/models/project';
import { ProjectService } from 'src/app/shared/services/project.service';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  subjects: Subject[] = [];
  subject: Subject = new Subject();
  submitted: boolean = false;
  subjectDialog: boolean = false;
  projectDialog: boolean = false;
  trends: Trend[];
  types: { key: number, value: string }[] = [{ key: 1, value: 'חול' }, { key: 2, value: 'קודש' }];
  projectsSubject: Project[] = [];
  projectEnd: Project[] = [];
  projectEnter: Project[] = [];
  projectOutside: Project[] = [];

  constructor(public subService: SubjectService,
    public trendService: TrendService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private SpinnerService: NgxSpinnerService,
    public projectService: ProjectService) { }

  ngOnInit(): void {
    this.subService.getAll().subscribe(res => {
      this.subjects = res;
    });
    this.trendService.getAll().subscribe(res => {
      this.trends = res;
    })
  }

  openNew() {
    this.subject = new Subject();
    this.submitted = false;
    this.subjectDialog = true;
  }

  editTrend(sub: Subject) {
    this.subject = { ...sub };
    this.subjectDialog = true;
  }

  openProjects(sub: Subject) {

    this.subject = { ...sub };
    forkJoin({
      requestOne: this.projectService.findAllBySubjectAndType(1, sub._id),
      requestTwo: this.projectService.findAllBySubjectAndType(2, sub._id),
      requestThree: this.projectService.findAllBySubjectAndType(3, sub._id)
    })
      .subscribe(({ requestOne, requestTwo, requestThree }) => {
        this.projectEnter = requestOne;
        this.projectOutside = requestTwo;
        this.projectEnd = requestThree;
        if (this.projectEnter.length < this.subject.numOfProjectsEnter) {
          for (let index = this.projectEnter.length; index < this.subject.numOfProjectsEnter; index++) {
            this.projectEnter.push(new Project());
          }
        }
        if (this.projectOutside.length < this.subject.numOfProjectsOutside) {
          for (let index = this.projectOutside.length; index < this.subject.numOfProjectsOutside; index++) {
            this.projectOutside.push(new Project());
          }
        }
        if (this.projectEnd.length < this.subject.numOfProjectsEnd) {
          for (let index = this.projectEnd.length; index < this.subject.numOfProjectsEnd; index++) {
            this.projectEnd.push(new Project());
          }
        }
        this.projectDialog = true;
      });

  }

  deleteTrend(sub: Subject) {
    this.confirmationService.confirm({
      message: 'האם אתה בטוח במחיקת  ' + sub.subjectName + '?',
      header: 'אישור',
      acceptLabel: 'אישור',
      acceptButtonStyleClass: 'p-button-text',
      rejectButtonStyleClass: 'p-button-text',
      rejectLabel: 'ביטול',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.SpinnerService.show();
        this.subService.delete(sub._id).subscribe(res => {
          this.subjects = this.subjects.filter(val => val._id !== sub._id);
          this.subject = new Subject();
          this.SpinnerService.hide();
          this.messageService.add({ severity: 'success', summary: 'הצלחה', detail: 'המגמה נמחקה', life: 3000 });
        })
      }
    });
  }


  saveProject() {
    this.projectEnter.forEach(p => {
      if (p._id) {
        this.projectService.update(p).subscribe();
      }
      else {
        p.type = 1;
        p.yearNumber = 2021;
        p.subject = this.subject._id;
        this.projectService.save(p).subscribe();
      }
    })
    this.projectOutside.forEach(p => {
      if (p._id) {
        this.projectService.update(p).subscribe();
      }
      else {
        p.type = 2;
        p.yearNumber = 2021;
        p.subject = this.subject._id;
        this.projectService.save(p).subscribe();
      }
    })
    this.projectEnd.forEach(p => {
      if (p._id) {
        this.projectService.update(p).subscribe();
      }
      else {
        p.type = 3;
        p.yearNumber = 2021;
        p.subject = this.subject._id;
        this.projectService.save(p).subscribe();
      }
    })
    this.hideDialog();
  }


  saveSub() {
    this.submitted = true;

    if (this.subject.subjectName.trim()) {
      if (this.subject._id) {
        if (this.subject.trend)
          this.subject.trendRef = this.subject.trend._id;
        this.SpinnerService.show();
        this.subService.update(this.subject).subscribe(res => {
          this.subjects[this.findIndexById(this.subject._id)] = this.subject;
          this.closeSucc();
          this.SpinnerService.hide();
          //this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
        })
      }
      else {
        this.subject.trendRef = this.subject.trend._id;
        this.SpinnerService.show();
        this.subService.save(this.subject).subscribe(res => {
          this.subService.getAll().subscribe(res => {
            this.subjects = res;
            this.SpinnerService.hide();
          });
          this.closeSucc();
          //this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
        })
      }
    }
  }

  closeSucc() {
    this.subjects = [...this.subjects];
    this.subjectDialog = false;
    this.subject = new Subject();
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.subjects.length; i++) {
      if (this.subjects[i]._id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  hideDialog() {
    this.subjectDialog = false;
    this.submitted = false;
    this.projectDialog = false;
  }

}
