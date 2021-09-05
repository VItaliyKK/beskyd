import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DepartmentsComponent } from './pages/department/departments/departments.component';
import { DepartmentComponent } from './pages/department/department/department.component';
import { EditDepartmentComponent } from './pages/department/edit-department/edit-department.component';
import { GroupsComponent } from './pages/group/groups/groups.component';
import { GroupComponent } from './pages/group/group/group.component';
import { EditGroupComponent } from './pages/group/edit-group/edit-group.component';
import { StudentsComponent } from './pages/student/students/students.component';
import { StudentComponent } from './pages/student/student/student.component';
import { EditStudentComponent } from './pages/student/edit-student/edit-student.component';
import { AddStudentComponent } from './pages/student/add-student/add-student.component';


const routes: Routes = [
  { path: 'department/list', component: DepartmentsComponent },
  { path: 'department/edit/:id', component: EditDepartmentComponent },
  { path: 'department/:id', component: DepartmentComponent },
  { path: 'group/list', component: GroupsComponent },
  { path: 'group/edit/:id', component: EditGroupComponent },
  { path: 'group/:id', component: GroupComponent },
  { path: 'student/list', component: StudentsComponent },
  { path: 'student/add', component: AddStudentComponent },
  { path: 'student/:id', component: StudentComponent },
  { path: 'student/edit/:id', component: EditStudentComponent },
  { path: 'not-found', component: NotFoundComponent},
  { path: '', component: HomeComponent},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
