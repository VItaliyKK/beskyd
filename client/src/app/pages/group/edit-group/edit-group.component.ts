import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IGroup } from 'src/app/shared/interfaces/group.interface';
import { IDepartment } from '../../../shared/interfaces/department.interface';
import { GroupService } from 'src/app/shared/services/group.service';
import { DepartmentService } from '../../../shared/services/department.service';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss']
})
export class EditGroupComponent implements OnInit {
  id:number
  // preloader:boolean = false
  preloaders = {
    preloader: false,
    update: false
  }
  errorMessage:string = ''
  group$: Promise<IGroup>
  group: IGroup
  departments:IDepartment[] = []
  groupForm: FormGroup = new FormGroup({
    form_education: new FormControl('', Validators.required),
    abbr: new FormControl('', [Validators.required, Validators.maxLength(6)]),
    max_quantity_members: new FormControl('', [Validators.required, Validators.min(1), Validators.max(30)]),
    department_id: new FormControl('', Validators.required)
  });

  constructor( 
    private groupService: GroupService,
    private departmentService: DepartmentService,
    private route: ActivatedRoute,
    private router: Router
  ) { this.id = this.route.snapshot.params['id'] }

  ngOnInit(): void {
    this.getGroup();
    this.departmentService.getDepartments().toPromise()
      .then( deps => {
        this.departments = deps
      })
  }

  getGroup(): void{
    this.preloaders.preloader = true
    this.group$ = this.groupService.getGroup(this.id).toPromise()
    this.group$.then( group => {
        this.groupForm.setValue({
          form_education: group.form_education,
          abbr: group.abbr,
          max_quantity_members: group.max_quantity_members,
          department_id: group.department_id
        })
        this.preloaders.preloader = false
      })
  }

  updateGroup():void {
    this.preloaders.update = true
    this.groupService.updateGroup({
      id: this.id,
      ...this.groupForm.value
    }).then( () => {
      this.router.navigateByUrl(`/group/${this.id}`)
    })
    .catch( err => {
      this.groupForm.setErrors({
        'unresolved': err.message
      })
      this.preloaders.update = false;
    })
  }

  deleteGroup(): void{
    this.preloaders.preloader = true
    this.groupService.deleteGroup(this.id)
      .then( () => {
        this.router.navigateByUrl(`/group/list`)
      })
      .catch( err => {
        this.errorMessage = err.message
        this.preloaders.preloader = false
      })
  }
}
