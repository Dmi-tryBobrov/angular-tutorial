import { ApplicationRef, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
  private apiKey = 'AIzaSyB4uo7W7e7eBH3vciIF551W97BC8M4d8U4';
  private urlToAuth = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`;
  private idToken = '';
  private timerExpireId?: ReturnType<typeof setTimeout>;
  //redirect after successful log in to guarded url
  public redirectUrl: string | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private appRef: ApplicationRef
  ) { }

  private onError<T>(message = 'operation', output?: T){
    return (error: any): Observable<T> => {

      console.error(error);

      console.log(`${message}: ${error.message}`);

      return of(output as T);
    }
  }
  
  authWithEmailPassword(email: string, password: string): Observable<SignInEmailPassResponce> {
    let body = JSON.stringify({
      email, password, returnSecureToken: true
    });

    return this.http.post<SignInEmailPassResponce>(this.urlToAuth, body, this.httpOptions)
    .pipe(tap((obj) => {
      console.log(obj),
      this.setExpireTimer(obj.expiresIn)
    }),
    catchError(this.onError<SignInEmailPassResponce>('Auth failed'))
    );
  }

  private setExpireTimer(sec: string): void {
    this.timerExpireId = setTimeout(
      this.resetIdToken.bind(this), +sec*1000);
  }

  private resetIdToken(): void {
    this.idToken = '';
    this.appRef.tick();
  }

  storeIdToken(res: SignInEmailPassResponce): void {
    this.idToken = res.idToken;
  }

  getIdToken(): string {
    return this.idToken;
  }

  isLoggedIn(): boolean {
    if(this.idToken)
      return true;
    return false;
  }

  logOut(): void {
    this.idToken = '';
    if(this.timerExpireId)
      clearTimeout(this.timerExpireId);
  }

  redirectToGuardedRoute(): void{
    if(!this.redirectUrl) {return;}
    console.warn(this.redirectUrl);
    this.router.navigate([this.redirectUrl]);
    this.redirectUrl = null;
  }

}

interface SignInEmailPassResponce {
  idToken:	string;
  email:	string;
  refreshToken:	string;	
  expiresIn:	string;
  localId:	string;	
  registered:	boolean;
}
