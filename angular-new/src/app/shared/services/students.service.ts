import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trend } from '../models/trend';
import { Subject } from '../models/subject';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  url: string = environment.baseUrl + "student/";

  constructor(public http: HttpClient) { }

  getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(this.url + "all");
  }

  getByClass(cl): Observable<Student[]> {
    return this.http.get<Student[]>(this.url + "findByClass?classSchool="+cl);
  }

  save(trend: Student): Observable<Student> {
    return this.http.post<Student>(this.url + "create", trend);
  }

  update(trend: Student): Observable<Student> {
    return this.http.put<Student>(this.url + "update", trend);
  }

  delete(id: string) {
    return this.http.get(this.url + "delete?id=" + id);
  }

}
