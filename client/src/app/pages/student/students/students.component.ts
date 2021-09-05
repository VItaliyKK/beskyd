import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../shared/services/student.service';
import { Observable } from 'rxjs';
import { IStudent } from '../../../shared/interfaces/student.interface';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  preloader:boolean = false
  students$:Observable<IStudent[]>
  errorMessage:string = ''


  constructor( private studentService: StudentService  ) { }

  ngOnInit(): void {
    this.getAllStudents()
  }

  getAllStudents():void {
    this.preloader = true;
    this.students$ = this.studentService.getStudents()
    this.students$.subscribe( () => {
      this.preloader = false;
    }, (err) => {
      this.errorMessage = err.message
    })
  }

  deleteStudent( id:number ):void {
    this.studentService.deleteStudent(id)
      .then( () => this.getAllStudents())
      .catch( (err:Error) => this.errorMessage = err.message)
      .finally( () => this.preloader = false)
  }

}
