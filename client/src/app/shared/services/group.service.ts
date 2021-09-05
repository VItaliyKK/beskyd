import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IGroup } from '../interfaces/group.interface';
import { IResponse } from '../interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor( private http: HttpClient) { }

  getGroups(): Observable<IGroup[]> {
    return this.http.get('group/get/list')
    .pipe( map( d => (d as IResponse).result ))
    // getGroups(): Observable<any> {
    //   return this.http.get('Groups')
    //     .pipe( map( d => d )) 
    }
  
    getGroup(id:number): Observable<any> {
      return this.http.get(`group/${id}`)
        .pipe( map( d => (d as IResponse).result ))
    }
  
    createGroup({form_education, abbr, max_quantity_members, department_id}:IGroup): Promise<any> {
      department_id = +department_id;
      return this.http.post<IGroup>('group/add', { form_education, abbr, max_quantity_members, department_id })
        .toPromise();
    }
  
    deleteGroup(id:number): Promise<any> {
      return this.http.delete<string>(`group/${id}`)
        .toPromise();
    }
  
    updateGroup({id, form_education, abbr, max_quantity_members, department_id}:IGroup): Promise<any> {
      department_id = +department_id;
      return this.http.put<IGroup>(`group/${id}`, { form_education, abbr, max_quantity_members, department_id })
        .toPromise();
    }
}
