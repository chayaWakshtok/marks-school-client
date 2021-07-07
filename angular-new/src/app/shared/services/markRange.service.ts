import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trend } from '../models/trend';
import { ClassSchool } from '../models/classSchool';
import { MarkRange } from '../models/markRange';

@Injectable({
  providedIn: 'root'
})
export class MarkRangeService {

  url: string = environment.baseUrl + "markRange/";

  constructor(public http: HttpClient) { }

  getAll(): Observable<MarkRange[]> {
    return this.http.get<MarkRange[]>(this.url + "all");
  }

  save(classSchool: MarkRange): Observable<MarkRange> {
    return this.http.post<MarkRange>(this.url + "create", classSchool);
  }

  update(classSchool: MarkRange): Observable<MarkRange> {
    return this.http.put<MarkRange>(this.url + "update", classSchool);
  }

  delete(id: string) {
    return this.http.get(this.url + "delete?id=" + id);
  }

}
