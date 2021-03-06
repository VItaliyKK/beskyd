import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IDepartment } from '../interfaces/department.interface';
import { IResponse } from '../interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor( private http: HttpClient ) { }

  getDepartments(): Observable<IDepartment[]> {
    return this.http.get('department/get/list')
    .pipe( map( d => (d as IResponse).result ))
  }

  getDepartment(id:number): Observable<any> {
    return this.http.get(`department/${id}`)
      .pipe( map( d => (d as IResponse).result ))
  }

  createDepartment({name, abbr, founded}:IDepartment): Promise<any> {
    return this.http.post<IDepartment>('department/add', { name, abbr, founded })
      .toPromise();
  }

  deleteDepartment(id:number): Promise<any> {
    return this.http.delete<string>(`department/${id}`)
      .toPromise();
  }

  updateDepartment({id, name, abbr, founded}:IDepartment): Promise<any> {
    return this.http.put<IDepartment>(`department/${id}`, { name, abbr, founded })
      .toPromise();
  }
}

