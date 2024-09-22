import { Injectable } from '@angular/core';
import { ConfigService } from '../config-service/config.service';
import { HttpClient } from '@angular/common/http';
import { exhaustMap, Observable, switchMap, throwError } from 'rxjs';
import { IUserDataAPI } from './user.data';

@Injectable({
  providedIn: 'root'
})
export class UserDataRequestService {

  constructor(
    private readonly serverConfig: ConfigService,
    private readonly http: HttpClient) { }

  getUserData(username: string, password: string): Observable<IUserDataAPI> {
    const serverURL = this.serverConfig.getServerUrl();
    const payload = {
      username: username,
      password: password == null ? "" : password,
    }
    
    return this.http.post<IUserDataAPI>(`${serverURL}/api/users/login`, payload)
      .pipe(exhaustMap(response => {
          return new Observable<IUserDataAPI>(observer => {
            observer.next(response as IUserDataAPI);
            observer.complete();
          })
        }));

  }
}
