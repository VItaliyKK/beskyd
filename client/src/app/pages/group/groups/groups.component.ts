import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../../shared/services/group.service';
import { DepartmentService } from '../../../shared/services/department.service';
import { IGroup } from '../../../shared/interfaces/group.interface';
import { IDepartment } from '../../../shared/interfaces/department.interface';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  groups$:Observable<IGroup[]>
  departments:IDepartment[] = []
  showAddGroupPopup:boolean = false
  errorMessage:string = ''
  preloaders = {
    groups: false,
    createGroup: false,
  }
  groupForm: FormGroup = new FormGroup({
    form_education: new FormControl('', Validators.required),
    abbr: new FormControl('', [Validators.required, Validators.maxLength(6)]),
    max_quantity_members: new FormControl('', Validators.required),
    department_id: new FormControl('', Validators.required)
  });
  groupEditForms = [];

  constructor( 
    private groupService: GroupService, 
    private departmentService: DepartmentService ) { }

  ngOnInit(): void {
    this.getAllGroups();
    this.departmentService.getDepartments().toPromise()
      .then( deps => {
        this.departments = deps
      })
  }

  getAllGroups(){
    this.preloaders.groups = true;
    this.groups$ = this.groupService.getGroups()
    this.groups$.subscribe( data => {
      this.preloaders.groups = false;
      this.generateGroupEditForms(data);
    }, (err) => {
      this.errorMessage = err.message
    })
  }

  createGroup():any{
    this.preloaders.createGroup = true;
    this.groupService.createGroup(this.groupForm.value)
      .then( () => {
        this.closeAddGroupPopup();
        this.getAllGroups();
      })
      .catch( err => {
        this.groupForm.setErrors({
          'unresolved': err.message
        })
      })
      .finally( () => {
        this.preloaders.createGroup = false;
      })
  }

  deleteGroup(id:number): void {
    this.groupService.deleteGroup(id)
      .then( () => {
        this.closeAddGroupPopup();
        this.getAllGroups();
      })
      .catch( err => {
        // handle error
      })
  }

  closeAddGroupPopup():void{
    this.showAddGroupPopup = false
    this.groupForm.reset();
  }

  generateGroupEditForms(data):void {
    this.groupEditForms.length = 0;
    data.map( group => {
      let newFormGroup = new FormGroup({
        form_education: new FormControl('', Validators.required),
        abbr: new FormControl('', [Validators.required, Validators.maxLength(6)]),
        max_quantity_members: new FormControl('', Validators.required),
        department_id: new FormControl()
      });
      newFormGroup.setValue({
        form_education: group.form_education,
        abbr: group.abbr,
        max_quantity_members: group.max_quantity_members,
        department_id: group.department_id
      })
      this.groupEditForms.push({
        preloader:false,
        edit: false,
        department: group.department_id,
        form_education: group.form_education,
        id: group.id,
        form: newFormGroup
      })
    });
  }

  cancelEditForm(i:number){
    this.groupEditForms[i].edit = false
  }

  setEditForm(i:number):void {
    this.groupEditForms[i].edit = true
  }

  updateGroup(i:number):void {
    this.groupEditForms[i].preloader = true
    this.groupService.updateGroup({
      id: this.groupEditForms[i].id,
      ...this.groupEditForms[i].form.value
    }).then( () => {
      this.getAllGroups();
    })
    .catch( err => {
      this.groupEditForms[i].setErrors({
        'unresolved': err.message
      })
    })
    .finally( () => {
      this.groupEditForms[i].preloader = false;
    })
  }
}
