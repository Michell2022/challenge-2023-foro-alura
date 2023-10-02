import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InterfaceCourse } from '../interfaces/interface-course';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiUrl = 'http://localhost:8080/courses';

  constructor(private http: HttpClient, private usersService: UsersService) { }
  
  // Función para obtener las cabeceras con el token
  private getHeaders() {
    const authToken = this.usersService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
    return { headers: headers };
  }

  // Función para obtener la lista de cursos desde el backend.
  getCourses(): Observable<InterfaceCourse[]> {
    const headers = this.getHeaders(); // Obtiene las cabeceras con el token
    return this.http.get<InterfaceCourse[]>(`${this.apiUrl}`, headers);
  }
}
