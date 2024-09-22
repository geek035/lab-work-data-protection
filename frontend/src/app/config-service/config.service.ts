import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  #serverURL = "http://localhost:5000";
  constructor() { }

  getServerUrl(): string {
    return this.#serverURL;
  }
}
