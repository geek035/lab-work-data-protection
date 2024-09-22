import { Injectable } from '@angular/core';
import { IAuthenticationService } from '../../../interfaces/authentication.interface';
import { catchError, exhaustMap, Observable, of, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ConfigService } from '../config-service/config.service';
import { LoginResponse } from '../../../models/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements IAuthenticationService {

  constructor(
    private readonly http: HttpClient,
    private readonly configService: ConfigService
  ) { }

  authenticate(username: string, password: string): Observable<LoginResponse | HttpErrorResponse> {
    const serverURL = this.configService.getServerUrl();
    const payload = {
      username: username,
      password: password || "",
    }
    
    return this.http.post<LoginResponse>(`${serverURL}/api/users/login`, payload).pipe(
      exhaustMap(response => {
          sessionStorage.setItem(`token`, response.token);
          return of(response);
        }),
      catchError(error => {
        return throwError(() => error);
      }));
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }

  logout(): void {
    sessionStorage.removeItem('token');
  }

}
