import { Injectable } from '@angular/core';
import { ConfigService } from '../config-service/config.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, exhaustMap, Observable, of, throwError } from 'rxjs';
import { IUserDataRequestService } from '../../../interfaces/user-data-request.interface';
import { UserData } from '../../../models/user-data.model';

@Injectable({
  providedIn: 'root'
})
export class UserDataRequestService implements IUserDataRequestService {

  constructor(
    private readonly serverConfig: ConfigService,
    private readonly http: HttpClient) { }

  getUserData(): Observable<UserData[] | HttpErrorResponse> {
    const serverURL = this.serverConfig.getServerUrl();
    
    return this.http.get<UserData[]>(`${serverURL}/api/users`).pipe(
      exhaustMap(response => {
          return of(response);
        }),
      catchError(error => {
        return throwError(() => error);
      })) as Observable<UserData[] | HttpErrorResponse>;
  }
}
