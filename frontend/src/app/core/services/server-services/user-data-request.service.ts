import { Injectable } from '@angular/core';
import { ConfigService } from '../config-service/config.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, exhaustMap, Observable, of, throwError } from 'rxjs';
import { IUserDataRequestService } from '../../../interfaces/user-data-request.interface';
import { UserData } from '../../../models/user-data.model';
import { UserDataToUpdate } from '../../../models/user-data-to-update.model';
import { changePasswordRequest } from '../../../models/change-password-request';

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

  changePassword(data: changePasswordRequest): Observable<UserData | Error> {
    const serverURL = this.serverConfig.getServerUrl();
    return this.http.post<UserData>(`${serverURL}/api/users/update-password`, {
      username: data.username,
      password: data.password,
    }).pipe(exhaustMap(response => of(response)));
  }

  updateAllUsers(usersData: UserData[]): Observable<string | Error> {
    const serverURL = this.serverConfig.getServerUrl();
    const data = usersData.map((val) => {
      return {
        username: val.username,
        IsAdminLocked: val.IsAdminLocked ?? false,
        IsPasswordRestricted: val.IsPasswordRestricted ?? false,
      }
    });
    
    return this.http.post(`${serverURL}/api/users/update-users`, data)
      .pipe(exhaustMap((responce) => of(responce))) as Observable<string | Error>
  }

  updateUserData(data: UserDataToUpdate): Observable<UserData | HttpErrorResponse> {
      
    const serverURL = this.serverConfig.getServerUrl();
    return this.http.post<UserData>(`${serverURL}/api/users/update`, {
      username: data.username,
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
      new UserDataToUpdate(username, undefined, undefined))
      .pipe(exhaustMap(response => of(response)));
  }
}
