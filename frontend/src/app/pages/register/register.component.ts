import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  registerForm!: FormGroup;

  errorMessage: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router) {}


  ngOnInit(): void {
      this.registerForm = this.formBuilder.group({
        username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[a-zA-Z0-9_]*$/) ]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])/)]]
    
      });
  }
  
  isFormValid(): boolean {
    return this.registerForm.valid;
  }
 

  onRegister(): void {
    if (this.registerForm.invalid) {
      // Si el formulario es inválido, falta mostrar mensaje personalizado de error o realizar alguna acción.
      return;
    }

    const user = this.registerForm.value;

    this.usersService.signup(user).subscribe(
      (response: any) => {

        // Limpio los campos del formulario.
        this.registerForm.reset();

        // Si el registro es exitoso, redirige al usuario a la página home.
        this.router.navigate(['/home'])
      },
      (error: any) => {
        console.error('Error al registrar usuario:', error);
  
        if (error.status === 409) {
          // Si el correo electrónico ya está registrado, muestra un mensaje de error al usuario.
          this.errorMessage = 'El correo electrónico ya está registrado.';
        } else {
          // Se pueden manejar otro aqui si es necesario.
        }
      }
    );
  }

  getUsernameErrorMessage() {
    const usernameControl = this.registerForm.get('username');
  
    if (usernameControl?.hasError('required')) {
      return 'Campo requerido';
    } else if (usernameControl?.hasError('minlength')) {
      return 'El usuario tiene que ser de 3 a 20 dígitos';
    } else if (usernameControl?.hasError('maxlength')) {
      return 'El usuario tiene que ser de 3 a 20 dígitos';
    } else if (usernameControl?.hasError('pattern')) {
      return 'Solo se admiten letras, números y guiones bajos';
    } else {
      return '';
    }
  }

  getErrorMessageEmail() {
    const emailControl = this.registerForm.get('email');
  
    if (emailControl?.hasError('required')) {
      return 'Campo requerido';
    } else if (emailControl?.hasError('email')) {
      return 'Correo electrónico inválido';
    } else {
      return '';
    }
  }

  getErrorMessagePassword() {
    const passwordControl = this.registerForm.get('password');
  
    if (passwordControl?.hasError('required')) {
      return 'Campo requerido';
    } else if (passwordControl?.hasError('minlength') && !passwordControl?.hasError('pattern')) {
      return 'Mínimo 6 caracteres';
    } else if (passwordControl?.hasError('pattern')) {
      return 'Debe contener una letra mayúscula y un número';
    } else {
      return '';
    }
  }

}
