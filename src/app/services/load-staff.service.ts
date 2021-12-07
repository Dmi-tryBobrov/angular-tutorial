import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IStaff } from '../staff-interface';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadStaffService {

  private urlToDb = 'api/staff';
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

  getStaff(): Observable<IStaff[]>{
    return this.http.get<IStaff[]>(this.urlToDb).
    pipe(catchError(this.onError<IStaff[]>("Staff loading failed", [])));
  }

  getStaffCardById(id: number): Observable<IStaff>{
    const url = `${this.urlToDb}/?id=${id}`;
    return this.http.get<IStaff[]>(url).
    pipe(map(staff => staff[0]),
    catchError(this.onError<IStaff>('Loading failed')));
  }

  updateStaff(employee: IStaff): Observable<any>{
    return this.http.put(this.urlToDb, employee, this.httpOptions).
    pipe(catchError(this.onError<any>('Update failed')));
  }

  deleteStaffCardById(id: number): Observable<any>{
    const url = `${this.urlToDb}/${id}}`;
    return this.http.delete(url, this.httpOptions).
    pipe(catchError(this.onError<any>('Delete failed')));
  }

  searchStaff(searchString: string): Observable<IStaff[]>{
    const query = searchString.trim();
    if(!query)
      return of([]);
    
    const url = `${this.urlToDb}/?name=${query}`;
    return this.http.get<IStaff[]>(url).
      pipe(catchError(this.onError<IStaff[]>('Search failed')))
  }
}
