import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DecoderService {

  constructor() { }

  public compareUsernames(username: string, token: string): boolean {
    const payload = this.decodeToken(token);
    return payload.sub == username;
  }

  private decodeToken(token: string): any {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }
}
