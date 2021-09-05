import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IDepartment } from 'src/app/shared/interfaces/department.interface';
import { DepartmentService } from 'src/app/shared/services/department.service';
import { GroupService } from 'src/app/shared/services/group.service';
import { StudentService } from 'src/app/shared/services/student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {
  preloader: boolean = false
  message = {
    value: '',
    type: 'warning'
  }
  student: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    birthdate: new FormControl('', Validators.required),
    group_id: new FormControl(null, Validators.required),
    department_id: new FormControl(null, Validators.required),
    form_education: new FormControl(null, Validators.required)
  })
  departments: IDepartment[] = []
  groups = {
    all: [],
    visible: []
  }

  constructor(
    private studentService: StudentService,
    private groupService: GroupService,
    private departmentService: DepartmentService
  ) { }

  ngOnInit(): void {
    this.groupService.getGroups().toPromise()
      .then( groups => {
        this.groups.all = groups
      })
    this.departmentService.getDepartments().toPromise()
      .then( departments => {
        this.departments = departments
      })  
  }

  createStudent(): void {
    this.preloader = true
    this.studentService.createStudent(this.student.value)
      .then( () => {
        this.student.reset()
        this.message.type = 'success'
        this.message.value = 'Студент доданий.'
      })
      .catch(err => {
        this.student.setErrors({
          'unresolved': err.message
        })
      })
      .finally(() => {
        this.preloader = false;
      })
  }

  filterSituableOptions(ev, extra_val?:string | number):void {
    const value = ev?.target?.value 
      ? ev.target.value 
      : extra_val
    this.groups.visible = this.groups.all.filter( gr => gr.department_id == value)
    this.student.value.group_id = ''
  }
}
