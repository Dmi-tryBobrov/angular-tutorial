import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { IStaff } from '../staff-interface';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { LoadStaffService } from '../services/load-staff.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-staff-card',
  templateUrl: './staff-card.component.html',
  styleUrls: ['./staff-card.component.scss']
})
export class StaffCardComponent implements OnInit, AfterViewChecked {

  employee?: IStaff;
  isLoggedIn = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private loadStaffService: LoadStaffService,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.getStaffCard();
  }

  ngAfterViewChecked(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  getStaffCard(): void{
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadStaffService.getStaffCardById(id).
    subscribe(employee => this.employee = employee);
  }

  back(): void{
    this.location.back();
  }

  save(): void{
    if(this.employee){
      this.loadStaffService.updateStaff(this.employee).
      subscribe(() => this.back());
    }
  }
}
