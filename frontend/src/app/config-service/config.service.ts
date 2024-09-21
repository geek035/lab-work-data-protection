import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IConfig } from './config.data';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  #configUrl = '../../assets/config.json'; 

  constructor(
    private readonly http: HttpClient,
  ) { }

  getServerUrl(): Observable<IConfig> {
    return this.http.get(this.#configUrl) as Observable<IConfig>;
  }
}
