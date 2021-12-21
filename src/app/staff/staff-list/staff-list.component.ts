import { AfterContentChecked, AfterViewChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IStaff } from '../../staff-interface';
import { LoadStaffService } from '../../services/load-staff.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent implements OnInit, AfterContentChecked {

  public staff: IStaff[] = [];
  public add_form_active = false;
  public isLoggedIn = false;

  constructor(
    private loadStaffService: LoadStaffService,
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.getStaff();
  }

  ngAfterContentChecked(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  getStaff(): void{
    this.loadStaffService.getStaff().
    subscribe(staff => {
      for (let empl of staff){
        if(empl)
          this.staff.push(empl);
      }
    });
  }

  delete(employee: IStaff): void{
    this.staff = this.staff.filter(empl => empl !== employee);
    this.loadStaffService.deleteStaffCardById(employee.id).subscribe();
  }

  displayAddForm(): void{
    // this.router.navigate(['/staff/add_staff']);
    this.add_form_active = true;
  }

  addEmployee(employee: Partial<IStaff>): void {

    this.loadStaffService.addNewStaffCard(employee)
    .subscribe(newEmpl => {
      this.staff.push(newEmpl);
      this.back()
    });
  }

  back(){
    this.add_form_active = false;
  }

}