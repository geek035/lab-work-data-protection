import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUserPanelState } from '../../../../../interfaces/user-panel-state.interface';

@Injectable({
  providedIn: 'root'
})
export class UserPanelStateService {

  constructor() { }

  private $stateSubject = new BehaviorSubject<IUserPanelState>({} as IUserPanelState);
  public state$ = this.$stateSubject.asObservable();

  setState(data: IUserPanelState): void {
    this.$stateSubject.next(data);
  }
}
