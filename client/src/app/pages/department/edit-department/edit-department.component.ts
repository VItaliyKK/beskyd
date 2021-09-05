import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDepartment } from 'src/app/shared/interfaces/department.interface';
import { DepartmentService } from 'src/app/shared/services/department.service';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.scss']
})
export class EditDepartmentComponent implements OnInit {
  id:number
  preloader:boolean = false
  errorMessage:string = ''
  department$: Promise<IDepartment>
  department: IDepartment
  departmentForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    abbr: new FormControl('', [Validators.required, Validators.maxLength(4)]),
    founded: new FormControl('', Validators.required)
  });

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
    this.department$ = this.departmentService.getDepartment(this.id).toPromise()
    this.department$.then( dep => {
        this.department = dep
        const date = moment(dep.founded).format("YYYY-MM-DD");
        this.departmentForm.setValue({
          name: dep.name,
          abbr: dep.abbr,
          founded: date
        })
        this.preloader = false
      })
  }

  updateDepartment():void {
    this.preloader = true
    this.departmentService.updateDepartment({
      id: this.id,
      ...this.departmentForm.value
    }).then( () => {
      this.router.navigateByUrl(`/department/${this.id}`)
    })
    .catch( err => {
      this.departmentForm.setErrors({
        'unresolved': err.message
      })
      this.preloader = false;
    })
  }

  deleteDepartment(): void{
    this.preloader = true
    this.departmentService.deleteDepartment(this.id)
      .then( () => {
        this.router.navigateByUrl(`/department/list`)
      })
      .catch( err => {
        this.errorMessage = err.message
        this.preloader = false
      })
  }
}
