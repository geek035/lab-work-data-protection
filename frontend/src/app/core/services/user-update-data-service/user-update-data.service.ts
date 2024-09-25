import { Inject, Injectable } from '@angular/core';
import { IUserUpdateDataService } from '../../../interfaces/user-update-data.interface';
import { DATA_REQUEST_STRATEGY } from '../../../interfaces/user-data-request.interface';
import { UserDataRequestService } from '../server-services/user-data-request.service';
import { UserDataToUpdate } from '../../../models/user-data-to-update.model';
import { exhaustMap, Observable, of, throwError } from 'rxjs';
import { UserData } from '../../../models/user-data.model';

@Injectable({
  providedIn: 'root',
})
export class UserUpdateDataService implements IUserUpdateDataService {
  constructor(
    @Inject(DATA_REQUEST_STRATEGY)
    private readonly userDataRequestService: UserDataRequestService
  ) {}

  updateData(data: UserDataToUpdate, oldPassword: string | undefined): Observable<UserData | Error> {
    if (data.password !== undefined && oldPassword !== undefined) {
      return this.userDataRequestService
        .checkPassword(data.username, oldPassword)
        .pipe(
          exhaustMap((response) => {
            if (response == false) {
              return throwError(() => new Error('Неверный пароль'));
            }

            return this.userDataRequestService.updateUserData(data);
          })
        );
    }

    if (data.password !== undefined) {
      return throwError(() => Error('Необходимы старый пароль'));
    }

    return this.userDataRequestService.updateUserData(data);
  }

  addUser(data: UserDataToUpdate): Observable<UserData | Error> {
    return this.userDataRequestService.addUserData(data.username);
  }
}
