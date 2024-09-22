import { InjectionToken } from "@angular/core";
import { UserData } from "../models/user-data.model";
import { Observable } from "rxjs";

export const DATA_REQUEST_STRATEGY = 
    new InjectionToken<IUserDataRequestService>('Data request strategy implementing')

export interface IUserDataRequestService {
    getUserData(username: string, password: string): Observable<UserData>
}