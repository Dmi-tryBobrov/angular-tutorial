import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomPreloadingStrategyService implements PreloadingStrategy {

  constructor() { }

  preload(route: Route, fn: () => Observable<any>): Observable<any> {

    if(route.path !== null && route.data?.['preload']){
      //QA purpose
      console.log('Preloaded: ' + route.path);
      
      return fn();
    }
    else{
      return of(null);
    }
  }
}
