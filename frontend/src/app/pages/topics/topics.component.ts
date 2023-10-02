
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Topic } from 'src/app/interfaces/interface';
import { TopicService } from 'src/app/services/topic.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {

  mostrarModal = false; // Controla la visibilidad del modal

  topics: Topic[] = [];


  menuAbierto: boolean[] = [];
  menuActualmenteAbierto: number = -1; // Inicialmente, ningún menú estará abierto.


  // Llamo a mi interface
  changeStatus: Topic = {
    id: 0,
    title: '',
    message: '',
    solved: false,
    created_at: '', // El backend lo genera automaticamente.
    user: {
      id: 0,
      username: '',
    },
    course: {
      id: 0,
      name: '',
    }
  };



  // Agrego una propiedad para almacenar el ID del usuario.
  userId: number | null = null;

  constructor(private topicService: TopicService,
    private datePipe: DatePipe,
    private usersService: UsersService,
    private router: Router) { }

  ngOnInit(): void {
    // Llama al servicio para obtener los topicos y asigna los datos a la propiedad 'topics'
    this.topicService.getTopics().subscribe(
      (data: Topic[]) => { // Especifico el tipo de datos como Topic[].
        this.topics = data;
        // Formateo las fechas antes de mostrarlas en la vista
        this.topics.forEach(topic => {
          if (topic.created_at !== null) {
            topic.created_at = this.datePipe.transform(topic.created_at, 'yyyy-MM-dd HH:mm:ss') ?? ''; // Asigno una cadena vacía si es null
          } else {
            topic.created_at = ''; // Si created_at es null, asigno una cadena vacía.
          }
        });

        console.log(this.topics);
      },
      (error) => {
        console.error('Error al obtener los temas:', error);
      }
    );

    // Obtener el ID del usuario una vez al iniciar el componente.
    this.usersService.getCurrentUserId().subscribe((userId: number | null) => {
      this.userId = userId;
    });



    // Inicializo el arreglo con valores falsos para indicar que todos los menús están cerrados
    this.topics.forEach(() => this.menuAbierto.push(false));
  }


  // Verifica si el usuario actual coincide con el autor del topico.
  isCurrentUserAuthor(topic: Topic): boolean {
    return this.userId !== null && topic.user.id === this.userId;
  }


  markTopicAsSolved(topic: Topic): void {
    // Aqui se cambia el estado del topico a "resuelto" (true) en la interfaz de usuario.
    topic.solved = true;

    // Verifico si el ID del usuario está disponible.
    if (this.userId !== null) {
      // Asigno el ID del usuario al newTopic.
      this.changeStatus.user.id = this.userId;

      // Envio la actualización al backend
      this.topicService.changeStatus(topic.id).subscribe(
        (data: Topic) => {
          console.log('Tema marcado como resuelto:', data);
          // Aquí se puede realizar alguna acción adicional si es necesario.
        },
        (error) => {
          console.error('Error al marcar el tema como resuelto:', error);
          // Me aseguro de revertir el estado en caso de algún error.
          topic.solved = false;
        }
      );
    } else {
      console.error('No se pudo obtener el ID del usuario.');
    }
  }



  abrirCerrarMenu(index: number): void {
    if (this.menuActualmenteAbierto === index) {
      // Si el menú actualmente abierto es el mismo que se hizo clic, se cerrara.
      this.menuAbierto[index] = false;
      this.menuActualmenteAbierto = -1; // Ningún menú estára abierto.
    } else {
      // Si se hace clic en un menú diferente, se cerrara el menú actualmente abierto (si hay alguno).
      if (this.menuActualmenteAbierto !== -1) {
        this.menuAbierto[this.menuActualmenteAbierto] = false;
      }
      // Se abre el menú seleccionado.
      this.menuAbierto[index] = true;
      this.menuActualmenteAbierto = index;
    }
  }

  editarTopico(): void { }




  eliminarTopico(topicId: number, index: number): void {
    if (topicId) {
      // Llama al servicio para eliminar el topico por su ID.
      this.topicService.deleteTopic(topicId).subscribe(
        () => {
          console.log('Tema eliminado exitosamente.');
          // Cierro el menú vertical despues de eliminar el topico.
          this.menuAbierto[index] = false;
          this.menuActualmenteAbierto = -1;
          // Actualizo la lista de temas después de la eliminación de un topico.
          this.topics = this.topics.filter(topic => topic.id !== topicId);
        },
        (error) => {
          console.error('Error al eliminar el tema:', error);
          // Aqui puedo manejar los errores.
        }
      );
    } else {
      console.error('ID del tema no válido.');
    }
  }


  navigateToAnswer(topic: Topic): void {
    // Formateo el título del tópico para que sea seguro utilizarlo en la URL.
    const formattedTitle = topic.title
      .toLowerCase() // Convierte el título a minúsculas.
      .replace(/ /g, '-') // Reemplaza espacios con guiones.
      .replace(/[^a-z0-9-]/g, ''); // Elimina caracteres no deseados.

    // Ir a la página de respuestas(answer) con el título y el ID del tópico
    this.router.navigate(['/answers', formattedTitle, topic.id,]);
  }



}
