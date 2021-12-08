import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IStaff } from '../staff-interface';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, switchMap, switchMapTo } from 'rxjs/operators';
import { MonoTypeOperatorFunction } from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class LoadStaffService {

  // private urlToDb = 'api/staff';
  private urlToDb = 'https://angular-staff-start-default-rtdb.europe-west1.firebasedatabase.app/staff.json';
  private urlToDel = 'https://angular-staff-start-default-rtdb.europe-west1.firebasedatabase.app/staff';
  private httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'})};

  constructor(private http: HttpClient, private messageService: MessageService) { }

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

  //'[{"id": 10, "name": "Sue", "position": "Teacher"}]'
  getStaff(): Observable<IStaff[]>{
    return this.http.get<IStaff[]>(this.urlToDb).
    pipe(catchError(this.onError<IStaff[]>("Staff loading failed", [])));
  }

  getStaffCardById(id: number): Observable<IStaff>{
    const url = `${this.urlToDb}/?orderBy="id"&equalTo=${id}`;
    return this.http.get<IStaff[]>(url).
    pipe(map(staff => Object.values(staff)[0]),
    catchError(this.onError<IStaff>('Loading failed')));
  }

  updateStaff(employee: IStaff): Observable<any>{
    const url = `${this.urlToDb}/?orderBy="id"&equalTo=${employee.id}`;
    return this.http.get<IStaff[]>(url).
    pipe(map(staff => Object.keys(staff)[0]),
    switchMap((pos: string) => this.http.put(`${this.urlToDel}/${pos}.json`, employee, this.httpOptions)),
    catchError(this.onError<any>('Delete failed')));

    // return this.http.put(this.urlToDb, employee, this.httpOptions).
    // pipe(catchError(this.onError<any>('Update failed')));
  }

  deleteStaffCardById(id: number): Observable<any>{
    const url = `${this.urlToDb}/?orderBy="id"&equalTo=${id}`;
    return this.http.get<IStaff[]>(url).
    pipe(map(staff => Object.keys(staff)[0]),
    switchMap((pos: string) => this.http.delete(`${this.urlToDel}/${pos}.json`)),
    catchError(this.onError<any>('Delete failed')));
    // const url = ;
    // return this.http.delete(url).
    // pipe(catchError(this.onError<any>('Delete failed')));
  }

  searchStaff(searchString: string): Observable<IStaff[]>{
    const query = searchString.trim();
    if(!query)
      return of([]);
    
    const db_query = `?orderBy="name"&startAt="${query}"`
    const url = `${this.urlToDb}${db_query}`;
    return this.http.get<IStaff[]>(url).
      pipe(map(staff => Object.values(staff)),
      catchError(this.onError<IStaff[]>('Search failed')))
  }

  addNewStaffCard(employee: Partial<IStaff>): Observable<IStaff>{
    let id: number;
    let pos: string;
    return this.http.get<IStaff[]>(this.urlToDb).pipe(
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
      this.http.put<IStaff>(`${this.urlToDel}/${pos}.json`, employee, this.httpOptions).
      pipe(tap((newEmpl: IStaff) => this.log(`Posted to the server with id=${newEmpl.id}`)),
      catchError(this.onError<IStaff>('Failed to add new employee')))));


    // return this.http.post<IStaff>(this.urlToDb, employee, this.httpOptions).
    // pipe(tap((newEmpl: IStaff) => this.log(`Posted to the server with id=${newEmpl.id}`)),
    // catchError(this.onError<IStaff>('Failed to add new employee')));
  }
}
