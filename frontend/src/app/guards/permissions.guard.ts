import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, combineLatest, map } from 'rxjs';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate {
  constructor(private authService: UsersService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return combineLatest([
      this.authService.isAuthenticatedWithCookie(),
      this.authService.getTokenExpired() // Obtengo la propiedad tokenExpired a través del método público.
    ]).pipe(
      map(([isLoggedIn, isTokenExpired]) => {
        if (isLoggedIn && !isTokenExpired) {
          return true; // Permito el acceso si el usuario está autenticado y el token no ha expirado.
        } else {
          if (isTokenExpired) {
            this.router.navigate(['/login'], {
              queryParams: { expired: 'true' } // Agrega un parámetro para indicar la expiración del token.
            });
          } else {
            this.router.navigate(['/login']);
          }
          return false;
        }
      })
    );
  }


//   export class AuthGuard implements CanActivate {
//     constructor(private authService: UsersService, private router: Router) {}
  
//     canActivate(): Observable<boolean> {
//       return this.authService.isAuthenticatedWithCookie().pipe(
//         map((isLoggedIn) => {
//           if (isLoggedIn) {
//             return true; // Permito el acceso si el usuario esta autenticado.
//           } else {
//             this.router.navigate(['/login']); // Redirige a /login si no esta autenticado.
//             return false;
//           }
//         })
//       );
//     }

  
}

