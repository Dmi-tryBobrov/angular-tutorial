import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IStaff } from './staff-interface';
import { STAFF } from './staff';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class LoadStaffService {

  constructor(private messageService: MessageService) { }

  getStaff(): Observable<IStaff[]>{
    const staff = of(STAFF);
    this.messageService.add('LoadStaffService: fetched staff');
    return staff;
  }

  getStaffCardById(id: number): Observable<IStaff>{
    const staffCard = of(STAFF.find(s => s.id === id)!);
    this.messageService.add(`LoadStaffService: fetched employee with id=${id}`);
    return staffCard;
  }
}
