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

  // getDepartments(): Observable<IDepartment[]> {
    // return this.http.get('department/get/list')
    // .pipe( map( d => (d as IResponse).result ))
  getDepartments(): Observable<any> {
    return this.http.get('departments')
      .pipe( map( d => d ))
  }

  getDepartment(id:number): Observable<any> {
    return this.http.get(`departments/${id}`)
      .pipe( map( d => d ))
  }

  createDepartment({name, abbr, founded}:IDepartment): Promise<any> {
    return this.http.post<IDepartment>('departments/add', { name, abbr, founded })
      .toPromise();
  }

  deleteDepartment(id:number): Promise<any> {
    return this.http.delete<string>(`departments/${id}`)
      .toPromise();
  }

  updateDepartment({id, name, abbr, founded}:IDepartment): Promise<any> {
    return this.http.put<IDepartment>(`departments/${id}`, { name, abbr, founded })
      .toPromise();
  }
}

