import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../student.service';
import { Student } from '../student.model';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];

  constructor(private studentService: StudentService, private router: Router) { }

  ngOnInit(): void {
    this.studentService.getStudents().subscribe(students => this.students = students);
  }

  editStudent(student: Student) {
    console.log("test",student);
    
    this.router.navigate(['/edit', student.id]);
  }

  deleteStudent(id: number) {
    this.studentService.deleteStudent(id);
    this.studentService.getStudents().subscribe(students => this.students = students);

  }

  viewStudentDetails(id: string) {
    this.router.navigate(['/details', id]);
  }

  navigateToAdd() {
    this.router.navigate(['/add']);
  }
}
