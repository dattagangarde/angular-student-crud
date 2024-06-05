import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../student.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Student } from '../student.model';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  studentForm: FormGroup;
  editMode = false;
  studentId: number | null = null;
  filteredCourses: Observable<string[]>;
  courses: string[] = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'];
  genders: string[] = ['Male', 'Female', 'Other'];
  student: Student | null = null;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      age: ['', [Validators.required, Validators.min(1), Validators.max(120)]],
      course: ['', Validators.required],
      gender: ['', Validators.required],
      isActive: [false]
    });

    this.filteredCourses = this.studentForm.get('course')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCourses(value))
    );
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.editMode = true;
        this.studentId = id;
       
        this.studentService.getStudentById(id).subscribe((student: Student | null) => {
          this.student = student;
          console.log("det",this.student);
          
        });
        
        if (this.student) {
          console.log("det",this.student);

          this.studentForm.patchValue(this.student);
        }
      }
    });
  }

  private _filterCourses(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.courses.filter(course => course.toLowerCase().includes(filterValue));
  }

  onSubmit() {
    if (this.studentForm.valid) {
      const student: Student = {
        id: this.studentId || Date.now(),
        ...this.studentForm.value
      };

      if (this.editMode) {
        this.studentService.updateStudent(student);
      } else {
        this.studentService.addStudent(student);
      }
      this.router.navigate(['/']);
    }
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}
