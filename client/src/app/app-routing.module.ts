import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DepartmentComponent } from './pages/department/department.component';
import { DepartmentsComponent } from './pages/departments/departments.component';


const routes: Routes = [
  { path: 'department/list', component: DepartmentsComponent },
  { path: 'department/:id', component: DepartmentComponent },
  { path: '', component: HomeComponent},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
