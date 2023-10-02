import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'http://localhost:8080/auth';

  //1.1 ESTO ES PARTE DE NUESTRO guards -> permissions.guard.ts
  private readonly isLoggedIn = new BehaviorSubject<boolean>(false);

  private readonly currentUsername = new BehaviorSubject<string | null>(null);
  private readonly currentUserId = new BehaviorSubject<number | null>(null);

  private tokenExpired = new BehaviorSubject<boolean>(false);


  constructor(private http: HttpClient, private cookieService: CookieService) {

    // Verificar la existencia de la cookie de token en el constructor
    const authToken = this.cookieService.get('authToken');
    if (authToken) {
      // Actualizar el estado de autenticación y el nombre de usuario si la cookie de token existe.
      this.isLoggedIn.next(true);
      this.setCurrentUsernameFromToken(authToken);
    }

  }


  login(username: string, password: string): Observable<boolean> {
    return this.http.post(`${this.apiUrl}/login`, { username, password }).pipe(
      // Maneja la respuesta del inicio de sesión
      tap((response: any) => {
        if (response.token) {

          // Almacena el token en una cookie con expiración.
          this.cookieService.set('authToken', response.token, { expires: 1 / 24 }); //Token vence en 1 hora = 1/24 días
          // Decodifica el token JWT para obtener el nombre de usuario
          this.setCurrentUsernameFromToken(response.token);

          this.isLoggedIn.next(true);
        }
      })
    );
  }


  signup(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, user);
  }


  logout(): void {
    // Elimina las cookies relacionadas con la autenticación
    this.cookieService.delete('authToken');
    this.cookieService.delete('currentUsername');
    // Actualiza el estado de autenticación y el nombre de usuario
    this.isLoggedIn.next(false);
    this.currentUsername.next(null);
  }


  //1.1 ESTO ES PARTE DE NUESTRO guards -> permissions.guard.ts
  isAuthenticatedWithCookie(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }


  getCurrentUsername(): Observable<string | null> {
    return this.currentUsername.asObservable();
  }


  private setCurrentUsernameFromToken(token: string): void {
    // Aqui decodificamos el token JWT para obtener el nombre de usuario
    const tokenParts = token.split('.');
    if (tokenParts.length === 3) {
      const payload = JSON.parse(atob(tokenParts[1]));
      if (payload && payload.sub) {
        this.currentUsername.next(payload.sub);
        this.currentUserId.next(payload.id);
      }
    }
  }


  getToken(): string {
    return this.cookieService.get('authToken');
  }


  //OBTENEMOS EL ID
  getCurrentUserId(): Observable<number | null> {
    return this.currentUserId.asObservable();
  }


  // VERIFICAMOS SI EL TOKEN HA EXPIRADO.
  checkTokenExpiration(): void {
    const authToken = this.getToken();
    if (authToken) {
      const tokenParts = authToken.split('.');
      if (tokenParts.length === 3) {
        const payload = JSON.parse(atob(tokenParts[1]));
        const expirationTime = payload.exp * 1000; // Expresado en milisegundos
        const currentTime = Date.now();

        if (expirationTime <= currentTime) {
          // El token ha expirado
          this.tokenExpired.next(true);
          this.logout(); // Puedes realizar la acción de cierre de sesión aquí si lo deseas
        } else {
          this.tokenExpired.next(false);
        }
      }
    }
  }

    // Pongo el metodo getTokenExpire en público.
    getTokenExpired(): Observable<boolean> {
      return this.tokenExpired.asObservable();
    }

}
