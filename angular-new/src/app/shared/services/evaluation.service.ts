import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trend } from '../models/trend';
import { Evaluation } from '../models/evaluation';
import { EvaluationsComponent } from 'src/app/components/manager/evaluations/evaluations.component';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  url: string = environment.baseUrl + "evaluation/";

  constructor(public http: HttpClient) { }

  getAll(): Observable<Evaluation[]> {
    return this.http.get<Evaluation[]>(this.url + "all");
  }

  save(trend: Evaluation): Observable<Evaluation> {
    return this.http.post<Evaluation>(this.url + "create", trend);
  }

  update(trend: Evaluation): Observable<Evaluation> {
    return this.http.put<Evaluation>(this.url + "update", trend);
  }

  delete(id: string) {
    return this.http.get(this.url + "delete?id=" + id);
  }

}
