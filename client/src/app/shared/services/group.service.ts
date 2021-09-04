import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IGroup } from '../interfaces/group.interface';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor( private http: HttpClient) { }

  // getGroups(): Observable<IGroup[]> {
    // return this.http.get('Group/get/list')
    // .pipe( map( d => (d as IResponse).result ))
    getGroups(): Observable<any> {
      return this.http.get('Groups')
        .pipe( map( d => d ))
    }
  
    getGroup(id:number): Observable<any> {
      return this.http.get(`Groups/${id}`)
        .pipe( map( d => d ))
    }
  
    createGroup({form_education, abbr, max_quantity_members}:IGroup): Promise<any> {
      return this.http.post<IGroup>('Groups/add', { form_education, abbr, max_quantity_members })
        .toPromise();
    }
  
    deleteGroup(id:number): Promise<any> {
      return this.http.delete<string>(`Groups/${id}`)
        .toPromise();
    }
  
    updateGroup({id, name, abbr, founded}:IGroup): Promise<any> {
      return this.http.put<IGroup>(`Groups/${id}`, { name, abbr, founded })
        .toPromise();
    }
}
