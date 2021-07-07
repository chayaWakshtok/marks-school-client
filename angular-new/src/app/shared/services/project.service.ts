import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trend } from '../models/trend';
import { ClassSchool } from '../models/classSchool';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  url: string = environment.baseUrl + "project/";

  constructor(public http: HttpClient) { }

  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>(this.url + "all");
  }

  findAllBySubjectAndType(type, subject): Observable<Project[]> {
    return this.http.get<Project[]>(this.url + "bySubjectAndType?type=" + type + "&subject=" + subject);
  }

  save(project: Project): Observable<Project> {
    return this.http.post<Project>(this.url + "create", project);
  }

  update(classSchool: Project): Observable<Project> {
    return this.http.put<Project>(this.url + "update", classSchool);
  }

  delete(id: string) {
    return this.http.get(this.url + "delete?id=" + id);
  }

}
