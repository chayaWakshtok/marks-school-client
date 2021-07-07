import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trend } from '../models/trend';

@Injectable({
  providedIn: 'root'
})
export class TrendService {

  url: string = environment.baseUrl + "trend/";

  constructor(public http: HttpClient) { }

  getAll(): Observable<Trend[]> {
    return this.http.get<Trend[]>(this.url + "all");
  }

  save(trend: Trend): Observable<Trend> {
    return this.http.post<Trend>(this.url + "create", trend);
  }

  update(trend: Trend): Observable<Trend> {
    return this.http.put<Trend>(this.url + "update", trend);
  }

  delete(id: string) {
    return this.http.get(this.url + "delete?id=" + id);
  }

}
