import { Component, OnInit } from '@angular/core';
import { EvaluationService } from 'src/app/shared/services/evaluation.service';
import { ClassService } from 'src/app/shared/services/class.service';
import { ClassSchool } from 'src/app/shared/models/classSchool';
import { Evaluation } from 'src/app/shared/models/evaluation';
import { StudentsService } from 'src/app/shared/services/students.service';
import { Student } from 'src/app/shared/models/student';
import { EvaluationStudentMarkService } from 'src/app/shared/services/evaluationStudentMark.service';
import { ActivatedRoute } from '@angular/router';
import { EvaluationStudentMark, EvaluationsStudent } from 'src/app/shared/models/evaluationStudentMark';
import { EvaluationLevelService } from 'src/app/shared/services/evaluation-level.service';
import { EvaluationLevel } from 'src/app/shared/models/evaluationLevel';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-evaluation-student',
  templateUrl: './evaluation-student.component.html',
  styleUrls: ['./evaluation-student.component.scss']
})
export class EvaluationStudentComponent implements OnInit {

  show: number = 0;
  classes: ClassSchool[] = [];
  selectClass: string;
  evaluations: Evaluation[] = [];
  students: Student[] = [];
  type: number;
  studentsMarks: EvaluationStudentMark[] = [];
  header: string = "";
  evalLevels: EvaluationLevel[] = [];

  constructor(public evalService: EvaluationService,
    public classService: ClassService,
    public studentService: StudentsService,
    public evaluationStudentMarkService: EvaluationStudentMarkService,
    private messageService: MessageService,
    public evalLevelService: EvaluationLevelService,
    public route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.type = +params.type;
      this.initData();
      if (this.type == 1)
        this.header = "מחצית א";
      else this.header = "מחצית ב";
    });

    this.classService.findByTeacher().subscribe(res => {
      this.classes = res;
      this.classes.forEach(c => {
        c.className = this.classService.getClassName(c);
      })
      if (this.classes && this.classes.length > 0)
        this.show = 1;
      else this.show = 2;
    });
    this.evalService.getAll().subscribe(res => {
      this.evaluations = res;
    });

    this.evalLevelService.getAll().subscribe(res => {
      this.evalLevels = res;
    })
  }

  initData() {
    this.selectClass = undefined;
    this.studentsMarks = [];
  }

  chooseClass() {
    this.studentsMarks = [];
    this.studentService.getByClass(this.selectClass).subscribe(res => {
      this.students = res;
      this.students.forEach(stu => {
        this.evaluationStudentMarkService.findByTypeAndStudent(this.type, stu._id).subscribe(res => {
          if (res) {
            if (!res.evaluations)
              res.evaluations = [];
            this.evaluations.forEach(e => {
              if (res.evaluations.findIndex(p => p.evaluation == e._id) < 0) {
                var el = new EvaluationsStudent();
                el.evaluationName = e.name;
                el.numComment = 0;
                el.evaluation = e._id;
                res.evaluations.push(el);
              }
            });
            this.studentsMarks.push(res);
          }
          else {
            var mm = new EvaluationStudentMark();
            mm.year = new Date().getFullYear();
            mm.studentName = stu.firstName + " " + stu.lastName;
            mm.type = this.type;
            mm.student = stu._id;
            mm.evaluations = [];
            this.evaluations.forEach(e => {
              var el = new EvaluationsStudent();
              el.evaluationName = e.name;
              el.numComment = 0;
              el.evaluation = e._id;
              el.levelName = "";
              mm.evaluations.push(el);
            })
            this.studentsMarks.push(mm);
          }
        })
      })
    });
  }

  updateMark(index: number, p: EvaluationsStudent, product: EvaluationStudentMark) {
    var l = this.evalLevels.find(l => l.evaluation == l.evaluation && p.numComment >= l.numCommentStart && p.numComment <= l.numCommentEnd);
    if (l) {
      p.evaluationLevel = l._id;
      p.levelName = l.remark;
    }
  }

  saveMark() {
    this.studentsMarks.forEach(st => {
      if (st._id) {
        this.evaluationStudentMarkService.update(st).subscribe(res => {

        })
      }
      else {
        this.evaluationStudentMarkService.save(st).subscribe(res => {

        })
      }
      this.messageService.add({ severity: 'success', summary: 'הצלחה', detail: 'עודכן בהצלחה', life: 3000 });
    })

  }

 
}
