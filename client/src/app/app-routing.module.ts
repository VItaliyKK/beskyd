import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DepartmentsComponent } from './pages/department/departments/departments.component';
import { DepartmentComponent } from './pages/department/department/department.component';
import { EditDepartmentComponent } from './pages/department/edit-department/edit-department.component';
import { GroupsComponent } from './pages/group/groups/groups.component';
import { EditGroupComponent } from './pages/group/edit-group/edit-group.component';


const routes: Routes = [
  { path: 'department/list', component: DepartmentsComponent },
  { path: 'department/edit/:id', component: EditDepartmentComponent },
  { path: 'department/:id', component: DepartmentComponent },
  { path: 'group/list', component: GroupsComponent },
  { path: 'group/edit/:id', component: EditGroupComponent },
  { path: 'group/:id', component: GroupsComponent },
  { path: '', component: HomeComponent},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
