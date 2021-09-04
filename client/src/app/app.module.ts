import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; 
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { APIInterceptor } from './shared/interceptors/api.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DepartmentComponent } from './pages/department/department/department.component';
import { DepartmentsComponent } from './pages/department/departments/departments.component';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { FooterComponent } from './components/footer/footer.component';
import { MessageComponent } from './components/message/message.component';
import { EditDepartmentComponent } from './pages/department/edit-department/edit-department.component';
import { GroupsComponent } from './pages/group/groups/groups.component';
import { GroupComponent } from './pages/group/group/group.component';
import { EditGroupComponent } from './pages/group/edit-group/edit-group.component';
import { StudentsComponent } from './pages/student/students/students.component';
import { StudentComponent } from './pages/student/student/student.component';
import { EditStudentComponent } from './pages/student/edit-student/edit-student.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NotFoundComponent,
    DepartmentComponent,
    DepartmentsComponent,
    PreloaderComponent,
    FooterComponent,
    MessageComponent,
    EditDepartmentComponent,
    GroupsComponent,
    GroupComponent,
    EditGroupComponent,
    StudentsComponent,
    StudentComponent,
    EditStudentComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: APIInterceptor,
      multi: true 
    } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
