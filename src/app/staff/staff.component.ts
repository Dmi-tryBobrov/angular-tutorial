import { Component, OnInit } from '@angular/core';
import { IStaff } from '../staff-interface';
import { STAFF } from '../staff';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  staff = STAFF;
  selectedEmployee?: IStaff;
  constructor() { }

  ngOnInit(): void {  }

  selectEmployee(empl: IStaff): void{
    this.selectedEmployee = empl;
  }

}
