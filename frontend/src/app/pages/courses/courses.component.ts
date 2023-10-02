import { Component, OnInit } from '@angular/core';
import { InterfaceCourse } from 'src/app/interfaces/interface-course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: InterfaceCourse[] = [];

  coursesAll: InterfaceCourse = {
    id: 0,
    name: '',
  }

  constructor(private courseService: CourseService) { }



  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(): void {
    this.courseService.getCourses()
      .subscribe(courses => {
        this.courses = courses;
      });
  }
}
