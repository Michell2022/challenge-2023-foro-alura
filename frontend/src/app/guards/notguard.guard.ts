import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})


export class NotAuthGuard implements CanActivate {
  constructor(private authService: UsersService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticatedWithCookie().pipe(
      map((isLoggedIn) => {
        if (!isLoggedIn) {
          return true; // No permite el acceso si el usuario no esta autenticado.
        } else {
          this.router.navigate(['/topics']); // Redirige a /topics si el usuario esta autenticado.
          return false;
        }
      })
    );
  }
}








// export class NotguardGuard implements CanActivate {
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     return true;
//   }
  
// }
