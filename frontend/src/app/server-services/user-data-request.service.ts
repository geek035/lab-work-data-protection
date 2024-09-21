import { Injectable } from '@angular/core';
import { ConfigService } from '../config-service/config.service';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { IUserDataAPI } from './user.data';

@Injectable({
  providedIn: 'root'
})
export class UserDataRequestService {
  #serverURL: string | undefined;

  constructor(
    private readonly serverConfig: ConfigService,
    private readonly http: HttpClient) { }

  getUserData(username: string, password: string): Observable<IUserDataAPI> {
    return this.serverConfig.getServerUrl()
      .pipe(
        switchMap(config => {
          this.#serverURL = config.serverURL;

          return this.http
            .get(`${this.#serverURL}/users/${username}`) as Observable<IUserDataAPI>;
      })
    );
  }
}
