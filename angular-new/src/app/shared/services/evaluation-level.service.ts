import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trend } from '../models/trend';
import { Evaluation } from '../models/evaluation';
import { EvaluationLevel } from '../models/evaluationLevel';

@Injectable({
  providedIn: 'root'
})
export class EvaluationLevelService {

  url: string = environment.baseUrl + "evaluationLevel/";

  constructor(public http: HttpClient) { }

  getAll(): Observable<EvaluationLevel[]> {
    return this.http.get<EvaluationLevel[]>(this.url + "all");
  }

  save(trend: EvaluationLevel): Observable<EvaluationLevel> {
    return this.http.post<EvaluationLevel>(this.url + "create", trend);
  }

  findByEvaluationList(list: string[]): Observable<EvaluationLevel[]> {
    return this.http.post<EvaluationLevel[]>(this.url + "findByEvaluationList", { list: list });
  }

  update(trend: EvaluationLevel): Observable<EvaluationLevel> {
    return this.http.put<EvaluationLevel>(this.url + "update", trend);
  }

  delete(id: string) {
    return this.http.get(this.url + "delete?id=" + id);
  }

}
