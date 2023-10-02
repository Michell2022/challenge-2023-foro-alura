import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Topic } from 'src/app/interfaces/interface';
import { InterfaceCourse } from 'src/app/interfaces/interface-course';
import { NewTopic } from 'src/app/interfaces/newtopic';
import { CourseService } from 'src/app/services/course.service';
import { TopicService } from 'src/app/services/topic.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-registertopics',
  templateUrl: './registertopics.component.html',
  styleUrls: ['./registertopics.component.css']
})
export class RegistertopicsComponent implements OnInit {

  topics: any[] = [];

  @Output() modalClosed = new EventEmitter<void>();

  // Llamo a mi interface.
  newTopic: NewTopic = {
    title: '',
    message: '',
    solved: false,
    created_at: '', // El backend lo genera automaticamente.
    user: {
      id: 0,
    },
    course: {
      id: 0,
    }
  };

  courses: InterfaceCourse[] = [];

  // Agrego la propiedad selectedCourseId.
  selectedCourseId: number = 0;

  // Agrego una propiedad para almacenar el ID del usuario.
  userId: number | null = null;

  constructor(private topicService: TopicService, private courseService: CourseService, private usersService: UsersService) { }


  ngOnInit(): void {
    this.courseService.getCourses().subscribe(
      (data: InterfaceCourse[]) => {
        // Muestra la respuesta en la consola del nuevo topico registrado.
        console.log('Respuesta del servicio getCourses:', data);
        this.courses = data;
      },
      (error) => {
        if (error.status === 403) {
          console.error('No tienes permiso para acceder a la lista de cursos.');
          // Falta personalizar el mensaje de error al usuario.
        } else {
          console.error('Error al obtener la lista de cursos:', error);
          // Muestro un mensaje de error al usuario.
        }
      }
    );



    // Obtengo el ID del usuario al iniciar sesión.
    this.usersService.getCurrentUserId().subscribe((userId: number | null) => {
      this.userId = userId;
    });
  }


  closeCreateTopicModal() {
    // Cierro el modal
    this.modalClosed.emit();
  }


  createTopic() {
    // Asigno el ID del curso seleccionado.
    this.newTopic.course.id = this.selectedCourseId;

    // Verifico si el ID del usuario está disponible.
    if (this.userId !== null) {
      // Asigno el ID del usuario al newTopic.
      this.newTopic.user.id = this.userId;

      // Luego, envío el nuevo topico al backend.
      this.topicService.createTopic(this.newTopic).subscribe(
        (data: Topic) => {
          console.log('Nuevo tema creado:', data);

          // Cierro el modal.
          this.closeCreateTopicModal();

          // Recargo la página automáticamente después de registrar un nuevo tópico.
          window.location.reload();
        },
        (error) => {
          console.error('Error al crear el nuevo tema:', error);
          if (error.error && Array.isArray(error.error)) {
            console.error('Detalles del error:', error.error);
          }
        }
      );
    } else {
      console.error('No se pudo obtener el ID del usuario.');
    }
  }

}
