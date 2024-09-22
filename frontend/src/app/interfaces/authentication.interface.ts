import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { LoginResponse } from "../models/login-response";

export const AUTHENTICATION_STRATEGY = 
    new InjectionToken<IAuthenticationService>('Authentication strategy implementation');

export interface IAuthenticationService {
    authenticate(username: string, password: string): Observable<LoginResponse | HttpErrorResponse>;
    isLoggedIn(): boolean;
    logout(): void;
}