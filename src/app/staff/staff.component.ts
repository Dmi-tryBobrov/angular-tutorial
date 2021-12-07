import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IStaff } from '../staff-interface';
import { LoadStaffService } from '../services/load-staff.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  staff: IStaff[] = [];
  add_form_active = false;

  constructor(
    private loadStaffService: LoadStaffService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getStaff();
  }

  // ngAfterViewChecked(): void {
  //   this.add_form_active = false;
  // }

  getStaff(): void{
    this.loadStaffService.getStaff().
    subscribe(staff => this.staff = staff);
  }

  delete(employee: IStaff): void{
    this.staff = this.staff.filter(empl => empl !== employee);
    this.loadStaffService.deleteStaffCardById(employee.id).subscribe();
  }

  displayAddForm(): void{
    // this.router.navigate(['/staff/add_staff']);
    this.add_form_active = true;
  }

  addEmployee(employee: IStaff): void {
    this.loadStaffService.addNewStaffCard(employee)
    .subscribe(newEmpl => {
      this.staff.push(newEmpl);
      this.back()});
  }

  back(){
    this.add_form_active = false;
  }
}
