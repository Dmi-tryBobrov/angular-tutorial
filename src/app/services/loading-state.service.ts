import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingStateService {

  private loadState = new BehaviorSubject<boolean>(false);
  public loadState$ = this.loadState.asObservable();

  constructor() { }

  showSpinner() {
    this.loadState.next(true);
  }

  hideSpinner() {
    this.loadState.next(false);
  }
}
