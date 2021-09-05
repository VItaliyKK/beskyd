import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IStudent } from '../interfaces/student.interface';
import { IResponse } from '../interfaces/response.interface';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor( private http: HttpClient) { }

  getStudents(): Observable<IStudent[]> {
    return this.http.get('student/get/list/full')
      .pipe( map( (d:IResponse) => d.result ))
    }
  
    getStudent(id:number): Observable<any> {
      return this.http.get(`student/${id}/full`)
        .pipe( map( (d:IResponse) => d.result ))
    }
  
    createStudent({group_id, name, last_name, surname, email, city, birthdate}:IStudent): Promise<any> {
      group_id = +group_id;
      return this.http.post<IStudent>('student/add', { group_id, name, last_name, surname, email, city, birthdate })
        .toPromise();
    }
  
    deleteStudent(id:number): Promise<any> {
      return this.http.delete<string>(`student/${id}`)
        .toPromise();
    }
  
    updateStudent({id, group_id, name, last_name, surname, email, city, birthdate}:IStudent): Promise<any> {
      group_id = +group_id;
      return this.http.put<IStudent>(`student/${id}`, { group_id, name, last_name, surname, email, city, birthdate })
        .toPromise();
    }
}
