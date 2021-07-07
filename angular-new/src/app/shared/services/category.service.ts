import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trend } from '../models/trend';
import { ClassSchool } from '../models/classSchool';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url: string = environment.baseUrl + "category/";

  constructor(public http: HttpClient) { }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url + "all");
  }

  findAllBySubjectAndType(type,subject): Observable<Category[]> {
    return this.http.get<Category[]>(this.url + "bySubjectAndTypeAndUser?type="+type+"&subject="+subject);
  }

  save(classSchool: Category): Observable<Category> {
    return this.http.post<Category>(this.url + "create", classSchool);
  }

  update(classSchool: Category): Observable<Category> {
    return this.http.put<Category>(this.url + "update", classSchool);
  }

  delete(id: string) {
    return this.http.get(this.url + "delete?id=" + id);
  }

}
