import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CoursesComponent } from './pages/courses/courses.component';
import { AnswersComponent } from './pages/answers/answers.component';
import { CookieService } from 'ngx-cookie-service';
import { RegistertopicsComponent } from './components/registertopics/registertopics.component';
import { DatePipe } from '@angular/common';
import { TopicsComponent } from './pages/topics/topics.component';
import { MyAnswersComponent } from './pages/my-answers/my-answers.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    TopicsComponent,
    CoursesComponent,
    AnswersComponent,
    RegistertopicsComponent,
    MyAnswersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    CookieService,   // Agrega CookieService como proveedor
    DatePipe, // Agrega DatePipe como proveedor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
