import { Injectable } from '@angular/core';
import { ConfigService } from '../config-service/config.service';
import { HttpClient } from '@angular/common/http';
import { exhaustMap, Observable } from 'rxjs';
import { IUserDataRequestService } from '../../../interfaces/user-data-request.interface';
import { UserData } from '../../../models/user-data.model';

@Injectable({
  providedIn: 'root'
})
export class UserDataRequestService implements IUserDataRequestService {

  constructor(
    private readonly serverConfig: ConfigService,
    private readonly http: HttpClient) { }

  getUserData(username: string, password: string): Observable<UserData> {
    const serverURL = this.serverConfig.getServerUrl();
    const payload = {
      username: username,
      password: password == null ? "" : password,
    }
    
    return this.http.post<UserData>(`${serverURL}/api/users/login`, payload)
      .pipe(exhaustMap(response => {
          return new Observable<UserData>(observer => {
            observer.next(response as UserData);
            observer.complete();
          })
        }));

  }
}
