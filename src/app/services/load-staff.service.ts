import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, switchMap } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { IStaff } from '../staff-interface';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class LoadStaffService {

  // private urlToDb = 'api/staff';
  private urlToGetStaff = 'https://angular-staff-start-default-rtdb.europe-west1.firebasedatabase.app/staff.json';
  private urlToStaff = 'https://angular-staff-start-default-rtdb.europe-west1.firebasedatabase.app/staff';
  private httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'})};

  constructor(private http: HttpClient,
              private messageService: MessageService,
              private authService: AuthService) { }

  private log(message: string): void{
    this.messageService.add(`LoadStaffService: ${message}`);
  }

  private onError<T>(message = 'operation', output?: T){
    return (error: any): Observable<T> => {

      console.error(error);

      this.log(`${message}: ${error.message}`);

      return of(output as T);
    }
  }

  getStaff(): Observable<IStaff[]>{
    return this.http.get<IStaff[]>(this.urlToGetStaff).
    pipe(catchError(this.onError<IStaff[]>("Staff loading failed", [])));
  }

  getStaffCardById(id: number): Observable<IStaff>{
    const url = `${this.urlToGetStaff}/?orderBy="id"&equalTo=${id}`;
    return this.http.get<IStaff[]>(url).
    pipe(map(staff => Object.values(staff)[0]),
    catchError(this.onError<IStaff>('Loading failed')));
  }

  updateStaff(employee: IStaff): Observable<any>{
    const url = `${this.urlToGetStaff}/?orderBy="id"&equalTo=${employee.id}`;
    return this.http.get<IStaff[]>(url).
    pipe(map(staff => Object.keys(staff)[0]),
    switchMap((pos: string) =>
    this.http.put(`${this.urlToStaff}/${pos}.json?auth=${this.authService.getIdToken()}`,
    employee, this.httpOptions)),
    catchError(this.onError<any>('Delete failed')));
  }

  deleteStaffCardById(id: number): Observable<any>{
    const url = `${this.urlToGetStaff}/?orderBy="id"&equalTo=${id}`;
    return this.http.get<IStaff[]>(url).
    pipe(map(staff => Object.keys(staff)[0]),
    switchMap((pos: string) => 
    this.http.delete(`${this.urlToStaff}/${pos}.json?auth=${this.authService.getIdToken()}`)),
    catchError(this.onError<any>('Delete failed')));
  }

  searchStaff(searchString: string): Observable<IStaff[]>{
    const query = searchString.trim();
    if(!query)
      return of([]);
    
    const db_query = `?orderBy="name"&startAt="${query}"`
    const url = `${this.urlToGetStaff}${db_query}`;
    return this.http.get<IStaff[]>(url).
      pipe(map(staff => Object.values(staff)),
      catchError(this.onError<IStaff[]>('Search failed')))
  }

  addNewStaffCard(employee: Partial<IStaff>): Observable<IStaff>{
    let id: number;
    let pos: string;
    return this.http.get<IStaff[]>(this.urlToGetStaff).pipe(
      tap(staff => {
          let flag = true;
          if(!staff || staff.length === 0){
            id = 11; //minimal id value
            pos = '0';
          }
          else{
            for (let i = 0; i < staff.length; i++){
              if(!staff[i]){
                id = staff[i-1].id + 1;
                pos = Object.keys(staff)[i];
                flag = false;
                break;
              }
            }
            if(flag){
              id = staff.length + 11;
              pos = staff.length.toString();
            }
            
        }
        employee.id = id;
        return staff;
      }),
      switchMap((staff: IStaff[]) => 
      this.http.put<IStaff>(`${this.urlToStaff}/${pos}.json?auth=${this.authService.getIdToken()}`,
      employee, this.httpOptions).
      pipe(tap((newEmpl: IStaff) => this.log(`Posted to the server with id=${newEmpl.id}`)),
      catchError(this.onError<IStaff>('Failed to add new employee')))));
  }
}
