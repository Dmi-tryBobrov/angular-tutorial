import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoadingStateService } from '../services/loading-state.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  private totalRequests = 0;
  private completedRequests = 0;

  constructor(private loadingState: LoadingStateService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.totalRequests++;
    this.loadingState.showSpinner();
    return next.handle(request).pipe(
      finalize(() => {
        
        this.completedRequests++;
        if(this.completedRequests === this.totalRequests){
            this.completedRequests = 0;
            this.totalRequests = 0;
            this.loadingState.hideSpinner();
        }
        
      })
    );  
  }
}
