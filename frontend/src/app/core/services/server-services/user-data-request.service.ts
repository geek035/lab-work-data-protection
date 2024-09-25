import { Injectable } from '@angular/core';
import { ConfigService } from '../config-service/config.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, exhaustMap, Observable, of, throwError } from 'rxjs';
import { IUserDataRequestService } from '../../../interfaces/user-data-request.interface';
import { UserData } from '../../../models/user-data.model';
import { UserDataToUpdate } from '../../../models/user-data-to-update.model';

@Injectable({
  providedIn: 'root'
})
export class UserDataRequestService implements IUserDataRequestService {

  constructor(
    private readonly serverConfig: ConfigService,
    private readonly http: HttpClient) { }

  getUsersData(): Observable<UserData[] | HttpErrorResponse> {
    const serverURL = this.serverConfig.getServerUrl();
    
    return this.http.get<UserData[]>(`${serverURL}/api/users`).pipe(
      exhaustMap(response => of(response)));
  }

  updateUserData(data: UserDataToUpdate): Observable<UserData | HttpErrorResponse> {
      
    const serverURL = this.serverConfig.getServerUrl();
    return this.http.post<UserData>(`${serverURL}/api/users/update`, {
      username: data.username,
      password: data.password,
      isAdminLocked: data.isAdminLocked,
      isPasswordRestricted: data.isPasswordRestricted
    }).pipe(exhaustMap(response => of(response)));
  }

  checkPassword(username: string, password: string): Observable<boolean | HttpErrorResponse> {
    const serverURL = this.serverConfig.getServerUrl();

    return this.http.post<boolean>(`${serverURL}/api/users/confirm`,
      {
        username: username,
        password: password
      }
    ).pipe(exhaustMap(response => of(response)));
  }

  addUserData(username: string): Observable<UserData | HttpErrorResponse> {
    const serverUrl = this.serverConfig.getServerUrl();


    return this.http.put<UserData>(`${serverUrl}/api/users/add`, 
      new UserDataToUpdate(username, "", undefined, undefined))
      .pipe(exhaustMap(response => of(response)));
  }
}
