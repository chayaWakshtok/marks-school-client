import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from '../models/comment';
import { Evaluation } from '../models/evaluation';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  url: string = environment.baseUrl + "comment/";

  constructor(public http: HttpClient) { }

  getAll(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.url + "all");
  }

  save(trend: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.url + "create", trend);
  }

  update(trend: Comment): Observable<Comment> {
    return this.http.put<Comment>(this.url + "update", trend);
  }

  delete(id: string) {
    return this.http.get(this.url + "delete?id=" + id);
  }

}
