import { InjectionToken } from "@angular/core";
import { UserData } from "../models/user-data.model";
import { Observable } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { UserDataToUpdate } from "../models/user-data-to-update.model";
import { changePasswordRequest } from "../models/change-password-request";

export const DATA_REQUEST_STRATEGY = 
    new InjectionToken<IUserDataRequestService>('Data request strategy implementing')

export interface IUserDataRequestService {
    getUsersData(): Observable<UserData[] | HttpErrorResponse>
        
    updateUserData(data: UserDataToUpdate): Observable<UserData | HttpErrorResponse>

    addUserData(username: string): Observable<UserData | HttpErrorResponse>

    checkPassword(username: string, password: string): Observable<boolean | HttpErrorResponse>

    changePassword(data: changePasswordRequest): Observable<UserData | Error>;

    updateAllUsers(usersData: UserData[]): Observable<string | Error>;
}