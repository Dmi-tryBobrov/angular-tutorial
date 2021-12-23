import { Component, OnInit } from '@angular/core';
import { LoadStaffService } from '../services/load-staff.service';
import { Router } from '@angular/router';
import { IStaff } from '../staff-interface';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss']
})
export class ShowcaseComponent implements OnInit {

  public topStaff: IStaff[] = [];

  constructor(private loadStaffService: LoadStaffService,
              private router: Router) { }

  ngOnInit(): void {
    this.displayTopStaff();
  }

  displayTopStaff(): void {
    this.loadStaffService.getStaff().
    subscribe(topStaff => {
      for (let empl of topStaff){
        if(empl && empl.employeeOfTheMonth)
          this.topStaff.push(empl);
      }
    });
  }

  viewDetails(id: number): void {
    this.router.navigate([`/staff/staff_card/${id.toString()}`])
  }
}
