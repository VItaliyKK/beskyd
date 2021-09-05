import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IStudent } from 'src/app/shared/interfaces/student.interface';
import { StudentService } from 'src/app/shared/services/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  id:number
  preloader:boolean = false
  errorMessage:string = ''
  student:IStudent

  constructor( 
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
    ) { 
      this.id = this.route.snapshot.params['id']
    }

  ngOnInit(): void {
    this.studentService.getStudent(this.id).toPromise()
      .then( data => {
        this.student = data
      })
  }

  deleteStudent():void{
    this.preloader = true
    this.studentService.deleteStudent(this.id)
      .then( () => this.router.navigateByUrl(`/student/list`))
      .catch( (err:Error) => {
        this.errorMessage = err.message
        this.preloader = false
      })
  }
}
