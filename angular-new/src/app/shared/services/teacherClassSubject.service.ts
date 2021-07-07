import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trend } from '../models/trend';
import { TeacherClassSubject } from '../models/teacherClassSubject';

@Injectable({
  providedIn: 'root'
})
export class TeacherClassSubjectService {

  url: string = environment.baseUrl + "teacherClassSubject/";

  constructor(public http: HttpClient) { }

  getAll(): Observable<TeacherClassSubject[]> {
    return this.http.get<TeacherClassSubject[]>(this.url + "all");
  }

  getByTeacher(): Observable<TeacherClassSubject[]> {
    return this.http.get<TeacherClassSubject[]>(this.url + "findByTeacher");
  }

  save(trend: TeacherClassSubject): Observable<TeacherClassSubject> {
    return this.http.post<TeacherClassSubject>(this.url + "create", trend);
  }

  update(trend: TeacherClassSubject): Observable<TeacherClassSubject> {
    return this.http.put<TeacherClassSubject>(this.url + "update", trend);
  }

  delete(id: string) {
    return this.http.get(this.url + "delete?id=" + id);
  }

}
