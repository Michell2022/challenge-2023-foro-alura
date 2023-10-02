import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  expiredMessageVisible = false;

  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService) { }


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });


    this.route.queryParams.subscribe(params => {
      if (params['expired'] === 'true') {
        this.expiredMessageVisible = true;
      }
    });
  }


  onLogin() {
    if (this.loginForm.invalid) {
      // Si el formulario es inválido, Falta personalizar un mensaje de error o realizar alguna acción.
      return;
    }
    const { username, password } = this.loginForm.value;

    this.usersService.login(username, password).subscribe(
      (response: any) => {

        // Utilizo CookieService para almacenar el token en una cookie.
        this.cookieService.set('authToken', response.token);

        this.loginForm.reset();
        // Redirige al usuario a la página topics si inicio sesión correctamente.
        this.router.navigate(['/topics']);
      },
      (error: any) => {
        console.error('La dirección de correo electrónico no está registrada');
      }
    );
  }

}
