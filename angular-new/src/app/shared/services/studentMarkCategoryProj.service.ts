import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trend } from '../models/trend';
import { ClassSchool } from '../models/classSchool';
import { Category } from '../models/category';
import { StudentMarkCategory } from '../models/studentMarkCategory';
import { StudentMarkCategoryProject } from '../models/studentMarkCategoryProj';

@Injectable({
  providedIn: 'root'
})
export class StudentMarkProjectCategoryService {

  url: string = environment.baseUrl + "StudentMarkProjectCategory/";

  constructor(public http: HttpClient) { }

  getAll(): Observable<StudentMarkCategoryProject[]> {
    return this.http.get<StudentMarkCategoryProject[]>(this.url + "all");
  }

  findByStudent(student, subject, type): Observable<StudentMarkCategoryProject> {
    return this.http.get<StudentMarkCategoryProject>(this.url + "byStudent?student=" + student + "&project=" + subject + "&type=" + type);
  }

  findByStudentAllMarks(student, type): Observable<StudentMarkCategoryProject[]> {
    return this.http.get<StudentMarkCategoryProject[]>(this.url + "findByStudentAllMarks?student=" + student + "&type=" + type);
  }

  findByTypeSubjectClass(classSchool, type, subject, year): Observable<StudentMarkCategoryProject[]> {
    return this.http.get<StudentMarkCategoryProject[]>(this.url + "findByTypeSubjectClass?classSchool=" + classSchool + "&type=" + type +
      "&subject=" + subject + "&year=" + year);
  }

  save(classSchool: StudentMarkCategoryProject): Observable<StudentMarkCategoryProject> {
    return this.http.post<StudentMarkCategoryProject>(this.url + "create", classSchool);
  }

  update(classSchool: StudentMarkCategoryProject): Observable<StudentMarkCategoryProject> {
    return this.http.put<StudentMarkCategoryProject>(this.url + "update", classSchool);
  }

  delete(id: string) {
    return this.http.get(this.url + "delete?id=" + id);
  }

}
