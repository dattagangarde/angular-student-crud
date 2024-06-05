import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../student.service';
import { Student } from '../student.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  private subscriptions: Subscription[] = [];

  constructor(private studentService: StudentService, private router: Router) { }

  ngOnInit(): void {
    const subscriptionStudent = this.studentService.getStudents().subscribe(students => this.students = students);
    this.subscriptions.push(subscriptionStudent);

  }

  editStudent(student: Student) {   
    this.router.navigate(['/edit', student.id]);
  }

  deleteStudent(id: number) {
    this.studentService.deleteStudent(id);
    const subscriptionStudent = this.studentService.getStudents().subscribe(students => this.students = students);
    this.subscriptions.push(subscriptionStudent);
  }

  viewStudentDetails(id: string) {
    this.router.navigate(['/details', id]);
  }

  navigateToAdd() {
    this.router.navigate(['/add']);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
