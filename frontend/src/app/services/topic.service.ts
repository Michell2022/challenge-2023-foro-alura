import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';
import { Topic } from '../interfaces/interface';
import { NewTopic } from '../interfaces/newtopic';


@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private apiUrl = 'http://localhost:8080/topics';

  constructor(private http: HttpClient, private usersService: UsersService) { }

  // Función para obtener las cabeceras con el token.
  private getHeaders() {
    const authToken = this.usersService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
    return { headers: headers };
  }


  // LISTAR TODO LOS TOPICOS.
  getTopics(): Observable<Topic[]> {
    const headers = this.getHeaders();
    return this.http.get<Topic[]>(`${this.apiUrl}`, headers);
  }

  // CREAR NUEVO TOPICO.
  createTopic(newTopic: NewTopic): Observable<Topic> {
    const headers = this.getHeaders();
    return this.http.post<Topic>(`${this.apiUrl}`, newTopic, headers);
  }


  // Cambiar el estado del tema a "resuelto" (true).
  changeStatus(topicId: number): Observable<Topic> {
    const headers = this.getHeaders();
    return this.http.patch<Topic>(`${this.apiUrl}/${topicId}`, null, headers);
  }


  // ELIMINAR TOPICO POR ID.
  deleteTopic(topicIdToDelete: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${topicIdToDelete}`, headers);
  }

  // OBTENER UN TOPICO POR ID.
  getTopic(id: number): Observable<Topic> {
    const headers = this.getHeaders();
    return this.http.get<Topic>(`${this.apiUrl}/${id}`, headers);
  }

}
