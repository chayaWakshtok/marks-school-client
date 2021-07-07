import { Component, OnInit } from '@angular/core';
import { Subject } from 'src/app/shared/models/subject';
import { TypeCert } from 'src/app/shared/models/typeCert';
import { SubjectService } from 'src/app/shared/services/subject.service';
import { TypeCertService } from 'src/app/shared/services/typeCert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ClassSchool } from 'src/app/shared/models/classSchool';
import { TeacherClassSubject } from 'src/app/shared/models/teacherClassSubject';
import { Category } from 'src/app/shared/models/category';
import { Student } from 'src/app/shared/models/student';
import { Comment } from 'src/app/shared/models/comment';
import { TeacherClassSubjectService } from 'src/app/shared/services/teacherClassSubject.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { StudentsService } from 'src/app/shared/services/students.service';
import { StudentMarkCategory, Marks, StudentMarkComments } from 'src/app/shared/models/studentMarkCategory';
import { StudentMarkCategoryService } from 'src/app/shared/services/studentMarkCategory.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CommentService } from 'src/app/shared/services/comment.service';
import { MarkRangeService } from 'src/app/shared/services/markRange.service';
import { MarkRange } from 'src/app/shared/models/markRange';
import { ClassService } from 'src/app/shared/services/class.service';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss']
})
export class TypesComponent implements OnInit {

  subjects: Subject[] = [];
  selectSubject: string;
  selectClass: string;
  teacherClasses: ClassSchool[] = [];
  teacherClassSubject: TeacherClassSubject[] = [];
  categories: Category[] = [];
  students: Student[] = [];
  marks: StudentMarkCategory[] = [];
  type: number = 1;
  header: string = "";
  comments: Comment[] = [];
  commentDialog: boolean = false;
  studentComments: StudentMarkCategory = new StudentMarkCategory();
  studentCommentsCopy: StudentMarkComments[] = [];
  categoryCopy: Category[] = [];
  categoryDialog: boolean = false;
  errorMessage: string = "";
  marksRange: MarkRange[] = []

