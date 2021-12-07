import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { IStaff } from '../staff-interface';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb(){
    const staff = [
      { id: 11, name: 'BigBoss', position: 'CEO' },
      { id: 12, name: 'Employee1', position: 'Photographer' },
      { id: 13, name: 'Employee2', position: 'Doctor' },
      { id: 14, name: 'Employee3', position: 'Geek' },
      { id: 15, name: 'Employee4', position: 'Security' },
      { id: 16, name: 'WorkerBee1', position: 'Position' },
      { id: 17, name: 'WorkerBee2', position: 'Position' },
      { id: 18, name: 'WorkerBee3', position: 'Position' },
      { id: 19, name: 'WorkerBee4', position: 'Position' },
      { id: 20, name: 'WorkerBee5', position: 'Position' }
    ];
    
    return {staff};
  }

  // If the staff array is empty,
  // the method below returns the initial number (11).
  // if the staff array is not empty, the method below returns the highest
  // employee id + 1.
  genId(staff: IStaff[]): number {
    return staff.length > 0 ? Math.max(...staff.map(employee => employee.id)) + 1 : 11;
  }
}
 
