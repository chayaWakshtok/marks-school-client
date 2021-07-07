import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trend } from '../models/trend';
import { Subject } from '../models/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  url: string = environment.baseUrl + "subject/";

  constructor(public http: HttpClient) { }

  getAll(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.url + "all");
  }

  save(trend: Subject): Observable<Subject> {
    return this.http.post<Subject>(this.url + "create", trend);
  }

  update(trend: Subject): Observable<Subject> {
    return this.http.put<Subject>(this.url + "update", trend);
  }

  delete(id: string) {
    return this.http.get(this.url + "delete?id=" + id);
  }

}
