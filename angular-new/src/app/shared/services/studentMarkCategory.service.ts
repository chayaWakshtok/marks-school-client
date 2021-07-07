import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trend } from '../models/trend';
import { ClassSchool } from '../models/classSchool';
import { Category } from '../models/category';
import { StudentMarkCategory } from '../models/studentMarkCategory';

@Injectable({
  providedIn: 'root'
})
export class StudentMarkCategoryService {

  url: string = environment.baseUrl + "studentMarkCategory/";

  constructor(public http: HttpClient) { }

  getAll(): Observable<StudentMarkCategory[]> {
    return this.http.get<StudentMarkCategory[]>(this.url + "all");
  }

  findByStudent(student,subject,type): Observable<StudentMarkCategory> {
    return this.http.get<StudentMarkCategory>(this.url + "byStudent?student="+student+"&subject="+subject+"&type="+type);
  }

  findByStudentAllMarks(student,type): Observable<StudentMarkCategory[]> {
    return this.http.get<StudentMarkCategory[]>(this.url + "findByStudentAllMarks?student="+student+"&type="+type);
  }

  save(classSchool: StudentMarkCategory): Observable<StudentMarkCategory> {
    return this.http.post<StudentMarkCategory>(this.url + "create", classSchool);
  }

  update(classSchool: StudentMarkCategory): Observable<StudentMarkCategory> {
    return this.http.put<StudentMarkCategory>(this.url + "update", classSchool);
  }

  delete(id: string) {
    return this.http.get(this.url + "delete?id=" + id);
  }

}
