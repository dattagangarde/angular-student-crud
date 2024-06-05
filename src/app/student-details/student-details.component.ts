import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../student.service';
import { Student } from '../student.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {
  student: Student | null = null;
  private subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private studentService: StudentService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
    const subscription =  this.studentService.getStudentById(id).subscribe((student: Student | null) => {
        this.student = student;        
      });
      this.subscriptions.push(subscription);

    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
