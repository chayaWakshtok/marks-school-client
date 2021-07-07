import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trend } from '../models/trend';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = environment.baseUrl + "user/";

  constructor(public http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.url + "all");
  }

  getAllByRole(role: string): Observable<User[]> {
    return this.http.get<User[]>(this.url + "findByRole?role=" + role);
  }

  getAllRole(): Observable<any[]> {
    return this.http.get<any[]>(this.url + "role/all");
  }

  save(user: User): Observable<User> {
    return this.http.post<User>(this.url + "create", user);
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(this.url + "update", user);
  }

  delete(id: string) {
    return this.http.get(this.url + "delete?id=" + id);
  }

}
