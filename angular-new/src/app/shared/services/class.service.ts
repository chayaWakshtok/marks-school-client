import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trend } from '../models/trend';
import { ClassSchool } from '../models/classSchool';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  url: string = environment.baseUrl + "class/";

  constructor(public http: HttpClient) { }

  getAll(): Observable<ClassSchool[]> {
    return this.http.get<ClassSchool[]>(this.url + "all");
  }

  findByTeacher(): Observable<ClassSchool[]> {
    return this.http.get<ClassSchool[]>(this.url + "findByTeacher");
  }

  save(classSchool: ClassSchool): Observable<ClassSchool> {
    return this.http.post<ClassSchool>(this.url + "create", classSchool);
  }

  update(classSchool: ClassSchool): Observable<ClassSchool> {
    return this.http.put<ClassSchool>(this.url + "update", classSchool);
  }

  delete(id: string) {
    return this.http.get(this.url + "delete?id=" + id);
  }

  classNames: string[] = ['יב', 'יא', 'י', 'ט'];

  getClassName(classS: ClassSchool) {
    if (classS) {
      return this.classNames[classS.endingYear - new Date().getFullYear()] + " - " + classS.className;
    }
    return "";
  }

}
