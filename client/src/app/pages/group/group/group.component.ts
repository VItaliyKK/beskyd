import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IGroup } from 'src/app/shared/interfaces/group.interface';
import { IDepartment } from '../../../shared/interfaces/department.interface';
import { GroupService } from 'src/app/shared/services/group.service';
import { DepartmentService } from '../../../shared/services/department.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  id:number
  preloader:boolean = false
  group$:Observable<IGroup>
  group:IGroup
  departments:IDepartment[] = []

  constructor( 
    private groupService: GroupService,
    private departmentService: DepartmentService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.id = this.route.snapshot.params['id'] 
  }

  ngOnInit(): void {
    this.getGroup();
    this.departmentService.getDepartments().toPromise()
      .then( deps => {
        this.departments = deps
      })
  }

  getGroup(): void{
    this.preloader = true
    this.group$ = this.groupService.getGroup(this.id)
    this.group$.subscribe( dep => {
      this.group = dep
      this.preloader = false
    })
  }

  deleteGroup():void {
    this.preloader = false
    this.groupService.deleteGroup(this.id)
      .then( () => this.router.navigateByUrl(`/group/list`))
      .catch( err => {
        // handle error
      })
  }
}
