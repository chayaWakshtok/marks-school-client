import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trend } from '../models/trend';
import { Evaluation } from '../models/evaluation';
import { EvaluationsComponent } from 'src/app/components/manager/evaluations/evaluations.component';
import { EvaluationStudentMark } from '../models/evaluationStudentMark';

@Injectable({
  providedIn: 'root'
})
export class EvaluationStudentMarkService {

  url: string = environment.baseUrl + "evaluationStudentMark/";

  constructor(public http: HttpClient) { }

  getAll(): Observable<EvaluationStudentMark[]> {
    return this.http.get<EvaluationStudentMark[]>(this.url + "all");
  }

  findByTypeAndStudent(type, student): Observable<EvaluationStudentMark> {
    return this.http.get<EvaluationStudentMark>(this.url + "findByTypeAndStudent?type=" + type + "&student=" + student);
  }

  save(trend: EvaluationStudentMark): Observable<EvaluationStudentMark> {
    return this.http.post<EvaluationStudentMark>(this.url + "create", trend);
  }

  update(trend: EvaluationStudentMark): Observable<EvaluationStudentMark> {
    return this.http.put<EvaluationStudentMark>(this.url + "update", trend);
  }

  delete(id: string) {
    return this.http.get(this.url + "delete?id=" + id);
  }

}
