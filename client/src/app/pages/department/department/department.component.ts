import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IDepartment } from 'src/app/shared/interfaces/department.interface';
import { DepartmentService } from 'src/app/shared/services/department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  id:number
  preloader:boolean = false
  department$:Observable<IDepartment>
  department:IDepartment

  constructor( 
    private departmentService: DepartmentService,
    private route: ActivatedRoute,
    private router: Router
  ) { this.id = this.route.snapshot.params['id'] }

  ngOnInit(): void {
    this.getDepartment();
  }

  getDepartment(): void{
    this.preloader = true
    this.department$ = this.departmentService.getDepartment(this.id)
    this.department$.subscribe( dep => {
      this.department = dep
      this.preloader = false
    })
  }

  deleteDepartment():void {
    this.preloader = false
    this.departmentService.deleteDepartment(this.id)
      .then( () => this.router.navigateByUrl(`/department/list`))
      .catch( err => {
        console.log(err)
      })
  }
}
