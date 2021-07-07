import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassSchool } from 'src/app/shared/models/classSchool';
import { ClassService } from 'src/app/shared/services/class.service';
import { SubjectService } from 'src/app/shared/services/subject.service';
import { Subject } from 'src/app/shared/models/subject';
import { StudentsService } from 'src/app/shared/services/students.service';
import { Student } from 'src/app/shared/models/student';
import { StudentMarkCategoryService } from 'src/app/shared/services/studentMarkCategory.service';
import { StudentMarkCategory } from 'src/app/shared/models/studentMarkCategory';

import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-cert',
  templateUrl: './cert.component.html',
  styleUrls: ['./cert.component.scss']
})
export class CertComponent implements OnInit {

  students: Student[] = [];
  show: number = 0;
  classes: ClassSchool[] = [];
  selectClass: string;
  type: number;
  header: string = "";
  subjects: Subject[] = [];
  certsHalf: CertHalf[] = [];
  updatesMarks: StudentMarkCategory[] = [];
  display: boolean = false;
  chooseCertStudent: CertHalf = new CertHalf();


  constructor(public route: ActivatedRoute,
    public classService: ClassService,
    public subjectService: SubjectService,
    public studentService: StudentsService,
    public studentMarkCategoryService: StudentMarkCategoryService) { }

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

    this.subjectService.getAll().subscribe(res => {
      this.subjects = res;
    })
  }

  initData() {
    this.selectClass = undefined;
  }

  chooseClass() {
    this.certsHalf = [];
    this.studentService.getByClass(this.selectClass).subscribe(res => {
      this.students = res;
      this.students.forEach(stu => {
        this.studentMarkCategoryService.findByStudentAllMarks(stu._id, this.type).subscribe(allMark => {
          this.subjects.forEach(sub => {
            var certStudent = this.certsHalf.find(p => p.studentName == stu.firstName + " " + stu.lastName);
            if (!certStudent) {
              certStudent = new CertHalf();
              certStudent.studentName = stu.firstName + " " + stu.lastName;
              certStudent.marks = [];
              var m = allMark.find(p => p.subject == sub._id);
              if (m)
                certStudent.marks.push(m);
              else {
                var ss = new StudentMarkCategory();
                ss.student = stu._id;
                ss.subject = sub._id;
                ss.type = this.type;
                ss.marks = [];
                ss.finishMark = 0;
                ss.studentName = stu.firstName + " " + stu.lastName;
                certStudent.marks.push(ss);
              }
              this.certsHalf.push(certStudent);
            }
            else {
              var m = allMark.find(p => p.subject == sub._id);
              if (m)
                certStudent.marks.push(m);
              else {
                var ss = new StudentMarkCategory();
                ss.student = stu._id;
                ss.subject = sub._id;
                ss.type = this.type;
                ss.marks = [];
                ss.studentName = stu.firstName + " " + stu.lastName;
                ss.finishMark = 0;
                certStudent.marks.push(ss);
              }
            }
          })
        })
      })
    })
  }

  updateMark(studentCategoryMark: StudentMarkCategory) {

    var m = this.updatesMarks.find(p => p.subject = studentCategoryMark.subject && p.student == studentCategoryMark.student);
    if (m)
      m.certMark = studentCategoryMark.certMark;
    else
      this.updatesMarks.push(studentCategoryMark);
  }

  saveChanges() {
    this.updatesMarks.forEach((f, index) => {
      if (f._id)
        this.studentMarkCategoryService.update(f).subscribe();
      else this.studentMarkCategoryService.save(f).subscribe(l => {
        this.updatesMarks[index] = l;
      });
    })
  }

  showDialog(cert: CertHalf) {
    this.display = true;
    this.chooseCertStudent = cert;
    this.chooseCertStudent.marks.forEach(co => {
      co.subject = this.subjects.find(p => p._id == co.subject);
      co.commentsString = "";
      co.comments.forEach(c => {
        if (c && c.name)
          co.commentsString += c.name + ",";
      })

    })
  }

  closeDialog() {
    this.display = false;
  }

  createPDF() {

    var className = this.classes.find(p => p._id == this.selectClass)?.className;

    // doc.setFontSize(18);
    // if (this.type == 1)
    //   doc.text('מחצית ראשונה – תשפ"א', 50, 20);
    // else
    //   doc.text('מחצית שניה – תשפ"א', 50, 20);

    // doc.setFontSize(14);

    // doc.text("שם: " + this.chooseCertStudent.studentName + "כיתה: " + className, 70, 20)

    // doc.setFontSize(14);
    // doc.setTextColor(100);


    var data1 = document.getElementById('contentToConvert');
    html2canvas(data1).then(canvas => {
      // Few necessary setting options  
      var imgWidth = 220;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      // pdf.setFontSize(18);

      // if (this.type == 1)
      //   pdf.text('מחצית ראשונה – תשפ"א', 50, 20);
      // else
      //   pdf.text('מחצית שניה – תשפ"א', 50, 20);
      // pdf.setFontSize(14);

      // pdf.text("שם: " + this.chooseCertStudent.studentName + "כיתה: " + className, 70, 20)
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.output('dataurlnewwindow')

      // Download PDF document  
      //pdf.save('table.pdf');
    });

  }

}

export class CertHalf {
  studentName: string;
  marks: StudentMarkCategory[] = []
}
