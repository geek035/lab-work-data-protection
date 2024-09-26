import { Observable } from "rxjs";
import { UserDataToUpdate } from "../models/user-data-to-update.model"
import { UserData } from "../models/user-data.model";
import { InjectionToken } from "@angular/core";
import { changePasswordRequest } from "../models/change-password-request";

export const USER_DATA_UPDATE_STRATEGY = new InjectionToken<IUserUpdateDataService>('User data strategy implementing');

export interface IUserUpdateDataService {
    updateData(data: UserDataToUpdate): Observable<UserData | Error>;
    addUser(data: UserDataToUpdate): Observable<UserData | Error>;
    changePassword(data: changePasswordRequest, oldPassword: string | undefined): Observable<UserData | Error>;
    updateAllUsers(data: UserData[]): Observable<string | Error>;
}