  constructor(public subjectService: SubjectService,
    public typeCertService: TypeCertService,
    public router: Router,
    private route: ActivatedRoute,
    public teacherClassSubjectService: TeacherClassSubjectService,
    public categoryService: CategoryService,
    public studentService: StudentsService,
    public studentMarkCategoryService: StudentMarkCategoryService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private commentService: CommentService,
    public markRangeService: MarkRangeService,
    public classService: ClassService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.initData();
      this.type = +params.type;
      if (this.type == 1)
        this.header = "מחצית א ";
      else if (this.type == 2)
        this.header = "מחצית ב";
      else if (this.type == 3)
        this.header = "שנתי ";
      else if (this.type == 4)
        this.header = "פנימית ";
      else this.header = "בגרות";

    });

    this.teacherClassSubjectService.getByTeacher().subscribe(res => {
      this.subjects = [];
      this.teacherClassSubject = res;
      res.forEach(el => {
        if (this.subjects.findIndex(p => p._id == el.subject._id) < 0)
          this.subjects.push(el.subject);
      });
    })
    this.commentService.getAll().subscribe(res => {
      this.comments = res;
    })

    this.markRangeService.getAll().subscribe(res => {
      this.marksRange = res;
    })
  }

  initData() {
    this.subjects = [];
    this.selectSubject = "";
    this.selectClass = "";
    this.teacherClasses = [];
    this.teacherClassSubject = [];
    this.categories = [];
    this.students = [];
    this.marks = [];
    this.type = 1;
    this.header = "";
    this.teacherClassSubjectService.getByTeacher().subscribe(res => {
      this.subjects = [];
      this.teacherClassSubject = res;
      res.forEach(el => {
        if (this.subjects.findIndex(p => p._id == el.subject._id) < 0)
          this.subjects.push(el.subject);
      });
    })

    this.commentService.getAll().subscribe(res => {
      this.comments = res;
    })
  }

  chooseSubject() {
    this.teacherClasses = [];
    this.teacherClassSubject.forEach(el => {
      if (el.subject._id == this.selectSubject) {
        if (this.teacherClasses.findIndex(p => p._id == el.class._id) < 0) {
          el.class.className = this.classService.getClassName(el.class);
          this.teacherClasses.push(el.class);
        }

      }
    })
  }

  chooseClass() {
    this.marks = [];
    this.categoryService.findAllBySubjectAndType(this.type, this.selectSubject).subscribe(res => {
      this.categories = res;
      this.studentService.getByClass(this.selectClass).subscribe(res => {
        this.students = res;
        this.students.forEach(stu => {
          this.studentMarkCategoryService.findByStudent(stu._id, this.selectSubject, this.type).subscribe(mar => {
            if (mar) {
              mar.commentsString = "";
              mar.comments.forEach(co => {
                mar.commentsString += co.name + ",";
              })
              this.marks.push(mar);
            }
            else {
              var marr = new StudentMarkCategory();
              marr.finishMark = 0;
              marr.studentName = stu.firstName + " " + stu.lastName;
              marr.student = stu._id;
              marr.subject = this.selectSubject;
              marr.type = this.type;
              marr.year = new Date().getFullYear();
              marr.comments = [];
              marr.commentsString = "";
              this.categories.forEach(c => {
                var mm = new Marks();
                mm.category = c._id;
                mm.categoryName = c.name;
                mm.mark = 0;
                mm.endMark = 0;
                mm.precent = c.precent;
                mm.categoryRef = c;
                marr.marks.push(mm);
              })
              this.marks.push(marr);
            }
          })
        })
      })
    })
  }

  saveMark() {
    this.marks.forEach(m => {
      if (m._id) {
        this.studentMarkCategoryService.update(m).subscribe(r => {
        })
      }
      else {
        this.studentMarkCategoryService.save(m).subscribe(r => {
        })
      }
    })
    this.messageService.add({ severity: 'success', summary: 'הצלחה', detail: 'הציונים עודכנו', life: 3000 });
  }

  updateMarkByCategory(index, mark: Marks, studentMark: StudentMarkCategory) {
    if (mark.mark > 100 || mark.mark < 0)
      mark.mark = 0;
    mark.endMark = mark.precent * mark.mark / 100;
    studentMark.finishMark = 0;
    studentMark.marks.forEach(m => {
      studentMark.finishMark += m.endMark;
    })
    var mar = this.marksRange.find(p => p.maxMark >= studentMark.finishMark && p.minMark <= studentMark.finishMark);
    if (mar)
      studentMark.certMark = mar.endMark;
  }

  addComment(stu: StudentMarkCategory) {
    this.commentDialog = true;
    this.studentComments = stu;
    this.studentCommentsCopy = [...stu.comments];
    this.studentCommentsCopy.push(new StudentMarkComments());
  }

  hideDialog() {
    this.commentDialog = false;
    this.studentComments = new StudentMarkCategory();
    this.studentCommentsCopy = [];

  }

  saveAllComments() {
    this.studentComments.commentsString = "";
    this.studentCommentsCopy.forEach(r => {
      r.name = this.comments.find(p => p._id == r.comment)?.name;
      this.studentComments.commentsString += r.name + ", ";
    })

    this.studentComments.comments = this.studentCommentsCopy;
    this.hideDialog()
  }

  newCategory() {
    this.categoryDialog = true;
    this.categoryCopy = [];
    this.categories.forEach(cat => {
      this.categoryCopy.push({ ...cat });
    })
    this.categoryCopy = [... this.categoryCopy];
    var c = new Category();
    c.type = this.type;
    c.subject = this.selectSubject;
    c.yearNumber = new Date().getFullYear();
    c.precent = 0;
    this.categoryCopy.push(c);
    this.errorMessage = "";
  }

  hideCategoryDialog() {
    this.categoryDialog = false;
    this.categoryCopy = [];
    this.errorMessage = "";
  }

  saveNewCategory() {
    var sum = 0;
    this.categoryCopy.forEach(p => {
      sum += p.precent;
    })
    if (sum > 100 || sum < 100) {
      this.errorMessage = "מספר האחוזים חיב להיות שווה 100 אחוז";
    }
    else {
      this.categories = this.categoryCopy;
      this.categoryService.save(this.categoryCopy[this.categoryCopy.length - 1]).subscribe(res => {
        this.categories[this.categories.length - 1]._id = res._id;
        this.marks.forEach((mark) => {
          var mm = new Marks();
          mm.category = res._id;
          mm.categoryName = res.name;
          mm.mark = 0;
          mm.endMark = 0;
          mm.precent = res.precent;
          mm.categoryRef = res;
          mark.marks.push(mm);

          mark.finishMark = 0;
          mark.marks.forEach((m, index) => {
            m.precent = this.categories.find(p => p._id == m.category).precent;
            this.updateMarkByCategory(index, m, mark);
          })
        })
        this.categories.forEach(ca => {
          this.categoryService.update(ca).subscribe(catRes => {

          })
        })
      });

      this.hideCategoryDialog();
    }

  }
}
