import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDepartment } from 'src/app/shared/interfaces/department.interface';
import { DepartmentService } from 'src/app/shared/services/department.service';
import { GroupService } from 'src/app/shared/services/group.service';
import { StudentService } from 'src/app/shared/services/student.service';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit {
  id:number
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
    private departmentService: DepartmentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = this.route.snapshot.params['id']
  }

  ngOnInit(): void {
    this.getStudent()
    this.groupService.getGroups().toPromise()
      .then( groups => {
        this.groups.all = groups
      })
    this.departmentService.getDepartments().toPromise()
      .then( departments => {
        this.departments = departments
      }).then( () => {
        this.filterSituableOptions(null, this.student.value.department_id)
      })
  }

  getStudent():void{
    this.studentService.getStudent(this.id).toPromise()
    .then( student => {
      this.student.setValue({
        name:           student.name,
        last_name:      student.last_name,
        surname:        student.surname,
        email:          student.email,
        birthdate:      moment(student.birthdate).format("YYYY-MM-DD"),
        group_id:       student.group_id,
        department_id:  student.department_id,
        form_education: student.form_education
      })
    }).catch( err => {      
      if(err.status === 404){
        this.router.navigateByUrl(`/not-found`)
      }else{
        this.message.type = 'failed'
        this.message.value = err.message
      }
    })
  }

  updateStudent(): void {
    this.preloader = true
    this.studentService.updateStudent({ id:this.id, ...this.student.value})
      .then( () => {
        this.message.type = 'success'
        this.message.value = '?????????? ????????????????.'
      }).catch(err => {
        this.student.setErrors({
          'unresolved': err.message
        })
      }).finally(() => {
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
