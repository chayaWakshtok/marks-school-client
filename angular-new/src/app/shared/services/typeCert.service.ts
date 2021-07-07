import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Trend } from '../models/trend';
import { ClassSchool } from '../models/classSchool';
import { TypeCert } from '../models/typeCert';

@Injectable({
  providedIn: 'root'
})
export class TypeCertService {

  url: string = environment.baseUrl + "typeCert/";

  constructor(public http: HttpClient) { }

  getAll(): Observable<TypeCert[]> {
    return this.http.get<TypeCert[]>(this.url + "all");
  }

  save(classSchool: TypeCert): Observable<TypeCert> {
    return this.http.post<TypeCert>(this.url + "create", classSchool);
  }

  update(classSchool: TypeCert): Observable<TypeCert> {
    return this.http.put<TypeCert>(this.url + "update", classSchool);
  }

  delete(id: string) {
    return this.http.get(this.url + "delete?id=" + id);
  }

}
