import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trend } from '../models/trend';
import { ClassSchool } from '../models/classSchool';
import { Category } from '../models/category';
import { CategoryProject } from '../models/categoryProject';

@Injectable({
  providedIn: 'root'
})
export class CategoryProjectService {

  url: string = environment.baseUrl + "CategoryProject/";

  constructor(public http: HttpClient) { }

  getAll(): Observable<CategoryProject[]> {
    return this.http.get<CategoryProject[]>(this.url + "all");
  }

  findAllBySubjectAndType(type,subject): Observable<CategoryProject[]> {
    return this.http.get<CategoryProject[]>(this.url + "bySubjectAndTypeAndUser?type="+type+"&project="+subject);
  }

  save(classSchool: CategoryProject): Observable<CategoryProject> {
    return this.http.post<CategoryProject>(this.url + "create", classSchool);
  }

  update(classSchool: CategoryProject): Observable<CategoryProject> {
    return this.http.put<CategoryProject>(this.url + "update", classSchool);
  }

  delete(id: string) {
    return this.http.get(this.url + "delete?id=" + id);
  }

}
