import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../../shared/services/department.service';
import { IDepartment } from '../../../shared/interfaces/department.interface';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {
  departments$:Observable<IDepartment[]>
  showAddDepartmentPopup:boolean = false
  errorMessage:string = ''
  preloaders = {
    departments: false,
    createDepartment: false,
  }
  departmentForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    abbr: new FormControl('', [Validators.required, Validators.maxLength(4)]),
    founded: new FormControl('', Validators.required)
  });
  // displayDepartmentEditForms = [];
  departmentEditForms = [];

  constructor( private departmentService: DepartmentService ) { }

  ngOnInit(): void {
    this.getAllDepartments();
  }

  getAllDepartments(){
    this.preloaders.departments = true;
    this.departments$ = this.departmentService.getDepartments()
    this.departments$.subscribe( data => {
      this.preloaders.departments = false;
      this.generateDepartmentEditForms(data);
    }, (err) => {
      this.errorMessage = err.message
    })
  }

  createDepartment():any{
    this.preloaders.departments = true;
    this.departmentService.createDepartment(this.departmentForm.value)
      .then( res => {
        console.log('CREATED DEPARTMENT:', res)
        this.closeAddDepartmentPopup();
      })
      .catch( err => {
        this.departmentForm.setErrors({
          'unresolved': err.message
        })
      })
      .finally( () => {
        this.preloaders.departments = false;
      })
  }

  deleteDepartment(id:number): void {
    this.departmentService.deleteDepartment(id)
      .then( res => {
        console.log('DELETED DEPARTMENT:', res)
        this.closeAddDepartmentPopup();
        this.getAllDepartments();
      })
      .catch( err => {
        console.log(err)
      })
  }

  closeAddDepartmentPopup():void{
    this.showAddDepartmentPopup = false
    this.departmentForm.reset();
  }

  generateDepartmentEditForms(data):void {
    this.departmentEditForms.length = 0;
    data.map( dep => {
      let newFormGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        abbr: new FormControl('', [Validators.required, Validators.maxLength(4)]),
        founded: new FormControl('', Validators.required)
      });
      newFormGroup.setValue({
        name: dep.name,
        abbr: dep.abbr,
        founded: dep.founded
      })
      this.departmentEditForms.push({
        preloader:false,
        edit: false,
        id: dep.id,
        form: newFormGroup
      })
    });
    console.log(this.departmentEditForms);
  }

  cancelEditForm(i:number){
    this.departmentEditForms[i].edit = false
  }

  setEditForm(i:number):void {
    this.departmentEditForms[i].edit = true
  }

  updateDepartment(i:number):void {
    this.departmentEditForms[i].preloader = true
    this.departmentService.updateDepartment({
      id: this.departmentEditForms[i].id,
      ...this.departmentEditForms[i].form.value
    }).then( res => {
      this.getAllDepartments();
    })
    .catch( err => {
      this.departmentEditForms[i].setErrors({
        'unresolved': err.message
      })
    })
    .finally( () => {
      this.departmentEditForms[i].preloader = false;
    })
  }
}
