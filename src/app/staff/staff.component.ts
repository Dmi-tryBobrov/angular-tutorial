import { Component, OnInit } from '@angular/core';
import { IStaff } from '../staff-interface';
import { LoadStaffService } from '../services/load-staff.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  staff: IStaff[] = [];

  constructor(private loadStaffService: LoadStaffService) { }

  ngOnInit(): void {
    this.getStaff();
  }

  getStaff(): void{
    this.loadStaffService.getStaff().
    subscribe(staff => this.staff = staff);
  }

  delete(employee: IStaff): void{
    this.staff = this.staff.filter(empl => empl !== employee);
    this.loadStaffService.deleteStaffCardById(employee.id).subscribe();
  }

}
