import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/shared/services/subject.service';
import { Subject } from 'src/app/shared/models/subject';
import { ClassService } from 'src/app/shared/services/class.service';
import { ClassSchool } from 'src/app/shared/models/classSchool';
import { StudentMarkProjectCategoryService } from 'src/app/shared/services/studentMarkCategoryProj.service';
import { StudentsService } from 'src/app/shared/services/students.service';
import { Student } from 'src/app/shared/models/student';
import { ProjectService } from 'src/app/shared/services/project.service';
import { Project } from 'src/app/shared/models/project';


@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent implements OnInit {

  types: { key: number, value: string }[] = [
  ];

  type: number;
  selectSubject: string;
  subjects: Subject[] = [];
  allClasses: ClassSchool[] = [];
  selectClass: string;
  years: { key: number, value: number }[] = [];
  selectYear: number;
  students: Student[] = [];
  marks: { student: string, marks: number[], endMark: number }[] = [];
  projects: Project[] = [];

  constructor(public subjectService: SubjectService,
    public classService: ClassService,
    public projectService: ProjectService,
    public studentService: StudentsService,
    public studentMarkProjectCategoryService: StudentMarkProjectCategoryService) { }

  ngOnInit(): void {
    this.subjectService.getAll().subscribe(res => {
      this.subjects = res;
    })
    this.classService.getAll().subscribe(res => {
      this.allClasses = res;
      this.allClasses.forEach(r=>{
        r.className=this.classService.getClassName(r);
      })
    })

    this.types.push({ key: 1, value: 'בית ספרי' });
    this.types.push({ key: 2, value: 'פנימית' });
    this.types.push({ key: 3, value: 'בגרות' });
  }

  chooseClass() {
    var classS = this.allClasses.find(p => p._id == this.selectClass);
    this.years.push({ key: classS.endingYear, value: classS.endingYear });
    this.years.push({ key: classS.endingYear - 1, value: classS.endingYear - 1 });
    this.years.push({ key: classS.endingYear - 2, value: classS.endingYear - 2 });
    this.years.push({ key: classS.endingYear - 3, value: classS.endingYear - 3 });
    this.studentService.getByClass(this.selectClass).subscribe(res => {
      this.students = res;
    })
  }

  chooseSubject() {
    this.projectService.findAllBySubjectAndType(this.type, this.selectSubject).subscribe(res => {
      this.projects = res;
    })
  }

  chooseYear() {
    this.studentMarkProjectCategoryService.findByTypeSubjectClass(this.selectClass, this.type,
      this.selectSubject, this.selectYear).subscribe(res => {
        this.students.forEach(s => {
          var mm = { student: s.firstName + " " + s.lastName, marks: [], endMark: 0 };
          this.projects.forEach(pr => {
            var pm = res.find(p => p.student == s._id && p.project == pr._id)
            if (pm) {
              mm.marks.push(pm.certMark);
              mm.endMark += pm.certMark;
            }            
            else mm.marks.push(0);
          })
          mm.endMark = Number(mm.endMark.toFixed(2));
          this.marks.push(mm);
        })
        console.log(this.marks);
      })

  }

}
