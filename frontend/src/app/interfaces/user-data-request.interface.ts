import { InjectionToken } from "@angular/core";
import { UserData } from "../models/user-data.model";
import { Observable } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

export const DATA_REQUEST_STRATEGY = 
    new InjectionToken<IUserDataRequestService>('Data request strategy implementing')

export interface IUserDataRequestService {
    getUserData(): Observable<UserData[] | HttpErrorResponse>
}