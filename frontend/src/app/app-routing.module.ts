import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './guards/permissions.guard';
import { TopicsComponent } from './pages/topics/topics.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { NotAuthGuard } from './guards/notguard.guard';
import { AnswersComponent } from './pages/answers/answers.component';
import { MyAnswersComponent } from './pages/my-answers/my-answers.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [NotAuthGuard] },

  { path: 'courses', component: CoursesComponent, canActivate: [AuthGuard] },
  { path: 'topics', component: TopicsComponent, canActivate: [AuthGuard] },
  { path: 'my-answers', component: MyAnswersComponent, canActivate: [AuthGuard] },
  { path: 'answers/:titulo/:topicId', component: AnswersComponent, canActivate: [AuthGuard]  },

  { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [NotAuthGuard] },

  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
