import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
  private apiKey = 'AIzaSyB4uo7W7e7eBH3vciIF551W97BC8M4d8U4';
  private urlToAuth = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`;
  private idToken = '';

  constructor(
    private http: HttpClient
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
    .pipe(tap((obj) => console.log(obj)),
          catchError(this.onError<SignInEmailPassResponce>('Auth failed'))
    );
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
