import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Student } from './student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private readonly localStorageKey = 'students';

  constructor() {}

  private getStudentsFromLocalStorage(): Student[] {
    const studentsString = localStorage.getItem(this.localStorageKey);
    return studentsString ? JSON.parse(studentsString) : [];
  }

  private setStudentsToLocalStorage(students: Student[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(students));
  }

  getStudents(): Observable<Student[]> {
    return of(this.getStudentsFromLocalStorage());
  }

  getStudentById(id: number): Observable<Student | null> {
    return this.getStudents().pipe(
      map(students => students.find(student => student.id === id) || null)
    );
  }

  addStudent(student: Student): void {
    const students = this.getStudentsFromLocalStorage();
    students.push(student);
    this.setStudentsToLocalStorage(students);
  }

  updateStudent(student: Student): void {
    const students = this.getStudentsFromLocalStorage();
    const index = students.findIndex(s => s.id === student.id);
    if (index !== -1) {
      students[index] = student;
      this.setStudentsToLocalStorage(students);
    }
  }

  deleteStudent(id: number): void {
    let students = this.getStudentsFromLocalStorage();
    students = students.filter(student => student.id !== id);
    this.setStudentsToLocalStorage(students);
  }
}
