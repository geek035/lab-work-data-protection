import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DecoderService {

  constructor() { }

  public getName(token: string): string {
    const payload = this.decodeToken(token);
    return payload.Username;
  }

  private decodeToken(token: string): any {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }
}
