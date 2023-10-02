import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Topic } from 'src/app/interfaces/interface';
import { TopicService } from 'src/app/services/topic.service';
import { parseISO } from 'date-fns';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit {

  formattedDate: string = '';


  // Llamo a mi interface
  topic: Topic = {
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


  constructor(private route: ActivatedRoute,
    private topicService: TopicService) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const topicId = +params['topicId'];
      console.log(topicId);

      // Llama al servicio para obtener los datos del tópico por su ID
      this.topicService.getTopic(topicId).subscribe(
        (data: Topic) => {
          this.topic = data;

          // Formatea la fecha aquí y lo entrega a created_at.
          this.formattedDate = this.formatDate(data.created_at);

        },
        (error) => {
          console.error('Error al obtener el tópico:', error);
        }
      );
    });
  }


  private formatDate(isoDate: string): string {
    const date = parseISO(isoDate); // Convierte la fecha ISO a objeto de fecha
    const now = new Date();

    // Calculo la diferencia en milisegundos
    const diffMilliseconds = now.getTime() - date.getTime();

    // Calculo las diferencias en minutos, horas, días y años
    const diffMinutes = Math.floor(diffMilliseconds / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffMonths / 12);

    let formattedTime = '';

    // Defino las condiciones para determinar el formato de tiempo
    if (diffMinutes < 1) {
      formattedTime = 'hace menos de 1 minuto';
    } else if (diffMinutes < 60) {
      formattedTime = `hace ${diffMinutes} minutos`;
    } else if (diffHours < 24) {
      formattedTime = `hace ${diffHours} horas`;
    } else if (diffDays < 7) {
      formattedTime = `hace ${diffDays} días`;
    } else if (diffMonths < 1) {
      formattedTime = `hace ${Math.floor(diffDays / 7)} semanas`;
    } else if (diffYears < 1) {
      formattedTime = `hace ${diffMonths} meses`;
    } else {
      formattedTime = `hace ${diffYears} años`;
    }

    const formattedDate = date.toLocaleDateString('es', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });

    return `Publicado ${formattedTime}, el ${formattedDate}`;
  }

}
